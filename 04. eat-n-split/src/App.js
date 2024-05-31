import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setshowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleAddF() {
    setshowAddFriend((el) => !el);
    setSelectedFriend(false);
  }
  function handleAddFriend(friend) {
    setFriends((el) => [...el, friend]);
    setshowAddFriend(false);
  }
  function handleDeleteF() {
    setFriends([]);
  }
  function handleSelectFriend(friend) {
    setSelectedFriend((el) => (el?.id === friend.id ? null : friend));
    setshowAddFriend(false);
  }
  function handleSplit(val) {
    setFriends((friends) =>
      friends.map((el) =>
        el.id === selectedFriend.id ? { ...el, balance: el.balance + val } : el
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelectFriend={handleSelectFriend}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <AddFriendForm onAddFriend={handleAddFriend} />}

        <Button onClick={handleAddF}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>

        <Button onClick={handleDeleteF}>Clear all Friends</Button>
      </div>
      {selectedFriend && (
        <SplitForm selectedFriend={selectedFriend} onSplit={handleSplit} />
      )}
    </div>
  );
}

function FriendList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((el) => (
        <Friend
          friendDetails={el}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
          key={el.id}
        />
      ))}
    </ul>
  );
}
function Friend({ friendDetails, onSelectFriend, selectedFriend }) {
  const isSelected = friendDetails.id === selectedFriend?.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friendDetails.image} alt={friendDetails.name} />
      <h3>{friendDetails.name}</h3>
      {friendDetails.balance === 0 ? (
        <p className="neutral">You and {friendDetails.name} are even.</p>
      ) : friendDetails.balance < 0 ? (
        <p className="red">
          You owe {friendDetails.name} ${Math.abs(friendDetails.balance)}
        </p>
      ) : (
        <p className="green">
          {friendDetails.name} owes you ${friendDetails.balance}
        </p>
      )}
      <Button onClick={() => onSelectFriend(friendDetails)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function AddFriendForm({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleFriendSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?u=${id}`,
      balance: 0,
      id: id,
    };
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleFriendSubmit}>
      <label> Friend Name </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>Image URL </label>
      <input
        type="url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  );
}

function SplitForm({ selectedFriend, onSplit }) {
  const [bill, setBill] = useState("");
  const [expenseU, setexpenseU] = useState("");
  const [whoisP, setWhoisP] = useState("user");
  const expenseFriend = bill ? bill - expenseU : "";

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !expenseU) return;
    onSplit(whoisP === "user" ? expenseFriend : -expenseU);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split bill with {selectedFriend.name}</h2>
      <label>Bill Value </label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>
      <label>Your Expense </label>
      <input
        type="text"
        value={expenseU}
        onChange={(e) =>
          setexpenseU(
            Number(e.target.value) > bill ? expenseU : Number(e.target.value)
          )
        }
      ></input>
      <label>{selectedFriend.name} Expense </label>
      <input type="text" disabled value={expenseFriend}></input>
      <label>Who's paying? </label>
      <select value={whoisP} onChange={(e) => setWhoisP(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split</Button>
    </form>
  );
}
