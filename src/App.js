import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Components/Login/SignUp";
import SignIn from "./Components/Login/SignIn";
import InputSeachUsers from "./Components/InputSeach/InputSeachUsers";
import TelaUser from "./Pages/TelaUser.js"
import PostsPage from './Components/Posts/PostsPage';
import Header from './Components/Header';
import { useState } from "react";
import UserContext from "./contexts/UserContext";


function App() {
  const [userData,setUserData] = useState({})

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/:id" element={<TelaUser/>} />
        <Route path="/buscar" element ={<InputSeachUsers/>}/>
        <Route path="/" element={<PostsPage />} />
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
