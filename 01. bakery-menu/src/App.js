import React from "react";
import "./index.css";

const bakeryMenu = [
  {
    name: "Chocolate Croissant",
    description: "A flaky, buttery croissant filled with rich chocolate.",
    price: 2.99,
    category: "Pastry",
    photoName: "itemsgallery/chocolate_croissant.jpg",
    availability: true,
  },
  {
    name: "Blueberry Muffin",
    description: "A soft muffin filled with fresh blueberries.",
    price: 1.99,
    category: "Muffin",
    photoName: "itemsgallery/blueberry_muffin.jpg",
    availability: true,
  },
  {
    name: "Sourdough Bread",
    description: "A tangy, crusty sourdough loaf.",
    price: 3.99,
    category: "Bread",
    photoName: "itemsgallery/sourdough_bread.jpg",
    availability: false,
  },
  {
    name: "Chocolate Cake",
    description: "A rich, moist chocolate cake with a creamy frosting.",
    price: 4.99,
    category: "Cake",
    photoName: "itemsgallery/chocolate_cake.jpg",
    availability: true,
  },
  {
    name: "Cinnamon Roll",
    description:
      "A soft, sweet roll with a cinnamon-sugar filling and cream cheese frosting.",
    price: 2.49,
    category: "Pastry",
    photoName: "itemsgallery/cinnamon_roll.jpg",
    availability: true,
  },
  {
    name: "Banana Bread",
    description:
      "A moist and flavorful bread made with ripe bananas and walnuts.",
    price: 3.49,
    category: "Bread",
    photoName: "itemsgallery/banana_bread.jpg",
    availability: false,
  },
  {
    name: "Apple Pie",
    description:
      "A classic pie filled with sweet, spiced apples and a flaky crust.",
    price: 5.99,
    category: "Pie",
    photoName: "itemsgallery/apple_pie.jpg",
    availability: true,
  },
  {
    name: "Almond Biscotti",
    description:
      "A crunchy, twice-baked cookie with almonds and a hint of anise.",
    price: 1.99,
    category: "Cookie",
    photoName: "itemsgallery/almond_biscotti.jpg",
    availability: true,
  },
  {
    name: "Vanilla Eclair",
    description:
      "A choux pastry filled with vanilla cream and topped with chocolate glaze.",
    price: 3.29,
    category: "Pastry",
    photoName: "itemsgallery/vanilla_cclair.jpg",
    availability: false,
  },
  {
    name: "Cheesecake",
    description: "A rich and creamy cheesecake with a graham cracker crust.",
    price: 4.99,
    category: "Cake",
    photoName: "itemsgallery/cheesecake.jpg",
    availability: true,
  },
];

function Header() {
  return (
    <header className="header">
      <h1>Void Bakery Co.</h1>
    </header>
  );
}

function Menu() {
  const items = bakeryMenu;
  return (
    <main className="menu">
      <h2>Menu</h2>
      <p>
        Indulge in our freshly baked croissants, artisan breads, and delicious
        pastries made daily with the finest ingredients.
      </p>
      <ul className="bakeryItems">
        {items.map((el) => (
          <BakeryItem bakeryObj={el} key={el.name} />
        ))}
      </ul>
    </main>
  );
}

function BakeryItem({ bakeryObj }) {
  // if (!bakeryObj.availability) return null;
  return (
    <li className={`bakeryItem ${bakeryObj.availability ? "" : "sold-out"}`}>
      <img src={bakeryObj.photoName} alt={bakeryObj.name} />
      <h3>{bakeryObj.name}</h3>
      <p>{bakeryObj.description}</p>
      <p>{bakeryObj.category}</p>
      <span>{bakeryObj.availability ? bakeryObj.price : "Sold Out!"}</span>
    </li>
  );
}

function Footer() {
  const openHour = 10;
  const closeHour = 21;
  const hour = new Date().getHours();
  const isOpen = hour >= openHour && hour <= closeHour;
  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          {new Date().toLocaleTimeString()} | We're currently closed. Please
          visit us between 10 AM and 10 PM!{" "}
        </p>
      )}
    </footer>
  );
}

function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>{new Date().toLocaleTimeString()} | We're currently open!🟢🟢</p>
      <p>
        We are open from {openHour}:00 to {closeHour}:00
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

export default function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
