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
    setIsLoading(true);
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
    <>
      <div className="yellow-bg-border">
        <h1 className="text-bold">ALL ARTICLES</h1>
      </div>
      <section className="container pt-1 pb-3 ">
        <div className="mt-4 d-flex justify-content-center ">
          <div className="px-custom ">
            <label className="form-label text-center">Sort By</label>

            <select
              aria-label="choose what you want to sort by"
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
          <div className="px-custom ">
            <label className="form-label text-center">Order By</label>
            <select
              aria-label="choose order by ascending or descending"
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
        <Topics topics={topics} />
        {articles.map(({ author, title, body, article_id, topic }) => {
          topic = topic.charAt(0).toUpperCase() + topic.slice(1);
          return (
            <article className="card" key={article_id}>
              <h1>{title}</h1>
              <p className="truncate-content">{body}</p>

              <Link to={`/articles/${article_id}`}>Read more</Link>
              <p>Topic: {topic}</p>
              <p>
                Written by: <b>{author}</b>
              </p>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default Articles;
