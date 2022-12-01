import {
  fetchAllArticles,
  fetchAllTopics,
  fetchAllArticlesByType,
} from "../utils/api";
import { useEffect, useState } from "react";
import Topics from "./Topics";
import { Link } from "react-router-dom";
import Loading from "./Loading";

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

  const handleChange = (e) => {
    setSortBy(e.target.value);
    if (e.target.value !== "") {
      fetchAllArticlesByType(e.target.value, ordering).then(
        ({ articles: allArticles }) => {
          setArticles(allArticles);
          setOrdering("");
        }
      );
    }
  };

  const handleOrdering = (e) => {
    setOrdering(e.target.value);
    if (e.target.value !== "" && sortBy !== "") {
      fetchAllArticlesByType(sortBy, e.target.value).then(
        ({ articles: allArticles }) => {
          setArticles(allArticles);
        }
      );
    }
  };

  if (isLoading) return <Loading />;
  return (
    <div className="container">
      <Topics topics={topics} />
      <div className="mt-4 d-flex justify-content-center ">
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
      {articles.map(({ author, title, body, article_id }) => {
        return (
          <div className="card" key={article_id}>
            <h1 className="truncate-content">{title}</h1>
            <p className="truncate-content">{body}</p>

            <Link to={`/articles/${article_id}`}>Read more</Link>
            <p>
              Written by: <b>{author}</b>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Articles;
