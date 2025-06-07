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
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import Papa from 'papaparse';
import { useEffect } from 'react';

export default function SolicitudCondicionesPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [condiciones, setCondiciones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm] = Form.useForm();

  const [condicionesCajas, setCondicionesCajas] = useState([]);
  const [isModalCajasOpen, setIsModalCajasOpen] = useState(false);

  const [clientes, setClientes] = useState([]);
const [selectedCliente, setSelectedCliente] = useState(null);

  const [modalCajasForm] = Form.useForm();

  const promociones = ['x+y','4+1', '3+1', '2+1'];

  const [barriles, setBarriles] = useState([]);
  const [cajas, setCajas] = useState([]);

  useEffect(() => {
    fetch('/clientes.csv')
      .then(response => response.text())
      .then(text => {
        Papa.parse(text, {
          delimiter: ';',
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const clientesData = results.data.map(row => ({
              codigoCliente: row['Nº']?.trim(),
              establecimiento: row['Nombre']?.trim(),
              poblacion: row['Población']?.trim(),
              direccion: row['Dirección']?.trim(),
              dni: row['CIF/NIF']?.trim(),
              // propietario: row['FS. Nombre']?.trim(), // lo vamos a quitar
            })).filter(c => c.codigoCliente && c.establecimiento);
            setClientes(clientesData);
          },
        });
      });
  }, []);
  
  
  useEffect(() => {
    // Cargar barril.csv
    fetch('/barril.csv')
      .then(response => response.text())
      .then(text => {
        Papa.parse(text, {
          delimiter: ';',
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const opciones = results.data.map(row => row['Descripción']?.trim()).filter(Boolean);
            setBarriles(opciones);
          },
        });
      });
  
    // Cargar cajas.csv
    fetch('/cajas.csv')
      .then(response => response.text())
      .then(text => {
        Papa.parse(text, {
          delimiter: ';',
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const opciones = results.data.map(row => row['Descripción']?.trim()).filter(Boolean);
            console.log('Opciones Cajas:', opciones);
            setCajas(opciones);
          },
        });
      });
  }, []);
  



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
          <Form.Item
  label="Código de Cliente o Establecimiento"
  name="codigoCliente"
  rules={[{ required: true }]}
>
  <Select
    showSearch
    placeholder="Busca por código o establecimiento"
    optionFilterProp="label"
    onChange={(value) => {
      const cliente = clientes.find(c => c.codigoCliente === value);
      setSelectedCliente(cliente);
      if (cliente) {
        form.setFieldsValue({
          codigoCliente: cliente.codigoCliente,
          establecimiento: cliente.establecimiento,
          poblacion: cliente.poblacion,
          direccion: cliente.direccion,
          dni: cliente.dni,
        });
      }
    }}
  >
    {clientes.map(cliente => (
      <Select.Option
        key={cliente.codigoCliente}
        value={cliente.codigoCliente}
        label={`${cliente.codigoCliente} ${cliente.establecimiento}`}
      >
        {`${cliente.codigoCliente} - ${cliente.establecimiento}`}
      </Select.Option>
    ))}
  </Select>
</Form.Item>

          <Form.Item label="Dirección" name="direccion" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Población" name="poblacion" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="DNI / NIF" name="dni" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item
  label="Fecha Solicitud"
  name="fechaSolicitud"
  rules={[{ required: true }]}
  initialValue={dayjs()} // 👈 Aquí pones hoy por defecto
>
  <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
</Form.Item>
          <Form.Item label="Vendedor" name="vendedor" rules={[{ required: true }]}><Input /></Form.Item>

          {/* Lista de condiciones barriles */}
          <h3>Detalle de Condiciones Barriles</h3>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>Añadir línea de condición</Button>
          <List
  dataSource={condiciones}
  renderItem={(item) => {
    const partes = [
      item.dtoDirecto ? `Dto: ${item.dtoDirecto}%` : null,
      item.rapel ? `Rapel: ${item.rapel}%` : null,
      item.barrilSC ? `Barril S/C: ${item.barrilSC}` : null,
      item.vtoRapel ? `VTO Rapel: ${item.vtoRapel}` : null,
    ].filter(Boolean);

    return (
      <List.Item
        className="condicion-item"
        key={item.id}
        actions={[
          <Button
            key={`delete-barril-${item.id}`}
            type="primary"
            danger
            onClick={() => handleRemoveLinea(item.id)}
          >X</Button>
        ]}
      >
        <b>{item.formato}</b>{partes.length > 0 ? ' - ' + partes.join(' - ') : ''}
      </List.Item>
    );
  }}
