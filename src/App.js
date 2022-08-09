import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/Login/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={< SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
