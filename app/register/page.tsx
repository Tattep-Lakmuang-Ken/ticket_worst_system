"use client";

import React, { useState } from "react";

export default function RegisterPage() {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const clearForm = () => {
    setTeamName("");
    setMembers(["", "", "", "", ""]);
  };

  const handleCorrectSubmit = () => {
    if (!teamName || members.slice(0, 4).some((m) => !m)) {
      setError("Please fill in Team Name and first 4 team members.");
      return;
    }
    alert("ให้ตั๋วผมเถอะกราบละ 🎉");
  };

  const buttons = [];
  for (let i = 0; i < 20; i++) {
    const row = Math.floor(i / 5);
    const col = i % 5;
    const isCorrect = row === 1 && col === 0;

    const handleClick = () => {
      if (isCorrect) {
        handleCorrectSubmit();
      } else if (i % 2 === 0) {
        window.open("https://youtu.be/dQw4w9WgXcQ?si=nIRppWtLj1HxEOEv", "_blank");
      } else {
        clearForm();
      }
    };

    buttons.push(
      <button
        key={i}
        onClick={handleClick}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 relative"
      >
        Submit
        {isCorrect && (
          <span className="absolute -top-2 -right-2 text-xs"></span>
        )}
      </button>
    );
  }

  return (
      
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Team Registration</h1>

      <div className="mb-4 w-full max-w-md">
        <label className="block mb-2">Team Name *</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full p-2 rounded text-black bg-white"
        />
      </div>

      {members.map((member, index) => (
        <div key={index} className="mb-4 w-full max-w-md">
          <label className="block mb-2">
            Member {index + 1} {index < 4 ? "*" : "(Optional)"}
          </label>
          <input
            type="text"
            value={member}
            onChange={(e) => handleMemberChange(index, e.target.value)}
            className="w-full p-2 rounded text-black bg-white"
          />
        </div>
      ))}

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-5 gap-4 mt-6">
        {buttons}
      </div>
      <p className="absolute bottom-4 right-4 text-xs text-gray-400">
        Hint: R2C1
      </p>
    </div>
  );
}
