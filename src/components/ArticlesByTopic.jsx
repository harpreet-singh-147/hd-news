import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAllArticles } from "../api";
import { Link } from "react-router-dom";

const ArticlesByTopic = () => {
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { topic } = useParams();

  useEffect(() => {
    fetchAllArticles()
      .then(({ articles: allArticles }) => {
        setFilteredArticles(
          allArticles.filter((article) => {
            return article.topic === topic;
          })
        );
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(true);
      });
  });

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container">
          <Link to="/articles">
            <button>Back to all articles</button>
          </Link>
          {filteredArticles.map(
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
                  <p>{body}</p>
                  <p>
                    Written By: <b>{author}</b>
                  </p>
                  <p>{topic}</p>
                  <p>{created_at}</p>
                  <p>{votes}</p>
                  <p>{comment_count}</p>
                  <Link to={`/articles/${article_id}`}>View Details</Link>
                </div>
              );
            }
          )}
        </div>
      )}
    </>
  );
};

export default ArticlesByTopic;
