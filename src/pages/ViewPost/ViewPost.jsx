import Navbar from "../../components/Navbar/Navbar";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router";

import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import "./viewPost.css";

import parse from 'html-react-parser'


export default function ViewPost() {

  const location = useLocation();
  const blogId = location.pathname.split("/")[2];
  const [blogById, setblogById] = React.useState();
  const [isLoad, setIsLoad] = useState(false);
  const [tags, setTags] = React.useState([]);
  const [coverPicId, setCoverPicId] = React.useState();
  const [coverImage, setCoverImage] = React.useState();

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


  useEffect(() => {
    setIsLoad(true);
    const fetchBlogById = async () => {
      await axios
        .post(`http://localhost:5000/blog/id/${blogId}`)
        .then((res) => {
          console.log(res)
          setblogById(res.data.data);
          setTags(res.data.data.tags)
          if (res.data.data.coverPic) {
            setCoverPicId(res.data.data.coverPic)
            fetchCoverPic();
          }
        })
        .catch((err) => {
          console.log("fetchBlogById", err);
        });
    };
    fetchBlogById();

    const fetchCoverPic = async () => {
      await axios
        .post(`http://localhost:5000/blog/coverpic/${coverPicId}`)
        .then((res) => {
          console.log(res)
          var base64Flag = 'data:image/jpeg;base64,';
          var imageStr = this.arrayBufferToBase64(res.data.img.data.data);
          setCoverImage(res.data.data);
        })
        .catch((err) => {
          console.log("fetchCoverPic", err);
        });
    }
    setIsLoad(false);
  }, [blogId, coverPicId]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }


  if (isLoad) {
    return <div></div>;
  }

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="write-wrapper">
        <div className="image-container">
          {<div> <img src="data:image/<%=coverImage.img.contentType%>;base64,
              <%=coverImage.img.data.toString('base64')%>" />
          </div>
          }

        </div>

        <div>
          {blogById?.firstName + blogById?.lastName}
        </div>

        <div>
          {tags.map((tag) => (
            <div>
              {tag}
            </div>
          ))}
        </div>

        <div>
          {formatDate(blogById?.createdAt)}
        </div>

        <div className="tag-add-container">

        </div>
        <div className="blog-title-container">
          <div>{blogById?.title}</div>
        </div>
        <div className="blog-view-container">
          <div dangerouslySetInnerHTML={{ __html: blogById?.content }}></div>
        </div>
      </div>
    </div>
  );
}
