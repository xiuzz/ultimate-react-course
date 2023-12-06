export default function Stats({ items }) {
  const len = items.length;
  if (!len) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list!</em>
      </footer>
    );
  }
  const packedItems = items.filter((it) => it.packed).length;
  const percent = Math.round((packedItems / len) * 100);
  return (
    <footer className="stats">
      {packedItems === len ?
        (
          <em>
            You got everything! Ready to go 🚃
          </em>
        ) :
        (
          <em>
            👜You have {len} items on your list, and you already  packed: {packedItems} ({percent}%)
          </em>
        )}
    </footer>
  );
}
