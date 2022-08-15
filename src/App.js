import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import SignUp from "./Components/Login/SignUp";
import SignIn from "./Components/Login/SignIn";
import InputSearchUsers from "./Components/InputSearch/InputSearchUsers";
import TelaUser from "./Pages/TelaUser.js";
import PostsPage from "./Pages/PostsPage";
import HashtagPage from "./Pages/HashtagPage";
import UrlContext from "./contexts/UrlContext";

function App() {
  const [userData, setUserData] = useState({});
  const url = process.env.REACT_APP_MODE === "DEV" ? "http://localhost:4000" : "https://backlinkr.herokuapp.com";
  console.log(process.env.REACT_APP_MODE);
  const [URL, _] = useState(url);

  return (
    <UrlContext.Provider value={URL}>
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/user/:id" element={<TelaUser />} />
            <Route path="/buscar" element={<InputSearchUsers />} />
            <Route path="/timeline" element={<PostsPage />} />
            <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </UrlContext.Provider>

  );
}

export default App;
