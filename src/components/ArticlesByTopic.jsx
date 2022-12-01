import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAllArticlesByTopic, fetchAllArticlesByType } from "../utils/api";
import { Link } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";
import formatDate, { displayDate } from "../utils/formatDate";

const ArticlesByTopic = () => {
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [ordering, setOrdering] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchAllArticlesByTopic(topic)
      .then(({ articles: allArticles }) => {
        setFilteredArticles(allArticles);
        setIsLoading(false);
        setError(null);
      })
      .catch(
        ({
          response: {
            data: { msg },
            status,
          },
        }) => {
          setError({ msg, status });
          setIsLoading(false);
        }
      );
  }, []);

  const handleChange = (e) => {
    setSortBy(e.target.value);
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

  if (error) return <Error error={error} />;
  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <Link to="/articles">
        <div>
          <button className="btn-dark">Back to all articles</button>
        </div>
      </Link>
      <div>
        <h1 className="text-center">{topic.toUpperCase()}</h1>
      </div>
      <div className="mt-4 d-flex justify-content-center">
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
      </div>
      {filteredArticles.map(
        ({ author, title, created_at, votes, comment_count, article_id }) => {
          return (
            <div key={article_id} className="card">
              <h1>{title}</h1>

              <p>
                Written By: <b>{author}</b>
              </p>
              <p>{displayDate(created_at)}</p>
              <p>Votes: {votes}</p>
              <p>Comments: {comment_count}</p>

              <Link to={`/articles/${article_id}`}>View article</Link>
            </div>
          );
        }
      )}
    </div>
  );
};

export default ArticlesByTopic;
