import { useRouter } from "next/router";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../../../components/layout";

import Loader from "../../../../components/Loader";
import Message from "../../../../components/Message";

import InstructorForm from "../../../../components/admin/forms/InstructorForm";
import { listInstructorDetail } from "../../../../actions/instructorActions";

const edit = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();

  const instructorDetail = useSelector((state) => state.instructorDetail);
  const { loading, error, instructor } = instructorDetail;

  useEffect(() => {
    if (id) dispatch(listInstructorDetail(id));
  }, [dispatch, id]);

  return (
    <Layout admin>
      <Row className="justify-content-md-center">
        <Col md={5} xl={5} className="mb-4">
          <Card border="light" className="shadow-sm mb-4">
            <Card.Body className="pb-0">
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                instructor?.name && <InstructorForm instructor={instructor} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default edit;
