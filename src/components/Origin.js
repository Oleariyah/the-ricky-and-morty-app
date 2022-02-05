import Skeleton from "react-loading-skeleton";
import ListItem from "./ListItem";

export default function Origin({ origin, loading }) {
  return (
    <div className="card p-3 mb-3">
      <div className="card-body">
        <h3 className="card-title">Origin</h3>
        {loading ? (
          <Skeleton count={5} />
        ) : (
          ["name", "dimension", "type", "residents"].map((item, index) => (
            <ListItem
              key={index}
              label={item + ":"}
              value={
                item === "residents"
                  ? origin?.[item] && origin?.[item].length
                  : origin?.[item]
              }
              line={index === 0 ? false : true}
            />
          ))
        )}
      </div>
    </div>
  );
}
