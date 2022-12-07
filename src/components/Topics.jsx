import { Link } from "react-router-dom";

const Topics = ({ topics }) => {
  return (
    <div>
      <h3 className="text-center">View Specific Topic</h3>
      <div className="d-flex justify-content-center text-center">
        {topics.map((topic) => {
          return (
            <Link to={`/articles/topics/${topic.slug}`} key={topic.slug}>
              <button
                aria-label={`choose ${topic.slug}`}
                className="btn-dark all-articles-page-btn width-media-400-topic-btn"
              >
                {topic.slug}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Topics;
