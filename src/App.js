import { useState } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import UserContext from "./contexts/UserContext";
import SignUp from "./Components/Login/SignUp";
import SignIn from "./Components/Login/SignIn";
import TelaUser from "./Pages/TelaUser.js";
import PostsPage from "./Components/Posts/PostsPage";
import HashtagPage from "./Pages/HashtagPage";
import UrlContext from "./contexts/UrlContext";
import SearchNewUpdates from "./Components/Posts/SearchNewUpdates";

function App() {
  const [userData, setUserData] = useState({});
  const [userPageId, setUserPageId] = useState({});
  const url = process.env.REACT_APP_MODE === "DEV" ? "http://localhost:4000" : "https://backlinkr.herokuapp.com";
  const [URL] = useState(url);

  return (
    <UrlContext.Provider value={URL}>
      <UserContext.Provider value={{ userData, setUserData, userPageId, setUserPageId }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/user/:id" element={<TelaUser />} />
            <Route path="/buscar" element={<SearchNewUpdates/>} />
            <Route path="/timeline" element={<PostsPage />} />
            <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </UrlContext.Provider>

  );
}

export default App;
