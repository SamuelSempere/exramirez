import nodemailer from 'nodemailer';

export default async (req, res) => {
    const { selectedEmail, username, ...restOfBody } = req.body;

  // Crear una instancia de transporte SMTP con tus credenciales
  let transporter = nodemailer.createTransport({
    host: "smtp.panel247.com",
    port: 587,
    secure: false, // true para 465, false para otros puertos
    auth: {
      user: 'altaclientes@exclusivasramirez.es', // tu dirección de correo
      pass: process.env.EMAIL_PASS, // contraseña del correo
    },
  });

  // Opciones del correo
  let mailOptions = {
    from: 'altacientes@exclusivasramirez.es',
    to: selectedEmail, // Usar el email seleccionado como destinatario
    subject: `Datos alta nuevo cleinte de ${username}`,
    text: JSON.stringify(restOfBody, null, 2),
    // opcionalmente, puedes usar 'html' para el cuerpo del correo
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo: ", error);
      return res.status(500).send("Error al enviar el correo: " + error.message);
    }
    res.status(200).send("Correo enviado con éxito: " + info.response);
  });
};