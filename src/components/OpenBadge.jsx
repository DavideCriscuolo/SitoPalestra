import useOpenStatus from "../hooks/useOpenStatus";

export default function OpenBadge({ className = "" }) {
  const { open, text } = useOpenStatus();
  return (
    <span className={`open-badge ${open ? "is-open" : "is-closed"} ${className}`}>
      <span className="open-dot" aria-hidden="true" />
      {text}
    </span>
  );
}
