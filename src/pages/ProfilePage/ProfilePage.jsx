import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProfilePage.css";
// import '../DeletePage/DeletePage'
import  Navbar  from "../../components/Navbar/Navbar";
import { Navigate } from "react-router-dom";
import { React, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const ProfileSettings = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [isLoad, setIsLoad] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const jwtToken = localStorage.getItem("Token");

  const successToast = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  const errorToast = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  useEffect(() => {
    setIsLoad(true);
    const fetchUserData = async () => {
      await axios
        .post("http://localhost:5000/author/fetch", { token: jwtToken })
        .then((res) => {
          console.log("fetchUserData", res);
          setFirstName(res.data.data.firstName);
          setLastName(res.data.data.lastName);
          setEmailId(res.data.data.emailId);
        })
        .catch((err) => {
          console.log("fetchUserData", err);
        });
    };
    fetchUserData();
    setIsLoad(false);
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/author/delete", { token: jwtToken })
      .then((response) => {
        console.log(response);
        handleClose();
        successToast(response.data.message);
        localStorage.clear();
        setRedirect(true);
      })
      .catch((error) => {
        errorToast(error.data.message);
        console.log(error);
      });
  };

  const handleChanges = () => {
    console.log("handleChanges");
  };

  const handleUpdate = () => {
    const updatedUserData = {
      token: jwtToken,
      firstName: firstName,
      lastName: lastName,
    };
    axios
      .post("http://localhost:5000/author/edit", updatedUserData)
      .then((res) => {
        console.log(res);
        successToast(res.data.message);
      })
      .catch((res) => {
        errorToast(res.data.message);
      });
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="home-container-profile">
        <div className="container-content-profile ">
          <p className="container-title-profile">Update Account details</p>
          <Form onSubmit={handleChanges}>
            <div className="d-flex gap-5">
              <Form.Group className="mb-3 w-50 " controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className="inputBox"
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 w-50 " controlId="lastName">
                <Form.Label> Last Name</Form.Label>
                <Form.Control
                  className="inputBox"
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
            </div>
            <Form.Group className="mb-3 " controlId="emailId">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="inputBox"
                type="email"
                placeholder="Enter email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                disabled
              />
            </Form.Group>

            <Button className="button" onClick={handleUpdate}>
              Update Profile
            </Button>
          </Form>
          <div className="delete-account" onClick={handleShow}>
            Delete Account
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the account ? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ProfileSettings;
