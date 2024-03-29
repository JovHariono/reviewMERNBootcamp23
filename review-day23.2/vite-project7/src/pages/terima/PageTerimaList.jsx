import {
  Badge,
  Card,
  Col,
  Container,
  Form,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import useHTTP from "../../libs/hooks/useHTTP";
import useJWT from "../../libs/hooks/useJWT";
import useMessage from "../../libs/hooks/useMessage";
import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../../libs/config/settings";
import WidgetTerimaCreateModal from "../../widgets/terima/WidgetTerimaCreateModal";

const PageTerimaList = () => {
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarTerima, setDaftarTerima] = useState([]);
  const [daftarTerimaPagination, setDaftarTerimaPagination] = useState({});

  const terimaSearch = useRef({ value: "" });

  const onTerimaList = (params) => {
    const url = `${BASE_URL}/terima`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      },
      params,
    };

    http.privateHTTP
      .get(url, config)
      .then((res) => {
        const { results, ...pagination } = res.data;
        setDaftarTerimaPagination(pagination);
        setDaftarTerima(results);
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const onTerimaSearch = (e) => {
    if (e.key == "Enter") {
      onTerimaList({ search: terimaSearch.current.value });
    }
  };

  const onTerimaPagination = (page) => {
    onTerimaList({ search: terimaSearch.current.value, page });
  };

  useEffect(() => {
    onTerimaList();
  }, []);

  return (
    <Container className="mt-4">
      <Row className="mb-4 d-flex align-item-center">
        <Col>
          <h3>Daftar Terima cucian</h3>
        </Col>
        <Col className="d-flex justify-content-end">
          {/* cara routing 1 */}
          {/* <Link to={"/new/test/1/2"} className="btn btn-primary">New Barang Link</Link> */}

          {/* cara routing 2 */}
          <WidgetTerimaCreateModal />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Form.Group>
                <Form.Control
                  ref={terimaSearch}
                  onKeyDown={onTerimaSearch}
                  placeholder="Search..."
                  className="w-50 bg-body-tertiary"
                />
              </Form.Group>
            </Card.Body>
            <Table responsive={true} striped={true} borderless={true}>
              <thead>
                <tr>
                  <th>Nomor</th>
                  <th>Nama Pelanggan</th>
                  <th>No. HP</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Uang Muka</th>
                  <th>Sisa</th>
                </tr>
              </thead>

              <tbody>
                {daftarTerima.map((value) => {
                  return (
                    <tr key={value._id}>
                      <td>{value.nomor}</td>
                      <td>{value.pelanggan.nama}</td>
                      <td>{value.pelanggan.telepon}</td>
                      <td>
                        <Badge>{value.status} </Badge>
                      </td>
                      <td>{value.total}</td>
                      <td>{value.uangMuka}</td>
                      <td>{value.sisa}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <Card.Footer>
              <Pagination>
                <Pagination.First
                  disabled={!daftarTerimaPagination.previous}
                  onClick={() => {
                    onTerimaPagination(1);
                  }}
                />
                {daftarTerimaPagination?.pages?.map((page, index) => {
                  return (
                    <Pagination.Item
                      key={index}
                      onClick={() => onTerimaPagination(page.page)}
                    >
                      {page.page}
                    </Pagination.Item>
                  );
                })}
                <Pagination.Last
                  disabled={!daftarTerimaPagination.next}
                  onClick={() => {
                    onTerimaPagination(daftarTerimaPagination.totalPage);
                  }}
                />
              </Pagination>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PageTerimaList;
