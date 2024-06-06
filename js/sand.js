// // server side

// const express = require('express');
// const nodemailer = require('nodemailer');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'ranggaridjali@gmail.com',
//     // PASS EMAIL
//     pass: 'uspo oilh aptk bbbp',
//   },
// });

// app.post('/send-email', async (req, res) => {
//   const { nama, email, pesan } = req.body;

//   try {
//     const mailOptions = {
//       from: `${email}`,
//       to: 'ranggaridjali@gmail.com',
//       subject: 'Review web',2
//       text: `Nama: ${nama}\nEmail: ${email}\nPesan: ${pesan}`,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info.response);
//     res.sendStatus(200);
//   } catch (error) {
//     console.error('Error occurred:', error);
//     res.status(500).send('Gagal mengirim email');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server berjalan di port ${PORT}`);
// });
