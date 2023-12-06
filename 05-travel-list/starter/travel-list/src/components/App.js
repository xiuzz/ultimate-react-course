import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

function App() {
  const [items, setItems] = useState([]);
  
  function handleAddSubmit(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteSubmit(itemId) {
    setItems((items) => 
      items.filter((item) => item.id !== itemId)
    );
  }

  function handleToggleItem(itemId) {
    setItems((items) => items.map((item) => {
      if (item.id === itemId) 
        return {...item,packed:!item.packed};
      else 
        return item;
    }))
    console.log(items);
  }

  function handleClearList() {
    const confirmed = window.confirm("Are you sure clear the list?");
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
    <Logo />
    <Form addSubmit={handleAddSubmit}/>
    <PackingList 
      items={items} 
      deleteSubmit={handleDeleteSubmit} 
      toggleItem={handleToggleItem}
      clearList={handleClearList}
    />
    <Stats items={items}/>
    </div>
  );
}

export default App;
