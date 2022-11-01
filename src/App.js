import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import Header from "./components/Header";
import ArticlesByTopic from "./components/ArticlesByTopic";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/topics/:topic" element={<ArticlesByTopic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
