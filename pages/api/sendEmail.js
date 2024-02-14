import nodemailer from 'nodemailer';

export default async (req, res) => {
    const { selectedEmail, username, signatureDataUrl, nombreComercial, nombreFiscal, cifDni, calleNumero, localidad, CP, personaContactoTelefonos, correoElectronico } = req.body;


    // Función para construir el cuerpo del correo electrónico
    const buildEmailBody = (data) => {
        const {
            selectedEmail, username, signatureDataUrl, nombreComercial, nombreFiscal, cifDni, 
            calleNumero, localidad, CP, personaContactoTelefonos, correoElectronico,
            zonaReparto, formaPago, diaVisita, detrasDe, observaciones
        } = data;
    
        return `
            <html>
            <head>
                <style>
                body { font-family: Arial, sans-serif; }
                .header { font-size: 20px; margin-bottom: 20px; }
                .section { margin-bottom: 10px; }
                .signature { margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="header">Datos del Formulario</div>
                <div class="section">Nombre Comercial: ${nombreComercial}</div>
                <div class="section">Nombre Fiscal: ${nombreFiscal}</div>
                <div class="section">CIF/DNI: ${cifDni}</div>
                <div class="section">Calle y Número: ${calleNumero}</div>
                <div class="section">Localidad: ${localidad}</div>
                <div class="section">Código Postal: ${CP}</div>
                <div class="section">Persona de Contacto y Teléfonos: ${personaContactoTelefonos}</div>
                <div class="section">Correo Electrónico: ${correoElectronico}</div>
                <div class="section">Zona de Reparto: ${zonaReparto}</div>
                <div class="section">Forma de Pago: ${formaPago}</div>
                <div class="section">Día de Visita: ${diaVisita}</div>
                <div class="section">Detrás de: ${detrasDe}</div>
                <div class="section">Observaciones: ${observaciones}</div>
                
                <div class="signature">
                    <div>Firma:</div>
                    <img src="${signatureDataUrl}" alt="Firma" style="max-width:200px;"/>
                </div>
            </body>
            </html>
        `;
    };

    // Crear una instancia de transporte SMTP con tus credenciales
    let transporter = nodemailer.createTransport({
        host: "smtp.panel247.com",
        port: 587,
        secure: false, // true para 465, false para otros puertos
        auth: {
            user: 'altaclientes@exclusivasramirez.es', // tu dirección de correo
            pass: 'ERmage83ese@' // contraseña del correo (considera usar variables de entorno)
        },
    });

    // Opciones del correo
    let mailOptions = {
        from: 'altaclientes@exclusivasramirez.es', // dirección de correo electrónico del remitente
        to: selectedEmail, // dirección de correo electrónico del destinatario
        subject: `Nuevo cliente de ${username}`, // Asunto del correo
        html: buildEmailBody(req.body), // cuerpo del correo en formato HTML
    };

    // Envío del correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error al enviar el correo: ", error);
            return res.status(500).send("Error al enviar el correo: " + error.message);
        }
        res.status(200).send("Correo enviado con éxito: " + info.response);
    });
};
