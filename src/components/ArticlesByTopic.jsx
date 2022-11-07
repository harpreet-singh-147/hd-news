import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAllArticlesByTopic, fetchAllArticlesByType } from "../api";
import { Link } from "react-router-dom";

const ArticlesByTopic = () => {
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [ordering, setOrdering] = useState("");
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

  const handleChange = (e) => {
    setSortBy(e.target.value);
    //On Changing Run the Filter(API Request)
    if (e.target.value !== "") {
      fetchAllArticlesByType(e.target.value, ordering, topic).then(
        ({ articles: allArticles }) => {
          setFilteredArticles(() => allArticles);
          setOrdering("");
        }
      );
    }
  };

  const handleOrdering = (e) => {
    setOrdering(e.target.value);
    if (e.target.value !== "" && sortBy !== "") {
      fetchAllArticlesByType(sortBy, e.target.value, topic).then(
        ({ articles: allArticles }) => {
          setFilteredArticles(() => allArticles);
        }
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container">
          <Link to="/articles">
            <button>Back to all articles</button>
          </Link>
          <div>
            <h1 className="text-center">{topic.toUpperCase()}</h1>
          </div>
          <div>
            <label className="form-label text-center">Sort By</label>

            <select
              className="form-control"
              defaultValue={sortBy}
              onChange={(e) => handleChange(e)}
            >
              <option value="">Choose option</option>
              <option value="created_at">Date created</option>
              <option value="comment_count">Comment count</option>
              <option value="votes">Votes</option>
            </select>
          </div>
          <div>
            <label className="form-label text-center">Order By</label>
            <select
              className="form-control"
              defaultValue={ordering}
              onChange={(e) => handleOrdering(e)}
            >
              <option value="" selected={ordering === "" ? "selected" : ""}>
                Choose option
              </option>
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>
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
