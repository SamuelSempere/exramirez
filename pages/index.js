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

  const setCanvasSize = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = 150; // Puedes ajustar la altura como necesites
  };

  useEffect(() => {
    setCanvasSize();
    const handleResize = () => {
      setCanvasSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const draw = useCallback((clientX, clientY) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  }, [isDrawing]);

  const startDrawing = useCallback(({ nativeEvent }) => {
    const { clientX, clientY } = nativeEvent.touches ? nativeEvent.touches[0] : nativeEvent;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    setIsDrawing(true);
    ctx.beginPath();
    draw(clientX, clientY);

    document.body.style.overflow = 'hidden'; // Deshabilitar scroll
  }, [draw]);

  const continueDrawing = useCallback(({ nativeEvent }) => {
    const { clientX, clientY } = nativeEvent.touches ? nativeEvent.touches[0] : nativeEvent;
    draw(clientX, clientY);
  }, [draw]);

  const finishDrawing = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.closePath();
    setIsDrawing(false);
    onChange(canvas.toDataURL());

    document.body.style.overflow = ''; // Habilitar scroll
  }, [onChange]);

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={isDrawing ? continueDrawing : null}
      onMouseUp={finishDrawing}
      onMouseOut={finishDrawing}
      onTouchStart={startDrawing}
      onTouchMove={continueDrawing}
      onTouchEnd={finishDrawing}
      style={{ width: '100%', height: '150px', backgroundColor: '#333' }}
    />
  );
};



export default function Home() {

  
  const [iban, setIban] = useState('');


  const { data: session, status } = useSession();
  const router = useRouter();

  const { Option, OptGroup } = Select;
  const [form] = Form.useForm();

  const onFinish = (formData) => {
    const templateParams = {
      from_name: "test",
      to_name: "tres",
      message: JSON.stringify(formData, null, 2),
      reply_to: "test",
    };
    emailjs.init('W0CE74srzWKeHTuFS');
    emailjs.send('service_t8cio7o', 'template_d3bxq5r', templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
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
      style={{
        maxWidth: 600,
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
      <Form.Item label="Zona de Reparto" name="zonaReparto">
        <Input />
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

           {/* Botón de envío */}
           <Form.Item wrapperCol={{ span: 
            14, offset: 8 }}>
            <button>
            Enviar
            </button>
            </Form.Item>
      </Form>
  )}
  // Muestra un mensaje de carga o un componente de carga mientras se verifica la sesión
  return <div>Cargando...</div>;
}
