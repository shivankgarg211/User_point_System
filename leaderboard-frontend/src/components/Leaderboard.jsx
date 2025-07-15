import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leaderboard");
      setUsers(res.data);
    } catch (err) {
      console.error("Error loading leaderboard", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(interval);
  }, []);

  const getRankColor = (rank) => {
    if (rank === 1) return "bg-yellow-400";
    if (rank === 2) return "bg-gray-300";
    if (rank === 3) return "bg-amber-700 text-white";
    return "bg-white";
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-3xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">🏆 Leaderboard</h2>

      {/* Top 3 Users - Podium Style */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {users.slice(0, 3).map((user, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-4 rounded-xl shadow-md ${getRankColor(user.rank)} w-28`}
          >
            <div className="text-lg font-bold">#{user.rank}</div>
            <div className="text-md">{user.name}</div>
            <div className="text-sm text-gray-600">{user.totalPoints} pts</div>
          </div>
        ))}
      </div>

      {/* Other Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2 px-2">Rank</th>
              <th className="py-2 px-2">Name</th>
              <th className="py-2 px-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {users.slice(3).map((user) => (
              <tr key={user._id} className="border-b hover:bg-yellow-50">
                <td className="py-2 px-2">#{user.rank}</td>
                <td className="py-2 px-2">{user.name}</td>
                <td className="py-2 px-2">{user.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
