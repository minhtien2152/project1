import { Card, Col, FormLabel, Row } from "@themesberg/react-bootstrap";

import Layout from "../../../components/layout";
import InstructorForm from "../../../components/admin/forms/InstructorForm";

const newIntructor = () => {
  return (
    <Layout admin>
      <Row className="justify-content-md-center">
        <Col md={5} xl={5} className="mb-4">
          <Card border="light" className="shadow-sm mb-4">
            <Card.Header>
              <h4>Tạo giảng viên mới</h4>
            </Card.Header>
            <Card.Body className="pb-0">
              <InstructorForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default newIntructor;
