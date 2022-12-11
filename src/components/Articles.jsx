import {
  fetchAllArticles,
  fetchAllTopics,
  fetchAllArticlesByType,
} from "../utils/api";
import { useEffect, useState } from "react";
import Topics from "./Topics";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topicError, setTopicError] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [ordering, setOrdering] = useState("");
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchAllArticles()
      .then(({ articles: allArticles }) => {
        setArticles(allArticles);
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
    setIsLoading(true);
    fetchAllTopics()
      .then(({ topics }) => {
        setTopics(topics);
        setIsLoading(false);
        setTopicError(null);
      })
      .catch(
        ({
          response: {
            data: { msg },
            status,
          },
        }) => {
          setTopicError({ msg, status });
          setIsLoading(false);
        }
      );
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
  if (error)
    return (
      <Error
        error={error}
        errorModal={errorModal}
        setErrorModal={setErrorModal}
      />
    );
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="yellow-bg-border">
        <h1 className="text-bold">ALL ARTICLES</h1>
      </div>
      <section className="container pt-1 pb-3">
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
        {topicError ? (
          <h2 className="text-center text-login-color">
            ERROR {topicError.status}. Topic buttons are supposed to be here!
          </h2>
        ) : (
          <Topics topics={topics} />
        )}

        {articles.map(({ author, title, body, article_id, topic }) => {
          topic = topic.charAt(0).toUpperCase() + topic.slice(1);
          return (
            <article className="card" key={article_id}>
              <h1>{title}</h1>
              <p>
                Written by: <b>{author}</b>
              </p>
              <p>Topic: {topic}</p>
              <br />
              <p className="truncate-content">{body}</p>

              <Link to={`/articles/${article_id}`}>Read more</Link>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default Articles;
