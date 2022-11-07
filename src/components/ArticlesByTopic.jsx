import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAllArticlesByTopic } from "../api";
import { Link } from "react-router-dom";

const ArticlesByTopic = () => {
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchAllArticlesByTopic(topic)
      .then(({ articles: allArticles }) => {
        setFilteredArticles(allArticles);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(true);
      });
  }, []);

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

                  <p>
                    Written By: <b>{author}</b>
                  </p>
                  <p>Topic: {topic}</p>
                  <p>{created_at}</p>

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

export default ArticlesByTopic;
