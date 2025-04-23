import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from "next/router";
import { Form, Input, Select, Radio, Button, Divider, Row, Col,TimePicker  } from 'antd';
import SignatureCanvas from 'react-signature-canvas';
import credenciales from '../credenciales.json';

const clienteOptions = credenciales.users.map(user => ({
  label: user.username,
  value: user.username
}));



// Componente SignaturePad
const SignaturePad = ({ setSignatureDataUrl }) => {
  const sigPadRef = useRef(null);

  const saveSignature = () => {
    if (sigPadRef.current) {
      const dataUrl = sigPadRef.current.getTrimmedCanvas().toDataURL('image/png');
      setSignatureDataUrl(dataUrl); // Usando directamente después de la desestructuración
    }
  };

  // Función para restaurar el estado del canvas

  return (
    <div>
      <SignatureCanvas
        ref={sigPadRef}
        penColor="black"
        onEnd={saveSignature}
        canvasProps={{
          width: 310,
          height: 200,
          className: 'sigCanvas',
          style: { border: '1px solid #ffffff' }
        }}
      />
      <div><button type="button" onClick={() => sigPadRef.current.clear()}>Borrar</button></div>
      
    </div>
  );
};


// Componente principal de la página
export default function Home() {
  const [message, setMessage] = useState('');
const [messageColor, setMessageColor] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form] = Form.useForm();
  const [selectedEmail, setSelectedEmail] = useState('');
  const [signatureDataUrl, setSignatureDataUrl] = useState('');
  const [comercialOwn , setcomercialOwn] = useState('');

  

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (form.isFieldsTouched()) {
        e.preventDefault();
        e.returnValue = ''; // Requerido para mostrar la alerta en algunos navegadores
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [form]);
  


