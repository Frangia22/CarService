const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const sendEmailReset = async (email, token) => {
  const transporter = nodemailer.createTransport({
    // service: 'hotmail',
    host: process.env.HOST_EMAIL,
    port: process.env.PORT_EMAIL,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
      // ciphers: 'SSLv3' --> Usando hotmail
    }
  })
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS_FROM,
    to: email,
    subject: 'Restablecimiento de contraseña',
    html: `Hola, <br> Para restablecer tu contraseña haz clic en el siguiente enlace: ${process.env.FRONTEND_URL}/reset-password/${token} <br><br>Tenga en cuenta que el enlace expira en 10 minutos`
  }
  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
const generateResetToken = async (email) => {
  return jwt.sign(
    {
      token: crypto.randomBytes(16).toString('hex'),
      email
    }, process.env.SESSION_SECRET,
    {
      expiresIn: '10m'
    })
}
module.exports = {
  sendEmailReset,
  generateResetToken
}
