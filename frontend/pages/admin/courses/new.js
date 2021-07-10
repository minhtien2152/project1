import { Card, Col, FormLabel, Row } from "@themesberg/react-bootstrap";

import Layout from "../../../components/layout";
import CourseForm from "../../../components/admin/forms/CourseForm";

const newCourse = () => {
  return (
    <Layout admin>
      <Row className="justify-content-md-center">
        <Col md={5} xl={5} className="mb-4">
          <Card border="light" className="shadow-sm mb-4">
            <Card.Header>
              <h4>Tạo khóa học mới</h4>
            </Card.Header>
            <Card.Body className="pb-0">
              <CourseForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default newCourse;
