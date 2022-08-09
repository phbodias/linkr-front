import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/Login/SignUp";
import SignIn from "./components/Login/SignIn";
import InputSeachUsers from "./Components/InputSeachUsers.js";

function App() {
  return (
    <>  
    <InputSeachUsers/>
    
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
