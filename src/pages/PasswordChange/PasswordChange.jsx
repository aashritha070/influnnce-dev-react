import Button from "react-bootstrap/button";
import  Form  from "react-bootstrap/Form";
import "./PasswordChange.css";
import  Navbar  from "../../components/Navbar/Navbar";
import { Navigate } from "react-router-dom";
import { React } from "react";
import { useState } from "react";
import axios from "axios";

const PasswordChange = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const jwtToken = localStorage.getItem("Token");

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/author/password", {
        token: jwtToken,
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="home-container-password">
        <div className="container-content-password ">
          <p className="container-title-password">Change Password</p>
          <Form>
            <div className="d-flex-column">
              <form className="mb-3 " controlId="firstName">
                <Form.Label>Enter new password</Form.Label>
                <Form.Control
                  className="inputBox"
                  type="text"
                  placeholder="Enter current password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </form>

              <form className="mb-3  " controlId="lastName">
                <Form.Label>Confirm new password</Form.Label>
                <Form.Control
                  className="inputBox"
                  type="text"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </form>
            </div>

            <Button className="button-password" onClick={handleUpdate}>
              Update Password
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default PasswordChange;
