import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP";
import useJWT from "../../libs/hooks/useJWT";
import useMessage from "../../libs/hooks/useMessage";
import { useState } from "react";
import useValidator from "../../libs/hooks/useValidator";
import useChangeListener from "../../libs/hooks/useChangeListener";
import { BASE_URL } from "../../libs/config/settings";
import ComponentMessageValidation from "../../libs/components/ComponentMessageValidation";

const PageBarangCreate = () => {
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [barang, setBarang] = useState({ nama: "" });
  const barangValidator = useValidator({ nama: [] });
  const barangChangeListener = useChangeListener();

  const onBarangCreate = () => {
    barangValidator.reset();

    const config = {
      headers: {
        Authorization: jwt.get(),
      },
    };

    http.privateHTTP
      .post(`${BASE_URL}/barang/`, barang, config)
      .then((res) => {
        message.success(res);
        navigate("/")
      })
      .catch((err) => {
        message.error(err);
        barangValidator.except(err);
      });
  };

  return (
    <>
      <Container className="mt-4">
        <Row className="d-flex justify-content-center mb-3">
          <Col md={7}>
            <h4>Buat Barang</h4>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mb-3">
          <Col md={7}>
            <Card>
              <Card.Body>
                <Card.Subtitle className="mb-3">Nama Barang</Card.Subtitle>
                <Form.Group className="mb-3">
                  <Form.Control
                    placeholder="Nama jasa/barang cucian"
                    className="bg-body-tertiary"
                    onChange={(e) =>
                      barangChangeListener.onChangeText(e, barang, setBarang)
                    }
                    value={barang.nama}
                    name={"nama"}
                  />
                  <Form.Text>
                    Harap diisi dengan nama jasa/layanan laundry
                  </Form.Text>
                  <ComponentMessageValidation
                    messages={barangValidator.get("nama")}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center">
          <Col md={7} className="d-flex justify-content-end gap-3">
            <Button variant="outline-secondary" onClick={() => navigate("/")}>
              Batal
            </Button>
            <Button onClick={onBarangCreate}>Simpan</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PageBarangCreate;
