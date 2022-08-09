import { BrowserRouter, Route, Routes } from "react-router-dom";
import InputSeachUsers from "./Components/InputSeachUsers.js";


function App() {
  return (
    <>  
    <InputSeachUsers/>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
