import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import Home from "./pages/HomePage/HomePage.jsx";
import Login from "./pages/LoginPage/LoginPage.jsx";
import ViewPost from "./pages/ViewPost/ViewPost.jsx";
import WritePost from "./pages/WritePage/WritePage.jsx";
import SignUp from "./pages/SignupPage/SignupPage.jsx";
import BlogList from "./pages/BlogList/BlogList";
import ProfileSettings from "./pages/ProfilePage/ProfilePage.jsx";
import PasswordChange from "./pages/PasswordChange/PasswordChange";
import Tags from "./pages/TagsPage/TagsPage";
import DeleteUser from "./pages/DeletePage/DeletePage";

import "./main.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/tagselect" element={<Tags />}></Route>
          <Route exact path="/writepost" element={<WritePost />}></Route>
          <Route exact path="/profile" element={<ProfileSettings />}></Route>
          <Route exact path="/password" element={<PasswordChange />}></Route>
          <Route exact path="/deleteUser" element={<DeleteUser />}></Route>
          <Route exact path="/view/:id" element={<ViewPost />}></Route>
          <Route
            exact
            path="/blogsview/:key/:value"
            element={<BlogList />}
          ></Route>
          <Route path="/posts/:postId" element={<ViewPost />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
