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
  
export default function App() {
    const [friends, setFriends] = useState(initialFriends);
    const [curSelect, setSelect] = useState(null);
    const [addFriendUI, setAddFriendUI] = useState(false);
    const curSelectFriend = friends.filter((el) => el.id === curSelect)[0];
    function handleSelectState(friendId) {
        setSelect((el) => {
            if (el === friendId) el = null;
            else el = friendId;
            return el;
        });
    }

    function handleAddFriend(friend) {
        setFriends((el) => [...el, friend])    
    }

    function handleDeleteFriend(friendId)  {
        setFriends((els) => els.filter((el) => el.id !== friendId))
    }

    function handleModifyFriend(friend) {
        handleDeleteFriend(friend.id);
        handleAddFriend(friend);
    }

    return(
        <div className="app">
            <div className="sidebar">
                <FriendsList 
                    friends={friends}
                    handleSelectState={handleSelectState}
                    curSelect={curSelect}
                />
                {addFriendUI && <FormAddFriend handleAddFriend={handleAddFriend}/>}
                <Button 
                    eventFunction={() => setAddFriendUI((el) => !el)}>
                    {addFriendUI ? "Close" : "Add friend"}
                </Button>
            </div>

            {curSelect && 
            <FormSplitBill 
                friend={curSelectFriend}
                key={curSelect}
                handleModifyFriend={handleModifyFriend}
            />}
        </div>
    )
}

function Button({children, eventFunction}) {
    return (
        <button onClick={eventFunction} className="button">
            {children}
        </button>
    )
}

function FriendsList({friends,handleSelectState,curSelect}) {
    return (
        <ul >
            {friends.map((el) => 
                <Friend 
                friend={el} 
                key={el.id}
                handleSelectState={handleSelectState}
                curSelect={curSelect}
                />
            )}
        </ul>
    );
}

function Friend({friend,handleSelectState,curSelect}) {
    const isSelected = curSelect === friend.id;
    return(
        <li className={isSelected ? "selected" : ""}>
            <img src={friend.image} alt={friend.name}/>
            <h3>{friend.name}</h3>
            {friend.balance < 0 && 
            <p className="red">
                You owe {friend.name} {Math.abs(friend.balance)} ￥
            </p>}

            {friend.balance === 0 && 
            <p>
                You and {friend.name} are even
            </p>
            }

            {friend.balance > 0 &&
            <p className="green">
                {friend.name} owes you {friend.balance} ￥
            </p>
            }
            
            <Button eventFunction={() => {handleSelectState(friend.id)}}>
                {isSelected ? "Close" : "Select"}
            </Button>
        </li>
    );
}

function FormAddFriend({handleAddFriend}) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("https://i.pravatar.cc/48");
    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !image) return;
        const friend = {name:name, image:image, id:Date.now(), balance:0}
        handleAddFriend(friend);
        setName("");
        setImage("https://i.pravatar.cc/48");
    }
    return(
        <form className="form-add-friend" onSubmit={handleSubmit}>
            <label>👫 Friend name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label>🌄 Image URL</label>
            <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <Button>Add</Button>
        </form>
    )
}

function FormSplitBill({friend,handleModifyFriend}) {
    const [bill, setBill] = useState("");
    const [yourExp, setYourExp] = useState("");
    const [otherExp, setOtherExp] = useState("");
    const [whoPay, setWhoPay] = useState("You");
    
    function onSubmit(e) {
        e.preventDefault();
        if (!bill || !yourExp || !otherExp) return;
        let numberYourExp = Number(yourExp);
        let numberOtherExp = Number(otherExp);
        if (Number(bill) !== numberYourExp + numberOtherExp) return;
        let newFriend = friend;
        if (whoPay === "You") 
            newFriend.balance += numberOtherExp;
        
        else 
            newFriend.balance -= numberYourExp;
        handleModifyFriend(newFriend);
        setBill("");
        setYourExp("");
        setOtherExp("");
        setWhoPay("You");
    }
    return (
        <form className="form-split-bill" onSubmit={onSubmit}>
            <h2>split a bill with {friend.name}</h2>
            <label>💰 Bill value</label>
            <input
                type="text"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
            />
            <label>🧍‍♀️ Your expense</label>
            <input 
                type="text"
                value={yourExp}
                onChange={(e) => setYourExp(e.target.value)}
            />
            <label>👫 {friend.name}'s expense</label>
            <input
                type="text"
                value={otherExp}
                onChange={(e) => setOtherExp(e.target.value)}
            />
            <label>🤑 Who is paying the bill</label>
            <select value={whoPay} onChange={(e) => setWhoPay(e.target.value)}>
                <option value="user">You</option>
                <option value="other">{friend.name}</option>
            </select>
            <Button>Split bill</Button>
        </form>
    )
}