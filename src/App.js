import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import Header from "./components/Header";
import ArticlesByTopic from "./components/ArticlesByTopic";
import Article from "./components/Article";
import { useState } from "react";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <BrowserRouter>
      <Nav loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Welcome
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
            />
          }
        />
        <Route path="/articles" element={<Articles />} />

        <Route
          path="/articles/:article_id"
          element={
            <Article
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
            />
          }
        />
        <Route path="/articles/topics/:topic" element={<ArticlesByTopic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
