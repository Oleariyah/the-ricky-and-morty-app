export default function ListItem(props) {
  const { label, value, line } = props;

  const capitalize = ([first, ...rest]) =>
    first.toUpperCase() + rest.join("").toLowerCase();

  return (
    <>
      {line && <hr />}
      <div className="d-flex justify-content-between align-items-center">
        <div className="text-muted">{capitalize(label)}</div>
        <div className="mx-2">{value}</div>
      </div>
    </>
  );
}
