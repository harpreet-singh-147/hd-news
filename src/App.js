import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import ArticlesByTopic from "./components/ArticlesByTopic";
import Article from "./components/Article";
import { useState } from "react";
import Error from "./components/Error";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <BrowserRouter>
      <Nav loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Welcome
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            </>
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
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
