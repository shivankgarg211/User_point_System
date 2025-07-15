import React, { useEffect, useState } from "react";
import axios from "axios";

// const API = "http://localhost:5000/api/users"; // Update with deployed URL if needed

const UserSelector = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("");
  const [newUserName, setNewUserName] = useState("");

  // Get all users from backend
  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getAllUsers");
      setUsers(res.data);
      if (res.data.length > 0 && !selected) {
        setSelected(res.data[0]._id);
      }
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  // Add new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUserName) return;

    try {
      await axios.post("http://localhost:5000/addUser", { name: newUserName });
      setNewUserName("");
      getAllUsers(); // refresh list
    } catch (err) {
      console.error("Error adding user", err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2">🎯 Select User</h2>
      
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      >
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <form onSubmit={handleAddUser} className="flex gap-2">
        <input
          type="text"
          placeholder="Add new user"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="flex-1 p-2 border rounded-md"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-white px-4 py-2 rounded-md"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default UserSelector;
