import { useRouter } from "next/router";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../../../components/layout";

import Loader from "../../../../components/Loader";
import Message from "../../../../components/Message";

import CategoryForm from "../../../../components/admin/forms/CategoryForm";
import { listCategoryDetail } from "../../../../actions/categoryActions";

const edit = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();

  const categoryDetail = useSelector((state) => state.categoryDetail);
  const { loading, error, category } = categoryDetail;

  useEffect(() => {
    if (id) dispatch(listCategoryDetail(id));
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
                category &&
                category.name && <CategoryForm category={category} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default edit;
