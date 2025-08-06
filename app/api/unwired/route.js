import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  const { mcc, radioType, mnc, lac, cid } = body;
  
  // Ambil token dari environment variables untuk keamanan
  const API_TOKEN = process.env.UNWIRED_API_TOKEN;

  if (!API_TOKEN || API_TOKEN === 'UNWIRED_API_TOKEN') {
     return NextResponse.json({ status: 'error', message: 'API token tidak valid atau belum diatur di .env.local' }, { status: 500 });
  }

  // Siapkan payload sesuai dokumentasi Unwired Labs
  const payload = {
    token: API_TOKEN,
    radio: radioType,
    mcc: parseInt(mcc),
    mnc: parseInt(mnc),
    cells: [{
      lac: parseInt(lac),
      cid: parseInt(cid)
    }],
    address: 1 // 1 = untuk mendapatkan alamat
  };

  try {
    const response = await fetch('https://unwiredlabs.com/v2/process.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    // Kirim kembali respons dari Unwired Labs ke frontend
    if (data.status === 'ok') {
      return NextResponse.json(data);
    } else {
      // Jika ada error dari API, teruskan pesannya
      return NextResponse.json(data, { status: 400 });
    }
  } catch (error) {
    console.error('Unwired Labs API request failed:', error);
    return NextResponse.json({ status: 'error', message: 'Gagal menghubungi server Unwired Labs.' }, { status: 500 });
  }
}
