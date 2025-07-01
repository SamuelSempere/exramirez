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
  Divider,
} from 'antd';
import esES from 'antd/locale/es_ES';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import Papa from 'papaparse';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';


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
  const [selectedEmail, setSelectedEmail] = useState('');


  const [modalCajasForm] = Form.useForm();

  const promociones = ['x+y', '4+1', '3+1', '2+1'];

  const [barriles, setBarriles] = useState([]);
  const [cajas, setCajas] = useState([]);

  const { data: session } = useSession();


  const people = [
    { name: 'José Pardo', email: 'josepardo@exclusivasramirez.es' },
    { name: 'Fran', email: 'frandelcasar@exclusivasramirez.es' },
    { name: 'Ramón', email: 'ramonperez@exclusivasramirez.es' },
    { name: 'Adrián', email: 'adriancarmona@exclusivasramirez.es' },
    { name: 'Cristian Fernandez', email: 'cristianfernandez@exclusivasramirez.es' },
    { name: 'Ismael García', email: 'ismaelgarcia@exclusivasramirez.es' },
    { name: 'Cristian Martínez', email: 'cristianmartinez@exclusivasramirez.es' },
    { name: 'OFICINA', email: 'info@exclusivasramirez.es' }
  ];

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
              vendedor: row['Cód. vendedor']?.trim(),
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
    const dataToSend = {
      ...values,
      condiciones,
      condicionesCajas,
      selectedEmail,
      username: session?.user?.name || 'No especificado',
      userEmail: session?.user?.email || '',
    };

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
      // Excluir campos que no cuentan
      const camposImportantes = { ...values };
      delete camposImportantes.formato;
      const algunCampoRellenado = Object.values(camposImportantes).some(val => val !== undefined && val !== '');

      if (!algunCampoRellenado) {
        message.warning('Rellena al menos un campo de condición (excepto Formato y VTO Rapel)');
        return;
      }

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
      const camposImportantes = { ...values };
      delete camposImportantes.formato;
      delete camposImportantes.vtoRapel;

      const algunCampoRellenado = Object.values(camposImportantes).some(val => val !== undefined && val !== '');

      if (!algunCampoRellenado) {
        message.warning('Rellena al menos un campo de condición (excepto Formato y VTO Rapel)');
        return;
      }

      setCondicionesCajas([...condicionesCajas, { ...values, id: uuidv4() }]);
      modalCajasForm.resetFields();
      setIsModalCajasOpen(false);
    });
  };

  const handleRemoveLineaCajas = (id) => {
    setCondicionesCajas(condicionesCajas.filter((item) => item.id !== id));
  };

  const etiquetasCondiciones = {
    formato: "Formato",
    dtoDirecto: "Dto (%)",
    dtoeuro: "€ Dto",
    rapel: "Rapel (%)",
    rapeleuro: "€ Rapel",
    cantidadSC: "Cantidad Sin Cargo",  // 👈 nuevo campo
    barrilSC: "Barril S/C",
    vtoRapel: "VTO Rapel",
    dto: "Dto %"
  };


  const etiquetasCajas = {
    dtoeurocaja: "€ Dto ",
    dtocaja: "% Dto ",
    rapeleurocaja: "€ Rapel",
    rapelcaja: "% Rapel",
    formato: "Formato",
    promocion: "Promoción",
    descuento: "Descuento (%)",
    precioCaja: "€ x Caja",
    cantidadSC: "Cantidad Sin Cargo",
    vtoRapel: "VTO Rapel"  // 👈 nuevo campo
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
                    vendedor: cliente.vendedor || "",
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
          <Form.Item name="establecimiento" hidden>
  <Input />
</Form.Item>

          <Form.Item label="Dirección" name="direccion" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Población" name="poblacion" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="DNI / NIF" name="dni" rules={[{ required: true }]}><Input /></Form.Item>
<Form.Item
  label="Fecha Solicitud"
  name="fechaSolicitud"
  rules={[{ required: true }]}
  initialValue={dayjs()}
>
  <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
</Form.Item>

<Form.Item
  label="Fecha Final (opcional)"
  name="fechaFinal"
>
  <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
</Form.Item>
          <Form.Item label="Vendedor" name="vendedor" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="VTO Rapel" name="vtoRapel">
  <Select placeholder="Selecciona VTO Rapel">
    {['NO','Año', 'Semestre', 'Trimestre'].map((op) => (
      <Select.Option key={op} value={op}>{op}</Select.Option>
    ))}
  </Select>
</Form.Item>

          {/* Lista de condiciones barriles */}
          <h3>Detalle de Condiciones Barriles</h3>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>Añadir línea de condición</Button>
          <List
            className="condicion-item"
            dataSource={condiciones}
            renderItem={(item) => {
              const detalles = Object.entries(item)
                .filter(([key, val]) => key !== 'id' && val !== undefined && val !== '')
                .map(([key, val]) => `${etiquetasCondiciones[key] || key}: ${val}`);

              return (
                <>
                  <List.Item
                    className="condicion-item"
                    key={item.id}
                    actions={[
                      <Button
                        key={`delete-${item.id}`}
                        type="primary"
                        danger
                        onClick={() => handleRemoveLinea(item.id)}
                      >
                        X
                      </Button>,
                    ]}
                  >
                    <div>
                      {detalles.map((linea, i) => (
                        <div key={i}>{linea}</div>
                      ))}
                    </div>
                  </List.Item>
                  <Divider style={{ backgroundColor: 'white', margin: '8px 0' }} />
                </>
              );
            }}
          />



          {/* Lista de condiciones cajas */}
          <h3>Detalle de Condiciones Cajas</h3>
          <Button type="primary" onClick={() => setIsModalCajasOpen(true)}>Añadir línea de condición (Cajas)</Button>
          <List
            dataSource={condicionesCajas}
            className="condicion-item"
            renderItem={(item) => {
              const detalles = Object.entries(item)
                .filter(([key, val]) => key !== 'id' && val !== undefined && val !== '')
                .map(([key, val]) => `${etiquetasCajas[key] || key}: ${val}`);

              return (
                <>
                  <List.Item
                    key={item.id}
                    className="condicion-item"
                    actions={[
                      <Button
                        key={`delete-caja-${item.id}`}
                        type="primary"
                        danger
                        onClick={() => handleRemoveLineaCajas(item.id)}
                      >
                        X
                      </Button>,
                    ]}
                  >
                    <div>
                      {detalles.map((linea, i) => (
                        <div key={i}>{linea}</div>
                      ))}
                    </div>
                  </List.Item>
                  <Divider style={{ backgroundColor: 'white', margin: '8px 0' }} />

                </>
              );
            }}
          />
          <Form.Item name="personSelector" label="Necesita aprobación de:" rules={[{ required: true }]}>
            <Select onChange={setSelectedEmail} placeholder="Selecciona una persona">
              {people.map(person => (
                <Select.Option key={person.email} value={person.email}>
                  {person.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>


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
            <Form.Item label="Cantidad Sin Cargo" name="cantidadSC">
              <Input placeholder="Especifica cantidad u observación..." />
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




            <Form.Item label="Promoción" name="promocion"><Input type="text" placeholder="x+y" /></Form.Item>
            <Form.Item label="€ Dto" name="dtoeurocaja"><Input type="number" placeholder="0" /></Form.Item>
            <Form.Item label="€ Rapel" name="rapeleurocaja"><Input type="number" placeholder="0" /></Form.Item>
            <Form.Item label="Dto (%)" name="dtocaja"><Input type="number" placeholder="0" /></Form.Item>
            <Form.Item label="Rapel (%)" name="rapelcaja"><Input type="number" placeholder="0" /></Form.Item>
            <Form.Item label="Cantidad Sin Cargo" name="cantidadSC">
              <Input placeholder="Especifica cantidad u observación..." />
            </Form.Item>


          </Form>
        </Modal>
      </>
    </ConfigProvider>
  );
}
