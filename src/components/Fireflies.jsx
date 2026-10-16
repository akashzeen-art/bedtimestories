export default function Fireflies({ count = 13 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="firefly" style={{ zIndex: 2 }} />
      ))}
    </>
  );
}
