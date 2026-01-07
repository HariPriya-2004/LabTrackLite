import "./App.css";

import React, { useState, useEffect } from "react";

function App() {
  const [assets, setAssets] = useState([]);
  const [assetName, setAssetName] = useState("");
  const [chatQuery, setChatQuery] = useState("");
  const [chatReply, setChatReply] = useState("");
  const [tickets, setTickets] = useState([]);
  const [ticketTitle, setTicketTitle] = useState("");


  // Fetch assets
 useEffect(() => {
  fetch("http://localhost:5128/assets")
    .then(res => res.json())
    .then(data => setAssets(data));

  fetch("http://localhost:5128/tickets")
    .then(res => res.json())
    .then(data => setTickets(data));
}, []);


  // Add asset
 const addAsset = () => {
  if (!assetName) return;

  const newAsset = {
    id: Date.now(),
    name: assetName,
    category: "General",
    qrCode: "QR001",
    status: "Active",
  };

  fetch("http://localhost:5128/assets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAsset),
  }).then(() => {
    setAssets([...assets, newAsset]);
    setAssetName("");
  });
};

  const addTicket = () => {
  if (!ticketTitle) return;

  const newTicket = {
    id: Date.now(),
    assetId: 1,
    title: ticketTitle,
    status: "Open",
  };

  fetch("http://localhost:5128/tickets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTicket),
  }).then(() => {
    setTickets([...tickets, newTicket]); // ✅ update UI
    setTicketTitle("");
  });
};



  // Chatbot
  const askChatbot = () => {
    fetch("http://localhost:5128/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: chatQuery }),
    })
      .then((res) => res.text())
      .then((data) => setChatReply(data));
  };

  return (
  <div className="container">

      <h2>LabTrack Lite</h2>

      <h3>Add Asset</h3>
      <input
        placeholder="Enter asset name"
        value={assetName}
        onChange={(e) => setAssetName(e.target.value)}
      />
      <button onClick={addAsset} style={{ marginLeft: "10px" }}>
        Add
      </button>

      <h3>Asset List</h3>

      <ul>
        {assets.map((a) => (
          <li key={a.id}>{a.name}</li>
        ))}
      </ul>
      <h3>Create Ticket</h3>
<input
  placeholder="Describe the issue"
  value={ticketTitle}
  onChange={(e) => setTicketTitle(e.target.value)}
/>
<button onClick={addTicket}>
  Create
</button>


<h3>Ticket List</h3>

<ul>
  {tickets.map(t => (
    <li key={t.id}>
      {t.title} - {t.status}
    </li>
  ))}
</ul>


      <h3>Chatbot</h3>
      <input
        placeholder="Ask about assets or tickets..."
        value={chatQuery}
        onChange={(e) => setChatQuery(e.target.value)}
      />
      <button onClick={askChatbot} style={{ marginLeft: "10px" }}>
        Ask
      </button>
      <p>{chatReply}</p>
    </div>
  );
}

export default App;
