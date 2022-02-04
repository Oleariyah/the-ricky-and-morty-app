import ListItem from "./ListItem";

export default function Summary({ character }) {
  return (
    <div className="card p-3">
      <div className="card-body">
        <img src={character?.image} alt="character" className="circle mb-3" />
        <hr />
        {["name", "gender", "status", "species"].map((item, index) => (
          <ListItem
            key={index}
            label={item + ":"}
            value={character?.[item]}
            line={index === 0 ? false : true}
          />
        ))}
      </div>
    </div>
  );
}
