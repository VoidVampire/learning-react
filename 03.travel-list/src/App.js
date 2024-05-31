import { useState } from "react";

export default function App() {
  // lifting state up
  const [items, setItems] = useState([]);

  function handleItems(item) {
    setItems((el) => [...el, item]);
  }
  function handleDelete(id) {
    setItems((el) => el.filter((item) => item.id !== id));
  }
  function handleToggle(id) {
    setItems((el) =>
      el.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClear() {
    const conf = window.confirm("Are you sure ?");
    if (conf) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDelete}
        onToggle={handleToggle}
        onClear={handleClear}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>Travel List</h1>;
}

function Form({ onAddItems }) {
  // controlled element to get form data
  const [desc, setDesc] = useState("");
  const [qt, setQt] = useState(1);

  // event handler
  // receives event since handleSubmit is passed as it is
  function handleSubmit(e) {
    if (!desc) return;
    e.preventDefault();
    const newItem = { desc, qt, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDesc("");
    setQt(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need? </h3>
      <select value={qt} onChange={(e) => setQt(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((el) => (
          <option value={el} key={el}>
            {el}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items...."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggle, onClear }) {
  const [sortby, setsortby] = useState("packed");

  let sortedItems;
  if (sortby === "input") sortedItems = items;
  if (sortby === "desc")
    sortedItems = items.slice().sort((a, b) => a.desc.localeCompare(b.desc));
  if (sortby === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((el) => (
          <Item
            itemObj={el}
            onDeleteItem={onDeleteItem}
            onToggle={onToggle}
            key={el.id}
          />
        ))}
      </ul>
      {/* search */}
      <div className="actions">
        <select value={sortby} onChange={(e) => setsortby(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="desc">Sory by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClear}>Clear All</button>
      </div>
    </div>
  );
}

function Item({ itemObj, onDeleteItem, onToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={itemObj.packed}
        onChange={() => {
          onToggle(itemObj.id);
        }}
      ></input>
      <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>
        {itemObj.qt} {itemObj.desc}
      </span>
      <button onClick={() => onDeleteItem(itemObj.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <p>Start adding stuff!!</p>
      </footer>
    );
  // derived state
  const itemsN = items.length;
  const itemsPacked = items.filter((el) => el.packed).length;
  const per = Math.round((itemsPacked / itemsN) * 100);
  return (
    <footer className="stats">
      {per === 100
        ? "Gotem all"
        : `You have ${itemsN} items on your list, and you have already packed ${itemsPacked} items (${per} %)`}
    </footer>
  );
}
