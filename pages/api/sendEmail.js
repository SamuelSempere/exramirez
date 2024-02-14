import nodemailer from 'nodemailer';

export default async (req, res) => {
  const { body } = req;

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
    from: 'altaclientes@exclusivasramirez.es',
    to: 'chempe@gmail.com', // Cambia esto por el correo del destinatario
    subject: 'Datos de cliente nuevo',
    text: JSON.stringify(body, null, 2), // Convierte los datos del formulario a string para enviar
    // html: '<b>Hello world?</b>', // También puedes usar HTML
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo: ", error); // Agrega esto para ver el error en la consola del servidor
      return res.status(500).send("Error al enviar el correo: " + error.message);
    }
    res.status(200).send("Correo enviado con éxito: " + info.response);
  });
};