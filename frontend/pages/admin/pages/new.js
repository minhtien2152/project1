import { Card, Col, Row } from "@themesberg/react-bootstrap";

import Layout from "../../../components/layout";

import PageForm from "../../../components/admin/forms/PageForm";

const newPage = () => {
  return (
    <Layout admin>
      <Row className="justify-content-md-center">
        <Col md={5} xl={5} className="mb-4">
          <Card border="light" className="shadow-sm mb-4">
            <Card.Body className="pb-0">
              <PageForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default newPage;
