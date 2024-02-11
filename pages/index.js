import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Input, Select, Radio, Button, Divider,Row, Col } from 'antd';
import React, { useState, useRef, useCallback } from 'react';

const IBANInput = ({ value = '', onChange }) => {
  const handleChange = (e) => {
    let value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    onChange(value);
  };

  return <Input value={value} onChange={handleChange} maxLength={29} />;
};



const SignaturePad = ({ onChange }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [savedDrawing, setSavedDrawing] = useState(null); // Estado para guardar la imagen actual del canvas

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Restaurar el dibujo si existe al inicializar o cambiar el tamaño
    const context = canvas.getContext('2d');
    if (savedDrawing) {
      const image = new Image();
      image.onload = () => context.drawImage(image, 0, 0);
      image.src = savedDrawing;
    }

    return () => window.removeEventListener('resize', setCanvasSize);
  }, [savedDrawing]); // Dependencia a savedDrawing para restaurar el dibujo

  const getCoordinates = (event) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDrawing = (event) => {
    event.preventDefault();
    setIsDrawing(true);
    const ctx = canvasRef.current.getContext('2d');
    const { x, y } = getCoordinates(event);
    ctx.moveTo(x, y);
    ctx.beginPath();
  };

  const draw = (event) => {
    if (!isDrawing) return;
    event.preventDefault();
    const { x, y } = getCoordinates(event);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const finishDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL();
    setSavedDrawing(dataUrl); // Guarda el estado del dibujo actual
    onChange(dataUrl); // Opcional: notificar al componente padre
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={finishDrawing}
      onMouseOut={finishDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={finishDrawing}
      style={{ width: '100%', height: '200px', touchAction: 'none', backgroundColor: 'white' }}
    />
  );
};



export default function Home() {

  


  const [iban, setIban] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');

  const { data: session, status } = useSession();
  const router = useRouter();

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
  const [form] = Form.useForm();

  const people = [

    { name: 'José Pardo', email: 'josepardovidal@gmail.com' },
    { name: 'Fran', email: 'fran.delcasar.er@gmail.com' },
    { name: 'Ramón', email: 'ramon.perez.er@gmail.com' },
    { name: 'Adrián', email: 'adrian.carmona.er@gmail.com' },
    { name: 'Cristian Fernandez', email: 'cristian.fernandez.er@gmail.com' },
    // Agrega más personas según sea necesario
  ];
  
 
  
    const onFinish = (values) => {
      // Aquí manejarías el envío de datos del formulario
      // Incluyendo el email seleccionado
      console.log('Form Data:', values);
      console.log('Selected Email:', selectedEmail);
  
      // Aquí iría la lógica para enviar los datos por email
      // Esto depende de cómo manejas el envío de emails (frontend, backend, etc.)
    };


  useEffect(() => {
    // Si la sesión no está cargada aún, no hacer nada
    if (status === "loading") return;

    // Si no hay sesión, redirigir a la página de inicio de sesión
    if (!session) {
      router.push('/signin');
    }
  }, [session, status, router]);

  // Contenido para usuarios autenticados
  if (session) {
    return (
      <Form
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%', // O el ancho que prefieras
        padding: '0 30px', // Añade padding lateral de 30px
        // Otras propiedades de estilo que necesites
      }}
    onFinish={onFinish}
    

      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      layout="horizontal"
      initialValues={{
        remember: true,
      }}
    >
     <h1>Cliente Nuevo</h1>
     <h3>Datos del establecimiento</h3>
     <Divider/>
      {/* Nombre Comercial */}
      <Form.Item label="Nombre Comercial" name="nombreComercial">
        <Input />
      </Form.Item>

      {/* Nombre Fiscal */}
      <Form.Item label="Nombre Fiscal" name="nombreFiscal">
        <Input />
      </Form.Item>

      {/* CIF/DNI */}
      <Form.Item label="CIF/DNI" name="cifDni">
        <Input />
      </Form.Item>
 
      {/* Calle y Número */}
      <Form.Item label="Calle y N°" name="calleNumero">
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
      <Form.Item label="Persona de Contacto y Teléfonos" name="personaContactoTelefonos">
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
      <Form.Item label="Observaciones" name="observaciones">
        <Input.TextArea />
      </Form.Item>

<h3>Si es persona física minorista</h3>
<Divider/>
<Form.Item label="Recargo de equivalencia" name="Recargo">
<Radio.Group>
  <Radio value={1}>Si</Radio>
  <Radio value={2}>No</Radio>
</Radio.Group>
</Form.Item>
<h3>Datos del titular o administrador</h3>
<Divider/>
<Form.Item label="Nombre" name="NombreTitular">
<Input />
</Form.Item>  
<Form.Item label="Cif" name="CifTitular">
<Input />
</Form.Item>  
<Form.Item label="Cif" name="CifTitular">
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
<Divider/>

      {/* Banco */}
      <Form.Item label="Banco" name="banco">
      <IBANInput value={iban} onChange={(value) => setIban(value)} />
    </Form.Item>
    
      {/* 
    <Form.Item label="Forma de Pago" name="FormaPago">
            <Select defaultValue="60 días" style={{ width: 200 }}>
            <OptGroup label="Giro">
              <Option value="G30">30 días</Option>
              <Option value="G60">60 días</Option>
              <Option value="G90">90 días</Option>
            </OptGroup>
            <OptGroup label="Transferencia">
             <Option value="T30">90 días</Option>
              <Option value="T60">60 días</Option>
              <Option value="T90">90 días</Option>
            </OptGroup>
          </Select>,
      </Form.Item>
      Vencimiento*/}
      <Form.Item label="Firma" name="firma">
  <SignaturePad onChange={(signatureDataURL) => {
    // Aquí puedes manejar el dato de la firma, por ejemplo, almacenándolo en el estado
    console.log(signatureDataURL);
  }} />

</Form.Item>
<Form.Item 
name="personSelector" 
label="Neceista aprobación de:" 
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
           <Form.Item wrapperCol={{ span: 
            14, offset: 8 }}>
            <button>
            Enviar
            </button>
            </Form.Item>

            <p className="textolegal">Información Básica de Protección de Datos.

      El responsable del tratamiento de sus datos es EXCLUSIVAS RAMIREZ S.L. y tratamos la información que nos facilita con el fin de gestionar la relación con nuestros clientes y personas de contacto. La legitimación en base a la cuál tratamos sus datos es: ejecución de contrato o interés legítimo. Tiene derecho a acceder, rectificar y suprimir sus datos dirigiéndose a nuestra dirección electrónica info@exclusivasramirez.es Asimismo puede solicitar información adicional y detallada sobre Protección de Datos en la web www.exclusivasramirez.es
      
      EXCLUSIVAS RAMIREZ S.L., CL. Tárbena, 03008 Alicante, garantiza que la dirección de email que usted nos ha facilitado es utilizada en la forma y con las limitaciones establecidas en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSICE).
      
      El contenido de este correo electrónico y sus anexos son estrictamente confidenciales. En caso de no ser usted el destinatario y haber recibido este mensaje por error, agradeceríamos que lo comunique inmediatamente al remitente, sin difundir, almacenar o copiar su contenido.</p>
      </Form>
      
  )}

  // Muestra un mensaje de carga o un componente de carga mientras se verifica la sesión
  return <div>Cargando...</div>;
}