const userEmail = session?.user?.email;
  
  const repartoOptions = [
    "010 POL.ESPARTAL Y POL.FLORIDA",
    "100 NOCT. CENTRO",
    "101 NOCT. EXTRARADIO",
    "102 NOCT. ELCHE",
    "103 NOCT. PLAYAS ARENALES",
    "103 NOCT. S.VI- VILLA- MUCHA-",
    "104 NOCT. CAMPELLO - S. JUAN PLAYA",
    "106 DOBLO",
    "107 ESPECIALES",
    "108 NOCT. VILLAFRANQUEZA",
    "109 NOCT. MUCHAMIEL",
    "110 NOCT. SAN J. PUEBLO",
    "111 NOCT. SAN J. PLAYA",
    "012 CIUDAD ASIS Y FLORIDA PORTAZGO",
    "014 FLORIDA SUR",
    "015 BABEL",
    "016 BENALUA",
    "017 SAN GABRIEL",
    "019 CENTRO HISTORICO",
    "020 CENTRO Y MUELLE DE LEVANTE",
    "021 ENSANCHE ALICANTE",
    "022 MERCADO CENTRAL",
    "030 SAN BLAS HASTA CENTRO CP03005",
    "031 PAU1 Y NUEVO SAN BLAS",
    "033 LOS ANGELES",
    "034 TOMBOLA",
    "036 RABASA Y POLIGONO RABASA",
    "040 ALTOZANO",
    "042 VIRGEN DEL REMEDIO",
    "043 COLONIA REQUENA",
    "050 GARBINET ALTO-BAJO Y JUAN XXII",
    "051 CAROLINAS ALTO Y BAJO",
    "052 EL PLA, BON REPOS Y MONTEMAR",
    "053 ALBUFERETA Y GOTETA",
    "060 SANTA ISABEL. HAIGON",
    "061 SAN VICENTE DEL RASPEIG",
    "062 VERDEGAS.LA CAÑADA.MORALET",
    "063 VILLAFRANQUEZA",
    "064 ORGERGIA Y SANTA FAZ",
    "065 MUCHAMIEL",
    "066 BONALBA",
    "067 SANT JOAN D'ALACANT",
    "069 EL CAMPELLO,ALKABIR Y P.ESPAÑO",
    "070 PLAYA MUCHAVISTA",
    "071 PLAYA S.JUAN,CABO Y ALBUFERETA",
    "072 POLIGONO VALLONGA",
    "073 POL.ATALAYA Y PTDA.BACAROT",
    "074 REBOLLEDO",
    "075 AGUAMARGA",
    "076 TORRELLANO",
    "077 EL ALTET",
    "078 URBANOVA",
    "079 ARENALES DEL SOL",
    "080 GRAN ALACANT",
    "081 SANTA POLA",
    "082 ISLA TABARCA",
    "084 PARQUE INDUSTRIAL TORRELLANO",
    "086 ELCHE ALTABIX",
    "088 ELCHE CARRUS OESTE",
    "090 ESTE CARRUS ELCHE",
    "091 LA GALIA ELCHE",
    "092 ELCHE PONT NOU",
    "093 SECTOR V.EL ASILO Y EL CANAL",
    "094 ELCHE PALMERAL SAN ANTON",
    "095 RONDA SUR Y EL TRAVALO",
    "096 RURAL ELCHE",
    "097 CREVILLENTE",
    "098 ASPE Y NOVELDA",
    "099 DISTRIBUIDORES",
  ].map(label => ({ label, value: label }));

  const { Option, OptGroup } = Select;

  //const username = session?.user?.email.split('@')[0];
  const username = comercialOwn;

  const people = [

    { name: 'José Pardo', email: 'josepardo@exclusivasramirez.es' },
    { name: 'Fran', email: 'frandelcasar@exclusivasramirez.es' },
    { name: 'Ramón', email: 'ramonperez@exclusivasramirez.es' },
    { name: 'Adrián', email: 'adriancarmona@exclusivasramirez.es' },
    { name: 'Cristian Fernandez', email: 'cristianfernandez@exclusivasramirez.es' },
    { name: 'OFICINA', email: 'info@exclusivasramirez.es' },
    //{ name: 'PRUEBAS', email: 'chempe@gmail.com' }
    
    // Agrega más personas según sea necesario

  ];

  useEffect(() => {
    if (status !== "loading" && !session) {
      // Redirigir al usuario a iniciar sesión si no está autenticado
      signIn();
    }
  }, [session, status, router]);

  const onFinish = async (values) => {
    console.log(dataToSend)
    const dataToSend = {
      ...values,
      username,
      selectedEmail,
      signatureDataUrl,
      userEmail// Asegúrate de incluir la firma
    };
  
    try {
      console.log(dataToSend)
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) throw new Error('Error al enviar el correo');
      setMessage('Datos enviados correctamente');
      setMessageColor('green');
      window.removeEventListener('beforeunload', handleBeforeUnload);
 // Establece el color del mensaje a verde
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setMessage('Ha ocurrido un error');
      setMessageColor('red'); // Establece el color del mensaje a rojo
    }
  };

  if (status === "loading") return <div>Cargando...</div>;
  if (!session) return <div>Acceso denegado</div>;

  return (
    <Form form={form} onFinish={onFinish} layout="horizontal" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Cliente Nuevo</h1>
      <h3>Datos del establecimiento</h3>
      <Form.Item label="Tipo" name="Tipo"
        rules={[{ required: true, message: 'Por favor, selecciona una opción' }]}
        initialValue="Cliente Nuevo"
        >
        <Radio.Group>
          <Radio Selected value={'Cliente Nuevo'}>Cliente Nuevo</Radio>
          <Radio value={'Cambio de datos'}>Cambio de datos</Radio>
        </Radio.Group>
      </Form.Item>
      <Divider />
      {/* Nombre Comercial */}
      <Form.Item label="Cliente de:" name="clienteDe"
      rules={[{ required: true, message: 'Por favor selecciona un comercial' }]}>
      <Select placeholder="Selecciona un comercial"
      onChange={(value) => setcomercialOwn(value)}>
        {clienteOptions.map(option => (
          <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
        ))}
      </Select>
    </Form.Item>
      <Form.Item label="Nombre Comercial" name="nombreComercial"
        rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}>
        <Input />
      </Form.Item>

      {/* Nombre Fiscal */}
      <Form.Item label="Nombre Fiscal" name="nombreFiscal"
        rules={[{ required: true, message: 'Por favor ingresa tu el nombre' }]}>
        <Input />
      </Form.Item>

      {/* CIF/DNI */}
      <Form.Item label="CIF/DNI" name="cifDni"
        rules={[{ required: true, message: 'Por favor ingresa el DNI/CIF' }]}>
        <Input />
      </Form.Item>

      {/* Calle y Número */}
      <Form.Item label="Calle y N°" name="calleNumero"
        rules={[{ required: true, message: 'Por favor ingresa calle y número' }]}>
        <Input />
      </Form.Item> {/* Localidad y Código Postal */}
      <Row gutter={16}>
        {/* Localidad */}
        <Col span={16}>
          <Form.Item
            name="localidad"
            label="Localidad"
            rules={[{ required: true, message: 'Por favor ingresa tu localidad' }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Código Postal */}
        <Col span={8}>
          <Form.Item
            name="CP"
            label="CP"
            rules={[{ required: true, message: 'Por favor ingresa tu código postal' }]}
          >
            <Input maxLength={5} />
          </Form.Item>
        </Col>
      </Row>

      {/* Persona de Contacto y Teléfonos */}
      <Form.Item label="Persona de Contacto y Teléfonos" name="personaContactoTelefonos"
        rules={[{ required: true, message: 'Por favor ingresa telefono' }]}>
        <Input />
      </Form.Item>

      {/* Correo Electrónico */}
      <Form.Item
        label="Correo Electrónico"
        name="correoElectronico"
        rules={[
          {
            required: true,
            message: 'Por favor ingresa tu correo electrónico',
          },
          {
            type: 'email',
            message: 'El correo electrónico no es válido',
          },
        ]}
      >
        <Input type="email" />
      </Form.Item>
      {/* Zona de Reparto */}
      <Form.Item name="zonaReparto" label="Zona de Reparto" rules={[{ required: true, message: 'Por favor, selecciona tu zona de reparto' }]}>
        <Select placeholder="Selecciona tu zona de reparto" optionFilterProp="children">
          {repartoOptions.map(option => (
            <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Observaciones */}
      <Form.Item label="Horario de entrega" name="hentrega"
        rules={[{ required: true, message: 'necesita un horario' }]}>
      <Input/>
      </Form.Item>
      <Form.Item label="Dia de visita" name="DiaVisita"
        rules={[{ required: true, message: 'Por favor, selecciona un día' }]}>
      <Select placeholder="Dia de de la semana">
              <Select.Option key='Lunes'>Lunes</Select.Option>
              <Select.Option key='Martes'>Martes</Select.Option>
              <Select.Option key='Miercoles'>Miercoles</Select.Option>
              <Select.Option key='Jueves'>Jueves</Select.Option>
              <Select.Option key='Viernes'>Viernes</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item label="Detras de..." name="Detrasde"
          rules={[{ required: true, message: 'Por favor, indica detras de...' }]}>
    <Input/>
    </Form.Item>

      <h3>Si es persona física minorista</h3>
      <Divider />
      <Form.Item label="Recargo de equivalencia" name="Recargo"
        rules={[{ required: true, message: 'Por favor, selecciona una opción' }]}
        >
        <Radio.Group>
          <Radio value={'Si'}>Si</Radio>
          <Radio value={'No'}>No</Radio>
        </Radio.Group>
      </Form.Item>
      <h3>Datos del titular o administrador</h3>
      <Divider />
      <Form.Item label="Nombre" name="NombreTitular"
        rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Cif" name="CifTitular"
        rules={[{ required: true, message: 'Por favor ingresa el Cif' }]}>
        <Input />
      </Form.Item>
        <Form.Item label="Calle y N°" name="calleNumeroTitular"
          rules={[{ required: true, message: 'Por favor ingresa calle y número' }]}>
          <Input />
        </Form.Item>
        <Row gutter={16}>
          {/* Localidad */}
          <Col span={16}>
            <Form.Item
              name="localidadTitular"
              label="Localidad"
              rules={[{ required: true, message: 'Por favor ingresa tu localidad' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Código Postal */}
          <Col span={8}>
            <Form.Item
              name="CPTitular"
              label="CP"
              rules={[{ required: true, message: 'Por favor ingresa tu código postal' }]}
            >
              <Input maxLength={5} />
            </Form.Item>
          </Col>
        </Row>
        <h3>Domicilio fiscal (si es dístinto al de reparto)</h3>
        <Divider />
        <Form.Item label="Calle y N°" name="calleNumeroFiscal"
        rules={[{ required: false, message: 'Por favor ingresa calle y número' }]}>
        <Input />
      </Form.Item>
      <Row gutter={16}>
        {/* Localidad */}
        <Col span={16}>
          <Form.Item
            name="localidadFiscal"
            label="Localidad"
            rules={[{ required: false, message: 'Por favor ingresa tu localidad' }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Código Postal */}
        <Col span={8}>
          <Form.Item
            name="CPfiscal"
            label="CP"
            rules={[{ required: false, message: 'Por favor ingresa tu código postal' }]}
          >
            <Input maxLength={5} />
          </Form.Item>
        </Col>
      </Row>
        <Form.Item label="Forma de pago" name="FormaPago">
         <Input rules={[{ required: true, message: 'Necesita forma de pago' }]}
         />
        </Form.Item>
        <Divider></Divider>
        <Form.Item label="Firma" name="firma">
        <SignaturePad setSignatureDataUrl={setSignatureDataUrl} />

        </Form.Item>
        <Form.Item
          name="personSelector"
          label="Necesita aprobación de:"
          rules={[{ required: true, message: 'Por favor, selecciona una persona' }]}
          labelCol={{ style: { color: 'white' } }}
        >
          <Select onChange={setSelectedEmail} placeholder="Selecciona una persona">
            {people.map(person => (
              <Select.Option key={person.email} value={person.email}>{person.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>


        {/* Botón de envío */}
        <Form.Item>
        <button type="submit">Enviar</button>
        {message && (
          <span style={{ marginLeft: '10px', color: messageColor }}>
            {message}
          </span>
        )}
      </Form.Item>

        <p className="textolegal">
        Información Básica de Protección de Datos.El responsable del tratamiento de sus datos es EXCLUSIVAS RAMIREZ S.L. y tratamos la información que nos facilita con el fin de gestionar la relación con nuestros clientes y personas de contacto. La legitimación en base a la cuál tratamos sus datos es: ejecución de contrato o interés legítimo. Tiene derecho a acceder, rectificar y suprimir sus datos dirigiéndose a nuestra dirección electrónica info@exclusivasramirez.es Asimismo puede solicitar información adicional y detallada sobre Protección de Datos en la web www.exclusivasramirez.es
          EXCLUSIVAS RAMIREZ S.L., CL. Tárbena, 03008 Alicante, garantiza que la dirección de email que usted nos ha facilitado es utilizada en la forma y con las limitaciones establecidas en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSICE).
          El contenido de este correo electrónico y sus anexos son estrictamente confidenciales. En caso de no ser usted el destinatario y haber recibido este mensaje por error, agradeceríamos que lo comunique inmediatamente al remitente, sin difundir, almacenar o copiar su contenido.
        </p>
             {/* Botón de logout */}
      <Form.Item>
        <Button type="primary" danger onClick={() => signOut()}>
          Cerrar Sesión
        </Button>
      </Form.Item>
    </Form>

  )
}


