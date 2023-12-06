import { useState } from "react";
import Item  from "./Item";

export default function PackingList({ items, deleteSubmit, toggleItem, clearList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortItems;

  if (sortBy === "description") {
    sortItems = items.slice().sort((a, b) => (a.description.localeCompare(b.description)));
  }
  else if (sortBy === "packed") {
    sortItems = items.slice().sort((a, b) => (Number(a.packed) - Number(b.packed)));
  }
  else {
    sortItems = items;
  }

  return (
    <div className="list">
      <ul>
        {sortItems.map((item) => (
          <Item item={item} key={item.id} deleteSubmit={deleteSubmit} toggleItem={toggleItem} />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={clearList}>Clear list</button>
      </div>
    </div>
  );
}
