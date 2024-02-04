import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Input, Select, Radio, Button, Divider,Row, Col } from 'antd';
import React, { useState } from 'react';


const IBANInput = ({ value = '', onChange }) => {
  const handleChange = (e) => {
    let value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    onChange(value);
  };

  return <Input value={value} onChange={handleChange} maxLength={29} />;
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
<Form.Item label="Recargo de equivalencia" name="Recargo">
<Radio.Group>
  <Radio value={1}>Si</Radio>
  <Radio value={2}>No</Radio>
</Radio.Group>
</Form.Item>
      {/* Zona de Reparto */}
      <Form.Item label="Zona de Reparto" name="zonaReparto">
        <Input />
      </Form.Item>
    
      {/* Observaciones */}
      <Form.Item label="Observaciones" name="observaciones">
        <Input.TextArea />
      </Form.Item>
  
      {/* Banco */}
      <Form.Item label="Banco" name="banco">
      <IBANInput value={iban} onChange={(value) => setIban(value)} />
    </Form.Item>
    
      {/* Vencimiento */}
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
