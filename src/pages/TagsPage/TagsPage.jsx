import "./TagsPage.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
function Tags() {
  const [allTags, setAllTags] = useState([]);
  const jwtToken = {
    token: localStorage.getItem("Token"),
  };

  useEffect(() => {
    const fetchAllTags = async () => {
      await axios
        .post("http://localhost:5000/tags", jwtToken)
        .then((res) => {
          console.log("fetchAllTags", res);
          setAllTags(res.data.tags);
        })
        .catch((err) => {
          console.log("fetchAllTags", err);
        });
    };

    fetchAllTags();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="home-container-tag">
        <div className="container-content-tag">
          <p className="container-title-tag">Choose your domain of interest!</p>

          <div className="tags-select-box">
            {allTags.map((tag) => (
             <><li className="tags-select-box-input"><input  type="checkbox" id="scales" value={tag.key}  name="scales" ></input><label for="scales">{tag.label}</label></li></>
             
            ))}
          </div>

          <button className="button">Next</button>
        </div>
      </div>
    </div>
  );
}

export default Tags;
