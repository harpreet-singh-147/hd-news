import { Link } from "react-router-dom";

const Topics = ({ topics }) => {
  return (
    <div>
      <h5>View Specific Topic</h5>

      {topics.map((topic) => {
        return (
          <Link to={`/articles/topics/${topic.slug}`}>
            <button>{topic.slug}</button>
          </Link>
        );
      })}
    </div>
  );
};

export default Topics;
