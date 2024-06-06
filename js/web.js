document.getElementById('contactForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Mencegah pengiriman formulir langsung

  // Ambil nilai input dari formulir
  const nama = document.getElementById('nama').value;
  const email = document.getElementById('email').value;
  const pesan = document.getElementById('pesan').value;

  // Kirim data ke server Node.js menggunakan fetch API
  try {
    const response = await fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nama, email, pesan }),
    });

    if (response.ok) {
      console.log('Email berhasil dikirim!');
      // Tambahkan kode lain yang perlu dieksekusi setelah pengiriman email berhasil di sini
    } else {
      console.error('Gagal mengirim email.');
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
});
