import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Components/Login/SignUp";
import SignIn from "./Components/Login/SignIn";
import PostsPage from './Components/PostsPage';
import Header from './components/Header';
import InputSeachUsers from "./Components/InputSeachUsers";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<PostsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
