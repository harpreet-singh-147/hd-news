import { fetchAllArticles, fetchAllTopics } from "../api";
import { useEffect, useState } from "react";
import Topics from "./Topics";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
          {articles.map(
            ({
              author,
              title,
              topic,
              body,
              created_at,
              votes,
              comment_count,
            }) => {
              return (
                <div className="card">
                  <h1>{title}</h1>
                  <p>{body}</p>
                  <p>
                    Written by: <b>{author}</b>
                  </p>
                  <p>Topic: {topic}</p>
                  <p>Created: {created_at}</p>
                  <p>{votes} Votes</p>
                  <p>{comment_count} Comments</p>
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
