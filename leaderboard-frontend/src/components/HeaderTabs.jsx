import React, { useState, useEffect } from "react";
import {
  FaGift,
  FaQuestionCircle,
  FaArrowLeft,
  FaUserPlus,
  FaCoins,
} from "react-icons/fa";
import axios from "axios";

const HeaderTabs = ({ activeTab, setActiveTab }) => {
  const mainTabs = [
    "e Ranking",
    "Hourly Ranking",
    "Family Ranking",
    "Wealth Ranking",
  ];
  const subTabs = ["Daily", "Monthly"];
  const [activeSub, setActiveSub] = useState("Monthly");

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [addSuccess, setAddSuccess] = useState(false);

  const [showClaimModal, setShowClaimModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [claimResult, setClaimResult] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/getAllUsers").then((res) => {
      setUsers(res.data);
      if (res.data.length > 0) setSelectedUserId(res.data[0]._id);
    });
  }, [showClaimModal]);

  // Add new user

  const handleAddUser = async () => {
    if (!newUserName.trim()) return;
    try {
      await axios.post("http://localhost:5000/addUser", { name: newUserName });
      setNewUserName("");
      setAddSuccess(true);
      setTimeout(() => {
        setShowAddModal(false);
        setAddSuccess(false);
      }, 1200);
    } catch (err) {
      console.error("Add user failed", err);
    }
  };
  // Handle claim points
  const handleClaimPoints = async () => {
    if (!selectedUserId) return;
    try {
      const res = await axios.post("http://localhost:5000/api/claim", {
        userId: selectedUserId,
      });
      setClaimResult(res.data);
      setTimeout(() => {
        setShowClaimModal(false);
        setClaimResult(null);
      }, 2000);
    } catch (err) {
      console.error("Claim failed", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-4 w-full max-w-3xl mx-auto mt-6">
      {/* Back + Top Icons */}
      <div className="flex justify-between items-center">
        <button className="text-xl text-gray-600">
          <FaArrowLeft />
        </button>
        <div className="flex gap-4 text-xl text-gray-600">
          <FaGift className="text-yellow-500" />
          <FaQuestionCircle />
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex flex-wrap justify-center gap-2 text-sm font-semibold text-gray-700">
        {mainTabs.map((tab) => (
          <div
            key={tab}
            className={`px-3 py-1 rounded-full cursor-pointer transition duration-200
              ${
                activeTab === tab
                  ? "bg-yellow-400 text-white"
                  : "hover:bg-yellow-200"
              }
            `}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Sub Tabs + Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* Sub Tabs */}
        <div className="flex justify-center sm:justify-start gap-3">
          {subTabs.map((tab) => (
            <div
              key={tab}
              className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer transition
                ${
                  activeSub === tab
                    ? "bg-yellow-600 text-white"
                    : "bg-yellow-100"
                }
              `}
              onClick={() => setActiveSub(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center sm:justify-end gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-yellow-400 text-white text-sm px-3 py-1 rounded flex items-center gap-1"
          >
            <FaUserPlus /> Add User
          </button>
          <button
            onClick={() => setShowClaimModal(true)}
            className="bg-yellow-500 text-white text-sm px-3 py-1 rounded flex items-center gap-1"
          >
            <FaCoins /> Claim
          </button>
        </div>
      </div>

      {/* ADD USER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-center">Add New User</h3>
            <input
              type="text"
              placeholder="Enter user name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            {addSuccess && (
              <p className="text-green-600 text-sm mb-2 text-center">
                ✅ User added!
              </p>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CLAIM POINTS MODAL */}
      {showClaimModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-center">Claim Points</h3>

            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>

            {claimResult && (
              <div className="text-green-600 text-sm mb-3 text-center">
                ✅ {claimResult.user.name} got {claimResult.pointsClaimed}{" "}
                points!
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowClaimModal(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleClaimPoints}
                className="bg-yellow-600 text-white px-4 py-1 rounded"
              >
                Claim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderTabs;
