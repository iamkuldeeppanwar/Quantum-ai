import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Store } from "../states/store";
import { reducer } from "../states/reducers";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useTitle } from "../components";
import { toastOptions } from "../utils/error";
import { clearErrors, login } from "../states/actions";

export default function AdminLoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { token } = state;
  const [check, setCheck] = useState(false);
  const [states, setStates] = useState(false);

  const navigate = useNavigate();
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await login(ctxDispatch, dispatch, { email: username, password });
    setStates(true);
  };

  useEffect(() => {
    console.log("runns");
    if (token) {
      navigate("/Ai-dashboard");
    }
    if (error) {
      toast.error(error, toastOptions);
      clearErrors(dispatch);
    }
  }, [error, token, states]);

  useTitle("Login");
  return (
    <Container fluid className="p-0 vh-100 f-center flex-column login-page">
      <div className="login-logo">
        <Link to="/" className="text-center">
          <b>Quantum Ai</b>
        </Link>
      </div>

      <Card className="login-box">
        <Card.Body>
          <p className="text-center">Sign in to start your session</p>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="text" className="input-group mb-3">
              <Form.Control
                placeholder="Email"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <InputGroup.Text>
                <FaEnvelope />
              </InputGroup.Text>
            </Form.Group>
            <Form.Group controlId="password" className="input-group mb-3">
              <Form.Control
                placeholder="Password"
                type={check ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <InputGroup.Text onClick={() => setCheck((p) => !p)}>
                {!check ? (
                  <FaEye style={{ cursor: "pointer" }} />
                ) : (
                  <FaEyeSlash style={{ cursor: "pointer" }} />
                )}
              </InputGroup.Text>
            </Form.Group>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-2">
                <input type="checkbox" />
                <label>Remember Me</label>
              </div>
              <div>
                {loading ? (
                  <Button disabled className="float-sm-end">
                    <Spinner animation="border" size="sm" />
                  </Button>
                ) : (
                  <Button type="submit" className="float-sm-end">
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </Form>
          <ToastContainer />
        </Card.Body>
      </Card>
    </Container>
  );
}
