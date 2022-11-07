import { fetchAllArticles, fetchAllTopics } from "../api";
import { useEffect, useState } from "react";
import Topics from "./Topics";
import { Link } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [ordering, setOrdering] = useState("");
  useEffect(() => {
    setIsLoading(true);
    fetchAllArticles()
      .then(({ articles: allArticles }) => {
        setArticles(allArticles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(true);
      });
    fetchAllTopics()
      .then(({ topics }) => {
        setTopics(topics);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(true);
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="container">Loading...</div>
      ) : (
        <div className="container">
          <Topics topics={topics} />
          <div>
            <label className="form-label text-center">Sort By</label>

            <select className="form-control" defaultValue={sortBy}>
              <option value="created_at">Created at</option>
              <option value="comment_count">Comment count</option>
              <option value="votes">Votes count</option>
            </select>
          </div>
          <div>
            <label className="form-label text-center">Order By</label>
            <select className="form-control" defaultValue={ordering}>
              <option value="ASC">ASC</option>
              <option value="DESC">DESC</option>
            </select>
          </div>
          {articles.map(
            ({
              author,
              title,
              topic,
              body,
              created_at,
              votes,
              comment_count,
              article_id,
            }) => {
              return (
                <div className="card">
                  <h1>{title}</h1>

                  <p>
                    Written by: <b>{author}</b>
                  </p>
                  <p>Topic: {topic}</p>
                  <p>Created: {created_at}</p>

                  <Link to={`/articles/${article_id}`}>View article</Link>
                </div>
              );
            }
          )}
        </div>
      )}
    </>
  );
};

export default Articles;
