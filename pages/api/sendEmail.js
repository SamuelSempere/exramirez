import nodemailer from 'nodemailer';
import { PDFDocument, rgb } from 'pdf-lib';

async function createPdfWithFormData(formData, username) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 900]);
    const fontSize = 12;
    const titleFontSize = 18; // Tamaño de fuente para el título
    const lineHeight = 18;
    let yPosition = 880;

    const logoImageBase64 = 'data:image/png;base64,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';

       // Quita el prefijo de la cadena Base64 para poder decodificarla correctamente
       const logoImageBytes = Buffer.from(logoImageBase64.split(",")[1], 'base64');
    
       // Incrustar la imagen en el documento PDF
       const logoImage = await pdfDoc.embedPng(logoImageBytes);
       
       // Calcular dimensiones para mantener el aspecto de la imagen
       const logoDims = logoImage.scale(0.5); // Ajusta este valor según sea necesario para el tamaño de tu cabecera
       
       // Dibujar la imagen en la página
       page.drawImage(logoImage, {
           x: 50, // Ajusta según sea necesario
           y: yPosition - logoDims.height,
           width: logoDims.width,
           height: logoDims.height,
       });
   
       yPosition -= (logoDims.height + 40);

    function addText(text, y, size = fontSize, color = rgb(0, 0, 0)) {
        page.drawText(text, { x: 50, y: y, size, color });
    }

    // Función para añadir una cabecera estilizada
    function addHeader() {
        addText('Formulario de alta', yPosition, titleFontSize, rgb(3 / 255, 61 / 255, 131 / 255)); // Ajusta el nombre de tu empresa
        yPosition -= (lineHeight * 2);
        addText(`Nuevo cliente de ${username}`, yPosition, titleFontSize, rgb(3 / 255, 61 / 255, 131 / 255)); // Título con color diferente
        yPosition -= (lineHeight * 2);
    }

    addHeader();
    // Agregar título
  
    // Agregar los campos del formulario
    const fields = [
        { label: "DATOS ESTABLECIMIENTO", value: "" },
        { label: "Nombre Comercial:", value: formData.nombreComercial },
        { label: "Nombre Fiscal:", value: formData.nombreFiscal },
        { label: "CIF/DNI:", value: formData.cifDni },
        { label: "Calle y Número:", value: formData.calleNumero },
        { label: "Localidad:", value: formData.localidad },
        { label: "CP:", value: formData.CP },
        { label: "Persona de Contacto y Teléfonos:", value: formData.personaContactoTelefonos },
        { label: "Email:", value: formData.correoElectronico },
        { label: "Zona de Reparto:", value: formData.zonaReparto },
        { label: "Horario de Entrega:", value: formData.hentrega },
        { label: "Día de Visita:", value: formData.DiaVisita },
        { label: "Detrás de:", value: formData.Detrasde },
        
        { label: "", value: "" }, // Esto añade un espacio/salto de línea
        { label: "Recargo de Equivalencia:", value: formData.Recargo },
         
        { label: "", value: "" },
        { label: "DATOS DEL TITULAR", value: "" }, // Esto añade un espacio/salto de línea
        { label: "Nombre del Titular:", value: formData.NombreTitular },
        { label: "CIF del Titular:", value: formData.CifTitular },
        { label: "Calle y Número del Titular:", value: formData.calleNumeroTitular },
        { label: "CP del Titular:", value: formData.CPTitular },
        { label: "Localidad del Titular:", value: formData.localidadTitular },
        
        { label: "", value: "" },
        { label: "DOMICILIO FISCAL", value: "" }, // Esto añade un espacio/salto de línea
        { label: "Calle y Número Fiscal:", value: formData.calleNumeroFiscal },
        { label: "Localidad Fiscal:", value: formData.localidadFiscal },
        { label: "CP Fiscal:", value: formData.CPfiscal },

        { label: "", value: "" }, // Esto añade un espacio/salto de línea
        { label: "Forma de Pago:", value: formData.FormaPago },
        { label: "", value: "" }, // Esto añade un espacio/salto de línea
        { label: "Firma:", value: "" }, // Esto añade un espacio/salto de línea

    ];

    fields.forEach(({ label, value }) => {
        let text = label; // Inicializa el texto con la etiqueta del campo
        if (value !== undefined && value !== null && value !== '') { // Verifica que value no sea undefined, null o cadena vacía
            text += `${value}`; // Añade el valor al texto si este está definido
        }
        addText(text, yPosition); // Añade el texto al documento
        yPosition -= lineHeight; // Ajusta la posición para el siguiente campo
        
        if (label === "Recargo de Equivalencia") { // Si es Recargo de Equivalencia, añade espacio adicional
            yPosition -= lineHeight; // Añade un espacio extra para el salto de línea
        }
    
        if (yPosition < lineHeight * 4) { // Verifica si se necesita una nueva página
            page = pdfDoc.addPage([600, 900]);
            yPosition = 880; // Restablece la posición para la nueva página
        }
    });

    // Añadir la firma
    if (formData.signatureDataUrl) {
        const signatureImage = await pdfDoc.embedPng(formData.signatureDataUrl);
        const signatureDims = signatureImage.scale(0.5); // Escalar la imagen según sea necesario
        page.drawImage(signatureImage, {
            x: 50,
            y: yPosition - signatureDims.height - 20, // Ajustar posición según sea necesario
            width: signatureDims.width,
            height: signatureDims.height,
        });
    }

    // Serializar el PDF a bytes
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}

export default async (req, res) => {
    const { selectedEmail, username, ...formData } = req.body;
    // Generar PDF
    createPdfWithFormData(formData,username).then(async (pdfBytes) => {
        // Configurar nodemailer
        let transporter = nodemailer.createTransport({
            host: "smtp.panel247.com",
            port: 587,
            secure: false, // true para 465, false para otros puertos
            auth: {
                user: 'altaclientes@exclusivasramirez.es', // tu dirección de correo
                pass: process.env.EMAIL_PASS // contraseña del correo (considera usar variables de entorno)
            },
        });

        // Opciones del correo incluyendo el PDF adjunto
        let mailOptions = {
            from: 'altaclientes@exclusivasramirez.es',
            to: selectedEmail,
            subject: `Nuevo cliente de ${username}`, // Asunto del correo
            text: 'Se adjunta el PDF con los datos del formulario.',
            attachments: [
                {
                    filename: 'formulario.pdf',
                    content: pdfBytes,
                    contentType: 'application/pdf'
                },
            ],
        };

        // Enviar correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error al enviar el correo: ", error);
                return res.status(500).send("Error al enviar el correo: " + error.message);
            } else {
                res.status(200).send("Correo enviado con éxito: " + info.response);
            }
        });
    }).catch(error => {
        console.error('Error al generar el PDF:', error);
        res.status(500).send("Error al generar el PDF: " + error.message);
    });
};
