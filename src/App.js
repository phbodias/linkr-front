import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import SignUp from "./Components/Login/SignUp";
import SignIn from "./Components/Login/SignIn";
import InputSearchUsers from "./Components/InputSearch/InputSearchUsers";
import TelaUser from "./Pages/TelaUser.js"
import PostsPage from './Pages/PostsPage';
import HashtagPage from "./Pages/HashtagPage";



function App() {
  const [userData,setUserData] = useState({})

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/:id" element={<TelaUser/>} />
        <Route path="/buscar" element ={<InputSearchUsers/>}/>
        <Route path="/timeline" element={<PostsPage />} />
        <Route path="/hashtag/:hashtag" element={<HashtagPage/>}/>
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
