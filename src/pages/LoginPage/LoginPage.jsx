import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { React } from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const successToast = () =>
    toast.success("Account Successfully logged in!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  const wrongCred = () =>
    toast.error("Enter valid login credentials!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      emailId: emailId,
      password: password,
    };
    console.log(userData);
    axios
      .post(`http://localhost:5000/auth/login`, userData)
      .then((response) => {
        localStorage.setItem("Token", response.data.authToken);
        console.log(response);
        successToast();
        setRedirect(true);
      })
      .catch((error) => {
        console.log(error);
        wrongCred();
      });
  };
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <ToastContainer />
      <div className="home-container">
        <div className="container-content">
          <p className="container-title">Login to your account</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="emailId">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="inputBox"
                type="email"
                placeholder="Enter email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="inputBox"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button className="auth-button" type="submit">
              Login
            </Button>

            <div className="container-footer">
              New to MyApp? <a href="/signup"> Sign Up</a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;