/>


          {/* Lista de condiciones cajas */}
          <h3>Detalle de Condiciones Cajas</h3>
          <Button type="primary" onClick={() => setIsModalCajasOpen(true)}>Añadir línea de condición (Cajas)</Button>
          <List
  dataSource={condicionesCajas}
  renderItem={(item) => {
    const partes = [
      item.promocion ? `Promoción: ${item.promocion}` : null,
      item.descuento ? `Descuento: ${item.descuento}%` : null,
      item.precioCaja ? `€ x Caja: ${item.precioCaja}` : null,
    ].filter(Boolean);

    return (
      <List.Item
        className="condicion-item"
        key={item.id}
        actions={[
          <Button
            key={`delete-caja-${item.id}`}
            type="primary"
            danger
            onClick={() => handleRemoveLineaCajas(item.id)}
          >X</Button>
        ]}
      >
        <b>{item.formato}</b>{partes.length > 0 ? ' - ' + partes.join(' - ') : ''}
      </List.Item>
    );
  }}
/>


          {/* Comentarios */}
          <Form.Item name="comentarios" label="Comentarios">
            <Input.TextArea rows={4} placeholder="Introduce tus comentarios o indicaciones adicionales aquí..." />
          </Form.Item>

          {/* Botón enviar */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Enviar Solicitud
            </Button>
          </Form.Item>
        </Form>

        {/* Modal para condiciones barriles */}
        <Modal title="Añadir Condición" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleAddLinea} okText="Guardar" cancelText="Cancelar" className="modal-negra">
          <Form layout="vertical" form={modalForm}>
          <Form.Item label="Formato" name="formato" rules={[{ required: true }]}>
  <Select placeholder="Selecciona formato" showSearch optionFilterProp="children">
    {barriles.map((f) => (
      <Select.Option key={f} value={f}>{f}</Select.Option>
    ))}
  </Select>
</Form.Item>


            <Form.Item label="€ Dto" name="dtoeuro"><Input type="number" placeholder="0" /></Form.Item>
            <Form.Item label="€ Rapel" name="rapeleuro"><Input type="number" placeholder="0" /></Form.Item>
            <Form.Item label="Dto (%)" name="dto"><Input type="number" placeholder="0" /></Form.Item>
            <Form.Item label="Rapel (%)" name="rapel"><Input type="number" placeholder="0" /></Form.Item>
            
            <Form.Item label="VTO Rapel" name="vtoRapel" rules={[{ required: false }]}>
              <Select placeholder="Selecciona VTO Rapel">
                {['Año', 'Semestre', 'Trimestre'].map((op) => <Select.Option key={op} value={op}>{op}</Select.Option>)}
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal para condiciones cajas */}
        <Modal title="Añadir Condición (Cajas)" open={isModalCajasOpen} onCancel={() => setIsModalCajasOpen(false)} onOk={handleAddLineaCajas} okText="Guardar" cancelText="Cancelar" className="modal-negra">
          <Form layout="vertical" form={modalCajasForm}>
            
          <Form.Item label="Formato" name="formato" rules={[{ required: true }]}>
  <Select placeholder="Selecciona formato" showSearch optionFilterProp="children">
    {cajas.map((f) => (
      <Select.Option key={f} value={f}>{f}</Select.Option>
    ))}
  </Select>
</Form.Item>


            
            <Form.Item label="Promoción" name="promocion" rules={[{ required: true }]}>
              
              
              <Select placeholder="Selecciona promoción">
                {promociones.map((p) => <Select.Option key={p} value={p}>{p}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item label="€ Dto" name="dtoeurocaja"><Input type="number" placeholder="0" /></Form.Item>
            <Form.Item label="€ Rapel" name="rapeleurocaja"><Input type="number" placeholder="0" /></Form.Item>
            <Form.Item label="Dto (%)" name="dtocaja"><Input type="number" placeholder="0" /></Form.Item>
            <Form.Item label="Rapel (%)" name="rapelcaja"><Input type="number" placeholder="0" /></Form.Item>
            <Form.Item label="VTO Rapel" name="vtoRapel" rules={[{ required: false }]}>
              <Select placeholder="Selecciona VTO Rapel">
                {['Año', 'Semestre', 'Trimestre'].map((op) => <Select.Option key={op} value={op}>{op}</Select.Option>)}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </>
    </ConfigProvider>
  );
}
