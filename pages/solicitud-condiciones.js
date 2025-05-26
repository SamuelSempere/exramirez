import React, { useState } from 'react';
import {
  ConfigProvider,
  Form,
  Input,
  Button,
  DatePicker,
  List,
  Modal,
  Select,
  message,
} from 'antd';
import esES from 'antd/locale/es_ES';
import { v4 as uuidv4 } from 'uuid'; // Importamos uuid para generar claves únicas
import dayjs from 'dayjs';

export default function SolicitudCondicionesPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [condiciones, setCondiciones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm] = Form.useForm();

  const [condicionesCajas, setCondicionesCajas] = useState([]);
  const [isModalCajasOpen, setIsModalCajasOpen] = useState(false);
  const [modalCajasForm] = Form.useForm();

  const formatos = ['Lata', 'Botella 33cl', 'Botella 20cl', 'Barril 20L', 'Barril 30L', 'Barril 50L'];

  const onFinish = async (values) => {
    const dataToSend = { ...values, condiciones, condicionesCajas };
    setLoading(true);
    try {
      const response = await fetch('/api/sendCondicionesComerciales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) throw new Error('Error al enviar');
      message.success('Solicitud enviada con éxito');
      form.resetFields();
      setCondiciones([]);
      setCondicionesCajas([]);
    } catch (error) {
      console.error('Error:', error);
      message.error('Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLinea = () => {
    modalForm.validateFields().then((values) => {
      setCondiciones([...condiciones, { ...values, id: uuidv4() }]);
      modalForm.resetFields();
      setIsModalOpen(false);
    });
  };

  const handleRemoveLinea = (id) => {
    setCondiciones(condiciones.filter((item) => item.id !== id));
  };

  const handleAddLineaCajas = () => {
    modalCajasForm.validateFields().then((values) => {
      setCondicionesCajas([...condicionesCajas, { ...values, id: uuidv4() }]);
      modalCajasForm.resetFields();
      setIsModalCajasOpen(false);
    });
  };

  const handleRemoveLineaCajas = (id) => {
    setCondicionesCajas(condicionesCajas.filter((item) => item.id !== id));
  };

  return (
    <ConfigProvider locale={esES}>
      <>
        <h1>Solicitud de Condiciones Comerciales</h1>
        <Form layout="vertical" onFinish={onFinish} form={form} style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* Datos generales */}
          <Form.Item label="Código de Cliente" name="codigoCliente" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Establecimiento" name="establecimiento" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Dirección" name="direccion" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Población" name="poblacion" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Teléfono" name="telefono" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Propietario" name="propietario" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="DNI / NIF" name="dni" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Fecha Solicitud" name="fechaSolicitud" rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" /></Form.Item>
          <Form.Item label="Vendedor" name="vendedor" rules={[{ required: true }]}><Input /></Form.Item>

          {/* Condiciones Barriles */}
          <h3>Detalle de Condiciones Barriles</h3>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>Añadir línea de condición</Button>
          <List
            className="list-condiciones"
            dataSource={condiciones}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[<Button type="primary" danger onClick={() => handleRemoveLinea(item.id)}>X</Button>]}
              >
                <b>{item.formato}</b> - Dto: {item.dtoDirecto || 0}% - Rapel: {item.rapel || 0}% - Barril S/C: {item.barrilSC || 0} - VTO Rapel: {item.vtoRapel || ''}
              </List.Item>
            )}
          />

          {/* Condiciones Cajas */}
          <h3>Detalle de Condiciones Cajas</h3>
          <Button type="primary" onClick={() => setIsModalCajasOpen(true)}>Añadir línea de condición (Cajas)</Button>
          <List
            className="list-condiciones"
            dataSource={condicionesCajas}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[<Button type="primary" danger onClick={() => handleRemoveLineaCajas(item.id)}>X</Button>]}
              >
                <b>{item.promocion}</b> - Descuento: {item.descuento || 0}% - € x Caja: {item.precioCaja || 0}
              </List.Item>
            )}
          />

          {/* Comentarios */}
          <Form.Item name="comentarios" label="Comentarios">
            <Input.TextArea rows={4} placeholder="Introduce tus comentarios o indicaciones adicionales aquí..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Enviar Solicitud
            </Button>
          </Form.Item>
        </Form>

        {/* Modal Condiciones Barriles */}
        <Modal
          title="Añadir Condición"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={handleAddLinea}
          okText="Guardar"
          cancelText="Cancelar"
          className="modal-negra"
        >
          <Form layout="vertical" form={modalForm}>
            <Form.Item label="Formato" name="formato" rules={[{ required: true }]}>
              <Select placeholder="Selecciona formato">
                {formatos.map((f, idx) => <Select.Option key={idx} value={f}>{f}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item label="X+Y" name="XY"><Input type="text" placeholder="0" /></Form.Item>
            <Form.Item label="€ Dto" name="dto"><Input type="number" placeholder="0" /></Form.Item>
            <Form.Item label="€ Rapel" name="rapeleuro"><Input type="number" placeholder="0" /></Form.Item>
            <Form.Item label="Rapel (%)" name="rapel"><Input type="number" placeholder="0" /></Form.Item>
            <Form.Item label="VTO Rapel" name="vtoRapel" rules={[{ required: true }]}>
              <Select placeholder="Selecciona VTO Rapel">
                <Select.Option key="año" value="Año">Año</Select.Option>
                <Select.Option key="semestre" value="Semestre">Semestre</Select.Option>
                <Select.Option key="trimestre" value="Trimestre">Trimestre</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal Condiciones Cajas */}
        <Modal
          title="Añadir Condición (Cajas)"
          open={isModalCajasOpen}
          onCancel={() => setIsModalCajasOpen(false)}
          onOk={handleAddLineaCajas}
          okText="Guardar"
          cancelText="Cancelar"
          className="modal-negra"
        >
          <Form layout="vertical" form={modalCajasForm}>
            <Form.Item label="Promoción" name="promocion" rules={[{ required: true }]}>
            <Select placeholder="Selecciona promoción">
  <Select.Option key="4+1" value="4+1">4+1</Select.Option>
  <Select.Option key="3+1" value="3+1">3+1</Select.Option>
  <Select.Option key="2+1" value="2+1">2+1</Select.Option>
</Select>

            </Form.Item>
            <Form.Item label="Descuento (%)" name="descuento"><Input type="number" placeholder="0" /></Form.Item>
            <Form.Item label="€ x Caja" name="precioCaja"><Input type="number" placeholder="0" /></Form.Item>
          </Form>
        </Modal>
      </>
    </ConfigProvider>
  );
}
