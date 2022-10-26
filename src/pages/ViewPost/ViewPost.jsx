import React from 'react'
import {useEffect, useState } from 'react';
import axios from 'axios';
import  Navbar  from '../../components/Navbar/Navbar';
import './viewPost.css';
function viewPost() {

  const [title, setTitle]=useState

  return (
    <div>
    <Navbar/>
    <div className="currentPost">
      <div className="currentViewPost">
          <img
            className="viewingImg"
            src="https://img.freepik.com/free-photo/beautiful-scenery-road-forest-with-lot-colorful-autumn-trees_181624-30942.jpg?w=2000"
            alt="none"
          ></img>
      </div>
       
      <div className="blogChanges">
              <span className="blogEdit">
              <i class="fa fa-edit"></i>
              </span>
              <span className="blogDelete">
              <i class="fa fa-trash"></i>
              </span>
            </div>
      <div className="CurrentInfo">
        <span className="author">
          Author:<b>author name</b>
            
        </span>
        <span className="Date">
          <b>current date</b>
        </span> 
      </div>

    
        <p className="desc">description</p>
   
    
   
    </div>
    </div>
 
  )};
  export default  viewPost;