import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PostsPage from './components/PostsPage';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<PostsPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
