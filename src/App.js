import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Components/Login/SignUp";
import SignIn from "./Components/Login/SignIn";
import InputSeachUsers from "./Components/InputSeach/InputSeachUsers";

import TelaUser from "./Pages/TelaUser.js"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/:id" element={<TelaUser/>} />
        <Route path="/buscar" element ={<InputSeachUsers/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
