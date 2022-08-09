import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/Login/SignUp";
import SignIn from "./components/Login/SignIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={< SignIn />} />
          <Route path="/signup" element={< SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
