export default function Episodes({ episode }) {
  return (
    <div className="card p-3 mb-3">
      <div className="card-body">
        <h3 className="card-title">Featured Episodes</h3>
        {episode && episode.length > 0 ? (
          episode.map((item, i) => (
            <span key={i}>
              {item.name}
              {episode.length === i + 1 && "."}
              {episode.length !== i + 1 && ","}{" "}
            </span>
          ))
        ) : (
          <span>No episodes found.</span>
        )}
      </div>
    </div>
  );
}
