import { Link } from "react-router-dom";

const Topics = ({ topics }) => {
  return (
    <div>
      <h3 className="text-center">View Specific Topic</h3>
      <div className="d-flex justify-content-center">
        {topics.map((topic) => {
          return (
            <Link to={`/articles/topics/${topic.slug}`} key={topic.slug}>
              <button className="btn-dark">{topic.slug}</button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Topics;
