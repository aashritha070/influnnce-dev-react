import { Navbar } from "../../components/Navbar/Navbar";
import React from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { TagInput } from "evergreen-ui";
import { TextInputField } from "evergreen-ui";
import { Pane, FileUploader, FileCard } from "evergreen-ui";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import "./WritePage.css";
import { Button } from "react-bootstrap";

function WritePost() {
  const [convertedText, setConvertedText] = useState("Some default content");
  const [files, setFiles] = useState([]);
  const [fileRejections, setFileRejections] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [value, setValue] = useState("");
  const jwtToken = localStorage.getItem("Token");

  const handleCoverPicUpload = useCallback((files) => setFiles([files[0]]), []);
  const handleCoverPicRejected = useCallback(
    (fileRejections) => setFileRejections([fileRejections[0]]),
    []
  );
  const handleRemove = useCallback(() => {
    setFiles([]);
    setFileRejections([]);
  }, []);

  const [values, setValues] = useState([]);

  const successToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };

  const errorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };

  const allValues = useMemo(
    () => [
      "First",
      "Second",
      "Third",
      "Fourth",
      "Fifth",
      "Sixth",
      "Seventh",
      "Eighth",
      "Ninth",
      "Tenth",
    ],
    []
  );

  const autocompleteItems = useMemo(
    () => allValues.filter((i) => !values.includes(i)),
    [allValues, values]
  );

  const handleCoverPicSubmit = async () => {
    let data = new FormData();
    data.append("file", files[0]);
    data.append("token", jwtToken);
    console.log("handleCoverPicSubmit", data);
    await axios
      .post("http://localhost:5000/blog/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("handleCoverPicSubmit", res);
        successToast();
      })
      .catch((err) => {
        console.log("handleCoverPicSubmit", err);
        errorToast();
      });
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="write-wrapper">
        <div className="image-container">
          <Pane>
            <FileUploader
              label="Upload your blog's cover image"
              description="You can upload 1 file. File can be up to 50 MB."
              maxSizeInBytes={50 * 1024 ** 2}
              maxFiles={1}
              onChange={handleCoverPicUpload}
              onRejected={handleCoverPicRejected}
              renderFile={(file) => {
                const { name, size, type } = file;
                const fileRejection = fileRejections.find(
                  (fileRejection) => fileRejection.file === file
                );
                const { message } = fileRejection || {};
                return (
                  <FileCard
                    key={name}
                    isInvalid={fileRejection != null}
                    name={name}
                    onRemove={handleRemove}
                    sizeInBytes={size}
                    type={type}
                    validationMessage={message}
                  />
                );
              }}
              values={files}
            />
          </Pane>
        </div>
        <div className="tag-add-container">
          <h6 className="tag-add-title">Please choose the categories</h6>
          <p>
            <TagInput
              inputProps={{ placeholder: "Enter something..." }}
              values={values}
              onChange={setValues}
              autocompleteItems={autocompleteItems}
            />
          </p>
        </div>
        <div className="blog-title-container">
          <TextInputField
            inputHeight={40}
            placeholder="Title.."
            className="eg-textInput"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </div>
        <div className="blog-edit-container">
          <ReactQuill
            theme="snow"
            value={convertedText}
            onChange={setConvertedText}
            style={{ minHeight: "fit-content" }}
          />
        </div>
        <div className="blog-footer-container">
          <Button onClick={handleCoverPicSubmit}>update changes</Button>
        </div>
      </div>
    </div>
  );
}
export default WritePost;
