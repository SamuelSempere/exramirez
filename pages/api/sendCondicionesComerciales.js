import nodemailer from 'nodemailer';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import dayjs from 'dayjs';
import logoBase64 from '../../lib/logoBase64'; // Asegúrate que esta ruta y archivo existen

// Función para crear PDF
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
  const page = pdfDoc.addPage([595, 842]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  let y = height - 60;

  // Logo
  try {
    const logoBytes = Buffer.from(logoBase64.split(',')[1], 'base64');
    const pngImage = await pdfDoc.embedPng(logoBytes);
    page.drawImage(pngImage, { x: 40, y: y - 50, width: 120, height: 40 });
    y -= 70;
  } catch (e) {
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
  drawText(`Fecha Solicitud: ${dayjs(fechaSolicitud).format('DD-MM-YYYY')}`);
  drawText(`Vendedor: ${vendedor}`);
  drawText(`Solicitado por: ${username || 'No especificado'}`);
  y -= 10;

  if (condiciones.length > 0) {
    drawText('Condiciones Barriles', { bold: true, size: 14, dy: 20 });

    condiciones.forEach((c, idx) => {
      if (idx > 0) y -= 8;
      if (c.formato) drawText(`Formato: ${c.formato}`);
      if (c.dto) drawText(`Dto (%): ${c.dto}`);
      if (c.dtoeuro) drawText(`€ Dto: ${c.dtoeuro}`);
      if (c.rapel) drawText(`Rapel (%): ${c.rapel}`);
      if (c.rapeleuro) drawText(`€ Rapel: ${c.rapeleuro}`);
      if (c.cantidadSC) drawText(`Cantidad Sin Cargo: ${c.cantidadSC}`);
      if (c.vtoRapel) drawText(`VTO Rapel: ${c.vtoRapel}`);
    });
  }

  if (condicionesCajas.length > 0) {
    drawText('Condiciones Cajas', { bold: true, size: 14, dy: 20 });

    condicionesCajas.forEach((c, idx) => {
      if (idx > 0) y -= 8;
      if (c.formato) drawText(`Formato: ${c.formato}`);
      if (c.promocion) drawText(`Promoción: ${c.promocion}`);
      if (c.dtocaja) drawText(`Dto (%): ${c.dtocaja}`);
      if (c.dtoeurocaja) drawText(`€ Dto: ${c.dtoeurocaja}`);
      if (c.rapelcaja) drawText(`Rapel (%): ${c.rapelcaja}`);
      if (c.rapeleurocaja) drawText(`€ Rapel: ${c.rapeleurocaja}`);
      if (c.cantidadSC) drawText(`Cantidad Sin Cargo: ${c.cantidadSC}`);
      if (c.vtoRapel) drawText(`VTO Rapel: ${c.vtoRapel}`);
    });
  }

  if (comentarios) {
    drawText('Comentarios:', { bold: true, dy: 20 });
    drawText(comentarios);
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

// API handler
export default async function handler(req, res) {
  const { selectedEmail, username, userEmail, comentarios, ...formData } = req.body;

  try {
    const pdfBytes = await createCondicionesPDF({ ...formData, comentarios }, username);

    const transporter = nodemailer.createTransport({
      host: "smtp.servidor-correo.net",
      port: 587,
      secure: false,
      auth: {
        user: 'altaclientes@exclusivasramirez.es',
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

console.log(selectedEmail,userEmail)
    
const mailOptions = {
      
      from: 'altaclientes@exclusivasramirez.es',
      //to:'chempe@gmail.com',
      to: selectedEmail,
      cc: userEmail,
      subject: `Solicitud de condiciones de ${username || 'usuario no identificado'}`,
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
