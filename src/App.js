import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Components/Login/SignUp";
import SignIn from "./Components/Login/SignIn";
import InputSeachUsers from "./Components/InputSeachUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
