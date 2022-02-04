export default function NotFound() {
  return (
    <div className="d-flex flex-row">
      <div className="d-flex flex-column flex-grow-1 page-container mt-5 p-5 align-items-center">
        <span className="text-muted not-found">404</span>
        <span className="h1" style={{ lineHeight: 0 }}>
          Page Not Found.
        </span>
      </div>
    </div>
  );
}
