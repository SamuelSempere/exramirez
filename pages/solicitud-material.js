import React, { useEffect, useState } from 'react';
import {
  ConfigProvider,
  Form,
  Input,
  Button,
  DatePicker,
  Radio,
  Row,
  Col,
  Select,
  message,
  Modal,
} from 'antd';
import { useSession } from 'next-auth/react';
import Papa from 'papaparse';
import esES from 'antd/locale/es_ES';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/es';

dayjs.extend(updateLocale);
dayjs.updateLocale('es', { weekStart: 1 });
dayjs.locale('es');

export default function SolicitudMaterialPage() {
  const { data: session } = useSession();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [materialesDisponibles, setMaterialesDisponibles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLineIndex, setSelectedLineIndex] = useState(null);

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

  const openMaterialModal = (index) => {
    setSelectedLineIndex(index);
    setIsModalOpen(true);
  };

  const handleMaterialSelect = (material) => {
    const current = form.getFieldValue('materiales') || [];
    current[selectedLineIndex] = {
      ...current[selectedLineIndex],
      descripcion: material,
    };
    form.setFieldsValue({ materiales: current });
    setIsModalOpen(false);
  };

  return (
    <ConfigProvider locale={esES}>
      <>
        <h1>Solicitud de Material</h1>
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
                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Fecha Retirada" name="fechaRetirada">
                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="¿Es para eventos?" name="eventos" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="sí">Sí</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Servicio y fianza" name="servicioFianza" rules={[{ required: true }]}>
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
                {fields.map(({ key, name, ...restField }, index) => (
                  <Row key={key} gutter={12} style={{ marginBottom: '0.5rem' }}>
                    <Col span={4}>
                      <Form.Item {...restField} name={[name, 'cantidad']}>
                        <Input type="number" placeholder="Cantidad" />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item {...restField} name={[name, 'descripcion']} rules={[{ required: true }]}>
                        <Button
                          block
                          onClick={() => openMaterialModal(index)}
                          style={{
                            backgroundColor: '#1b1b1b',
                            color: '#fff',
                            textAlign: 'left',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {form.getFieldValue('materiales')?.[index]?.descripcion || 'Seleccionar material'}
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item {...restField} name={[name, 'estado']} rules={[{ required: true }]}>
                        <Radio.Group>
                          <Radio value="nuevo">Nuevo</Radio>
                          <Radio value="usado">Usado</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Button type="primary" danger onClick={() => remove(name)}>X</Button>
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button type="primary" onClick={() => add()}>
                    Añadir línea de material
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item name="personSelector" label="Necesita aprobación de:" rules={[{ required: true }]}>
            <Select onChange={setSelectedEmail} placeholder="Selecciona una persona">
              {people.map(person => (
                <Select.Option key={person.email} value={person.email}>
                  {person.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Enviar Solicitud
            </Button>
          </Form.Item>
        </Form>

        {/* Modal de selección de material */}
        <Modal
          title="Selecciona un material"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          centered
        >
          <ul style={{ maxHeight: 300, overflowY: 'auto', paddingLeft: 0 }}>
            {materialesDisponibles.map((material, idx) => (
              <li key={idx} style={{ listStyle: 'none', marginBottom: 8 }}>
                <Button
                  block
                  onClick={() => handleMaterialSelect(material)}
                  style={{
                    backgroundColor: '#1b1b1b',
                    color: '#fff',
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={material}
                >
                  {material}
                </Button>
              </li>
            ))}
          </ul>
        </Modal>
      </>
    </ConfigProvider>
  );
}
