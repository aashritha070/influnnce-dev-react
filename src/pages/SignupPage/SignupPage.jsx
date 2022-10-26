import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate } from "react-router-dom";
import { React } from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const[tags, setTags]=useState([null])
  const length=tags.length
  const [redirect, setRedirect] = useState(false);

  const successToast = () =>
  toast.success("User Successfully added!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });

const errorToast = () =>
  toast.error("User already exists!", {
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
    localStorage.clear();
    const userData = {
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: password,
      tags:[],
    };
  
    console.log(userData);
    axios
      .post("http://localhost:5000/auth/signup", userData)
      .then((response) => {
        localStorage.setItem("Token", response.data.authToken);
        console.log("response quote", response);
        successToast();
        setRedirect(true);
      })
      .catch((error) => {
        console.log(error);
        errorToast();
      });
  };
  if (redirect) {
    return <Navigate to="/" />;
  }
  if(length(tags)===0){
    return  <Navigate to="/tagSelect" />
  }
  return (
    <div className="home-container">
      <ToastContainer />
      <div className="container-content">
        <p className="container-title">Create Account</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              className="inputBox"
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label> Last Name</Form.Label>
            <Form.Control
              className="inputBox"
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

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
            Sign Up
          </Button>

          <div className="container-footer">
            Already have an account ? <a href="/login">Login</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
