import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      Router.push("/");
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: "url(/images/signin.svg)" }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="fas fa-envelope"></i>
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="email"
                        placeholder="example@company.com"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="fas fa-unlock-alt"></i>
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label
                          htmlFor="defaultCheck5"
                          className="mb-0"
                        >
                          Remember me
                        </FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">
                        Lost password?
                      </Card.Link>
                    </div>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    onClick={(e) => submitHandler(e)}
                  >
                    Sign in
                  </Button>
                </Form>

                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Link href="/signup">
                      <a className="fw-bold">Create account</a>
                    </Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
export default Login;
