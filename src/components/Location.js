import ListItem from "./ListItem";
import Skeleton from "react-loading-skeleton";

export default function Location({ location, loading }) {
  return (
    <div className="card p-3 mb-3">
      <div className="card-body">
        <h3 className="card-title">Location</h3>
        {loading ? (
          <Skeleton count={5} />
        ) : (
          ["name", "dimension", "type", "residents"].map((item, index) => (
            <ListItem
              key={index}
              label={item + ":"}
              value={
                item === "residents"
                  ? location?.[item] && location?.[item].length
                  : location?.[item]
              }
              line={index === 0 ? false : true}
            />
          ))
        )}
      </div>
    </div>
  );
}
