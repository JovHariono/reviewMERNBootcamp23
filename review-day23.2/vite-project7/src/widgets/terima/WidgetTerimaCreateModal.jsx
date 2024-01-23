import { useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import useHTTP from "../../libs/hooks/useHTTP";
import useJWT from "../../libs/hooks/useJWT";
import useMessage from "../../libs/hooks/useMessage";
import useChangeListener from "../../libs/hooks/useChangeListener";
import useValidator from "../../libs/hooks/useValidator";
import WidgetBarangChoice from "../barang/WidgetBarangChoice";

const WidgetTerimaCreateModal = () => {
  const [show, setShow] = useState(false);
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const changeListener = useChangeListener();
  const [terima, setTerima] = useState({
    nomor: "",
    berat: "",
    uangMuka: 0,
  });
  const terimaValidator = useValidator({
    nomor: [],
    berat: [],
    uangMuka: [],
  });
  const [pelanggan, setPelanggan] = useState({
    nama: "",
    alamat: "",
    telepon: "",
  });
  const pelangganValidator = useValidator({
    nama: [],
    alamat: [],
    uangMuka: [],
  });
  const [items, setItems] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onCallbackBarangChoice = (barang) => {
    const itemExist = items.find((obj) => obj._id === barang._id);

    if (itemExist) {
      return;
    }

    setItems([...items, barang]);
  };

  const onItemRemove = (barang) => {
    const temps = items.filter((value) => value._id !== barang._id);
    setItems(temps);
  };

  return (
    <>
      <Button onClick={handleShow}>Transaksi baru</Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Transaksi Cucian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nomor Transaksi Penerimaan</Form.Label>
            <Form.Control className="w-50" />
          </Form.Group>

          <Row>
            <Col md={7}>
              <Form.Group className="mb-3">
                <Form.Label>Nama Pelanggan</Form.Label>
                <Form.Control />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Telepon Pelanggan</Form.Label>
                <Form.Control />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Alamat</Form.Label>
            <Form.Control as={"textarea"} />
          </Form.Group>

          <Row>
            <Col md={7}>
              <Table bordered={true} striped={true} responsive={true}>
                <thead>
                  <tr>
                    <th>Nama Barang</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{value.nama}</td>
                        <td>
                          <Button variant="danger" onClick={() => onItemRemove(value)}>Hapus</Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
            <Col>
              <WidgetBarangChoice callback={onCallbackBarangChoice} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WidgetTerimaCreateModal;
