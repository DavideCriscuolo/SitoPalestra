export default function LoaderC() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="spinner-border"
        role="status"
        style={{ width: "5rem", height: "5rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
