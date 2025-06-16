import nodemailer from 'nodemailer';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import logoBase64 from '../../lib/logoBase64'; // o '../lib/logoBase64' según sea necesario

async function createCondicionesPDF(formData, username) {
  const {
    codigoCliente,
    direccion,
    poblacion,
    dni,
    fechaSolicitud,
    vendedor,
    comentarios,
    condiciones = [],
    condicionesCajas = [],
  } = formData;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  let y = height - 60;

  // Logo en base64
  try {
    const logoBytes = Buffer.from(logoBase64.split(',')[1], 'base64');
    const pngImage = await pdfDoc.embedPng(logoBytes);
    page.drawImage(pngImage, {
      x: 40,
      y: y - 50,
      width: 120,
      height: 40,
    });
    y -= 70;
  } catch (e) {
    console.warn('No se pudo insertar el logo');
    y -= 20;
  }

  const drawText = (text, opts = {}) => {
    const { size = 11, bold = false, dy = 16 } = opts;
    y -= dy;
    page.drawText(text, {
      x: 40,
      y,
      size,
      font: bold ? fontBold : font,
      color: rgb(0, 0, 0),
    });
  };

  drawText('Solicitud de Condiciones Comerciales', { size: 16, bold: true, dy: 20 });
  drawText(`Cliente: ${codigoCliente}`);
  drawText(`Dirección: ${direccion}`);
  drawText(`Población: ${poblacion}`);
  drawText(`DNI / NIF: ${dni}`);
  drawText(`Fecha Solicitud: ${fechaSolicitud}`);
  drawText(`Vendedor: ${vendedor}`);
  drawText(`Solicitado por: ${username}`);
  y -= 20;

  if (condiciones.length > 0) {
    drawText('Condiciones Barriles', { bold: true, size: 14, dy: 20 });
    drawText('Formato | Dto % | € Dto | Rapel % | € Rapel | Cant. S/C | VTO Rapel', { bold: true });
    condiciones.forEach((c) => {
      drawText(
        `${c.formato || ''} | ${c.dto || ''} | ${c.dtoeuro || ''} | ${c.rapel || ''} | ${c.rapeleuro || ''} | ${c.cantidadSC || ''} | ${c.vtoRapel || ''}`
      );
    });
    y -= 10;
  }

  if (condicionesCajas.length > 0) {
    drawText('Condiciones Cajas', { bold: true, size: 14, dy: 20 });
    drawText('Formato | Promoción | Dto % | € Dto | Rapel % | € Rapel | Cant. S/C | VTO Rapel', { bold: true });
    condicionesCajas.forEach((c) => {
      drawText(
        `${c.formato || ''} | ${c.promocion || ''} | ${c.dtocaja || ''} | ${c.dtoeurocaja || ''} | ${c.rapelcaja || ''} | ${c.rapeleurocaja || ''} | ${c.cantidadSC || ''} | ${c.vtoRapel || ''}`
      );
    });
    y -= 10;
  }

  if (comentarios) {
    drawText('Comentarios:', { bold: true, dy: 20 });
    drawText(comentarios);
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

export default async function handler(req, res) {
  const { selectedEmail, username, userEmail, comentarios, ...formData } = req.body;

  try {
    const pdfBytes = await createCondicionesPDF({ ...formData, comentarios }, username);

let transporter = nodemailer.createTransport({
    host: "smtp.servidor-correo.net", // Servidor SMTP
    port: 587, // Puerto para TLS
    secure: false, // False para STARTTLS en el puerto 587
    auth: {
        user: 'altaclientes@exclusivasramirez.es', // Tu dirección de correo
        pass: process.env.EMAIL_PASS // Contraseña (se recomienda usar variables de entorno)
    },
    tls: {
        ciphers: 'SSLv3', // Forzar uso de TLS si es necesario
        rejectUnauthorized: false // Opción para certificados auto-firmados (opcional)
    }
});

    const mailOptions = {
      from: 'altaclientes@exclusivasramirez.es',
      to: "chempe@gmail.com",
      //to: selectedEmail,
      //cc: userEmail,
      subject: `Solicitud de condiciones de ${username}`,
      text: `Se adjunta el PDF con los datos de la solicitud de condiciones comerciales.\n\nComentarios adicionales:\n${comentarios || 'Sin comentarios.'}`,
      attachments: [
        {
          filename: 'solicitud-condiciones.pdf',
          content: pdfBytes,
          contentType: 'application/pdf',
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send('Correo enviado con éxito');
  } catch (err) {
    console.error('Error al generar o enviar PDF:', err);
    res.status(500).send('Error interno: ' + err.message);
  }
}
