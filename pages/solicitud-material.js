import { Form, Input, Button, DatePicker, Radio, Row, Col, Select, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Papa from 'papaparse';

export default function SolicitudMaterialPage() {
  const { data: session } = useSession();
  const [form] = Form.useForm();
  const [locale, setLocale] = useState(null);

  // Solo cargar 'locale' en el cliente para evitar el error de Vercel
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const esLocale = require('antd/es/date-picker/locale/es_ES');
      setLocale(esLocale);
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [materialesDisponibles, setMaterialesDisponibles] = useState([]);

  const people = [
    { name: 'José Pardo', email: 'josepardo@exclusivasramirez.es' },
    { name: 'Fran', email: 'frandelcasar@exclusivasramirez.es' },
    { name: 'Ramón', email: 'ramonperez@exclusivasramirez.es' },
    { name: 'Adrián', email: 'adriancarmona@exclusivasramirez.es' },
    { name: 'Cristian Fernandez', email: 'cristianfernandez@exclusivasramirez.es' },
    { name: 'OFICINA', email: 'info@exclusivasramirez.es' },
  ];

  useEffect(() => {
    fetch('/materiales.csv')
      .then((res) => res.text())
      .then((csv) => {
        Papa.parse(csv, {
          header: false,
          skipEmptyLines: true,
          complete: (result) => {
            const descripciones = result.data.map((row) => row[0]);
            setMaterialesDisponibles(descripciones);
          },
        });
      });
  }, []);

  const onFinish = async (values) => {
    const dataToSend = {
      ...values,
      selectedEmail,
      username: session?.user?.name || 'NombreComercial',
      userEmail: session?.user?.email,
    };

    setLoading(true);
    try {
      const response = await fetch('/api/sendEmailMaterial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) throw new Error('Error al enviar');
      message.success('Solicitud enviada con éxito');
      form.resetFields();
    } catch (error) {
      console.error('Error:', error);
      message.error('Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  if (!locale) return null; // o un spinner

  return (
    <Form layout="vertical" onFinish={onFinish} form={form} style={{ maxWidth: 800, margin: '0 auto' }}>
      <Form.Item label="Cliente" name="cliente" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Código Cliente" name="codigoCliente" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Fecha Entrega" name="fechaEntrega" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} locale={locale} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Fecha Retirada" name="fechaRetirada">
            <DatePicker style={{ width: '100%' }} locale={locale} />
          </Form.Item>
        </Col>
      </Row>

        <Form.Item label="¿Es para eventos?" name="eventos" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="sí">Sí</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Servicio y fianza - ¿Cobrar en pedido bebidas o en material?" name="servicioFianza" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="pedido_bebidas">Ped. bebidas</Radio>
            <Radio value="pedido_material">Ped. material</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Material" name="material" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="nuevo">Nuevo</Radio>
            <Radio value="segunda_mano">Segunda mano</Radio>
          </Radio.Group>
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Horario - desde:" name="horarioDesde" rules={[{ required: true }]}>
              <Input placeholder="Ej: 10:00" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Horario hasta:" name="horarioHasta" rules={[{ required: true }]}>
              <Input placeholder="Ej: 12:00" />
            </Form.Item>
          </Col>
        </Row>
        <Form.List name="materiales">
  {(fields, { add, remove }) => (
    <>
      <h3>Detalle de Materiales</h3>
      {fields.map(({ key, name, ...restField }) => (
        <Row key={key} gutter={12} style={{ marginBottom: '0.5rem' }}>
          <Col span={4}>
            <Form.Item
              {...restField}
              name={[name, 'cantidad']}
              rules={[{ required: false }]}
            >
              <Input type="number" placeholder="Cantidad" />
            </Form.Item>
          </Col>
          <Col span={18}>
          <Form.Item
  {...restField}
  name={[name, 'descripcion']}
  rules={[{ required: false, message: 'Selecciona un material' }]}
>
<Select placeholder="Selecciona un material">
  {materialesDisponibles.map((mat, index) => (
    <Select.Option key={index} value={mat}>
      {mat}
    </Select.Option>
  ))}
</Select>
</Form.Item>
          </Col>
          <Col span={2}>
            <Button type="primary" danger onClick={() => remove(name)}>X</Button>
          </Col>
        </Row>
      ))}
      <Form.Item>
      <Button type="primary"
  onClick={() => add()}
>
  Añadir línea de material
</Button>

      </Form.Item>
    </>
  )}
</Form.List>

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
        <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
  Enviar Solicitud
</Button>
        </Form.Item>
      </Form></>
  );
}
