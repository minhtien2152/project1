import { useRouter } from "next/router";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../../../components/layout";

import Loader from "../../../../components/Loader";
import Message from "../../../../components/Message";
import { listPageDetails } from "../../../../actions/pageActions";
import PageForm from "../../../../components/admin/forms/PageForm";

const edit = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();

  const pageDetails = useSelector((state) => state.pageDetails);
  const { loading, error, page } = pageDetails;

  useEffect(() => {
    if (id) dispatch(listPageDetails(id));
  }, [dispatch, id]);

  return (
    <Layout admin>
      <Row className="justify-content-md-center">
        <Col md={5} xl={5} className="mb-4">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            page &&
            page.name && (
              <Card border="light" className="shadow-sm mb-4">
                <Card.Body className="pb-0">
                  <PageForm page={page} />
                </Card.Body>
              </Card>
            )
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default edit;
