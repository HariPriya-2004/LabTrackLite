import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [role, setRole] = useState("Viewer");
  const [assets, setAssets] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [assetName, setAssetName] = useState("");
  const [ticketTitle, setTicketTitle] = useState("");
  const [chatQuery, setChatQuery] = useState("");
  const [chatReply, setChatReply] = useState("");

  // Fetch data
  useEffect(() => {
    fetch("http://localhost:5128/assets")
      .then(res => res.json())
      .then(data => setAssets(data));

    fetch("http://localhost:5128/tickets")
      .then(res => res.json())
      .then(data => setTickets(data));
  }, []);

  // Add Asset (Admin)
  const addAsset = () => {
    if (!assetName) return;

    const newAsset = {
      id: Date.now(),
      name: assetName,
      category: "General",
      qrCode: "QR001",
      status: "Active"
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

  // Add Ticket (Technician)
  const addTicket = () => {
    if (!ticketTitle) return;

    const newTicket = {
      id: Date.now(),
      assetId: 1,
      title: ticketTitle,
      status: "Open"
    };

    fetch("http://localhost:5128/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTicket),
    }).then(() => {
      setTickets([...tickets, newTicket]);
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
      .then(res => res.text())
      .then(data => setChatReply(data));
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>LabTrack Lite</h1>
        <p className="subtitle">Simple Lab Management System</p>
      </header>

      <main className="main-content">
        {/* Top Bar - Role Selection */}
        <div className="top-bar">
          <div className="role-section">
            <div className="section-label">
              <span className="label-icon">👤</span>
              Current Role:
            </div>
            <div className="role-display">
              <div className="role-tag">{role}</div>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="role-select"
              >
                <option>Admin</option>
                <option>Technician</option>
                <option>Viewer</option>
              </select>
            </div>
            <div className="role-help">
              {role === "Admin" && "Can add assets and manage everything"}
              {role === "Technician" && "Can create tickets and view assets"}
              {role === "Viewer" && "Can only view assets and tickets"}
            </div>
          </div>
        </div>

        {/* Main Sections in Columns */}
        <div className="sections-container">
          {/* Left Column - Assets */}
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-icon">📦</span>
                Assets
                <span className="item-count">({assets.length})</span>
              </h2>
            </div>

            {/* Admin: Add Asset Form */}
            {role === "Admin" && (
              <div className="action-box admin-action">
                <h3 className="action-title">Add New Asset</h3>
                <div className="input-row">
                  <input
                    type="text"
                    placeholder="Type asset name here..."
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                    className="text-input"
                  />
                  <button 
                    onClick={addAsset}
                    className="action-button add-button"
                    disabled={!assetName}
                  >
                    + Add
                  </button>
                </div>
              </div>
            )}

            {/* Assets List */}
            <div className="list-box">
              <h3 className="list-title">Asset List</h3>
              {assets.length === 0 ? (
                <div className="empty-message">
                  <div className="empty-icon">📦</div>
                  <p>No assets yet. Add some assets to get started.</p>
                </div>
              ) : (
                <div className="items-list">
                  {assets.map(asset => (
                    <div key={asset.id} className="list-item">
                      <div className="item-main">
                        <div className="item-name">{asset.name}</div>
                        <div className="item-details">
                          <span className="detail">Category: {asset.category}</span>
                          <span className="detail">QR: {asset.qrCode}</span>
                        </div>
                      </div>
                      <div className="item-status">
                        <span className={`status ${asset.status.toLowerCase()}`}>
                          {asset.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Middle Column - Tickets */}
          <div className="section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-icon">🎫</span>
                Tickets
                <span className="item-count">({tickets.length})</span>
              </h2>
            </div>

            {/* Technician: Create Ticket Form */}
            {role === "Technician" && (
              <div className="action-box tech-action">
                <h3 className="action-title">Create New Ticket</h3>
                <div className="input-row">
                  <input
                    type="text"
                    placeholder="Describe the issue..."
                    value={ticketTitle}
                    onChange={(e) => setTicketTitle(e.target.value)}
                    className="text-input"
                  />
                  <button 
                    onClick={addTicket}
                    className="action-button create-button"
                    disabled={!ticketTitle}
                  >
                    + Create
                  </button>
                </div>
              </div>
            )}

            {/* Tickets List */}
            <div className="list-box">
              <h3 className="list-title">Ticket List</h3>
              {tickets.length === 0 ? (
                <div className="empty-message">
                  <div className="empty-icon">🎫</div>
                  <p>No tickets yet. Create a ticket to report issues.</p>
                </div>
              ) : (
                <div className="items-list">
                  {tickets.map(ticket => (
                    <div key={ticket.id} className="list-item">
                      <div className="item-main">
                        <div className="item-name">{ticket.title}</div>
                        <div className="item-details">
                          <span className="detail">Asset ID: {ticket.assetId}</span>
                          <span className="detail">ID: #{ticket.id}</span>
                        </div>
                      </div>
                      <div className="item-status">
                        <span className={`status ${ticket.status.toLowerCase()}`}>
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Chatbot */}
          <div className="section chatbot-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-icon">🤖</span>
                Help Assistant
              </h2>
            </div>

            <div className="chatbot-box">
              {/* Chatbot Introduction */}
              <div className="chatbot-intro">
                <div className="chatbot-avatar">AI</div>
                <div className="chatbot-info">
                  <h3>Lab Assistant</h3>
                  <p>Ask me about assets, tickets, or help</p>
                </div>
              </div>

              {/* Chat History */}
              {chatReply && (
                <div className="chat-history">
                  <div className="chat-message user-message">
                    <div className="message-sender">You:</div>
                    <div className="message-text">{chatQuery}</div>
                  </div>
                  <div className="chat-message bot-message">
                    <div className="message-sender">Assistant:</div>
                    <div className="message-text">{chatReply}</div>
                  </div>
                </div>
              )}

              {/* Chat Input */}
              <div className="chat-input-area">
                <input
                  type="text"
                  placeholder="Type your question here..."
                  value={chatQuery}
                  onChange={(e) => setChatQuery(e.target.value)}
                  className="chat-input"
                  onKeyPress={(e) => e.key === 'Enter' && askChatbot()}
                />
                <button 
                  onClick={askChatbot}
                  className="chat-button"
                  disabled={!chatQuery}
                >
                  Ask
                </button>
              </div>

              {/* Quick Questions */}
              <div className="quick-questions">
                <p className="quick-title">Try asking:</p>
                <div className="question-buttons">
                  <button 
                    className="question-button"
                    onClick={() => {
                      setChatQuery("How many assets are there?");
                      setTimeout(askChatbot, 100);
                    }}
                  >
                    How many assets?
                  </button>
                  <button 
                    className="question-button"
                    onClick={() => {
                      setChatQuery("What tickets are open?");
                      setTimeout(askChatbot, 100);
                    }}
                  >
                    Open tickets?
                  </button>
                  <button 
                    className="question-button"
                    onClick={() => {
                      setChatQuery("Help with adding asset");
                      setTimeout(askChatbot, 100);
                    }}
                  >
                    How to add asset?
                  </button>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="summary-box">
                <h3 className="summary-title">Quick Summary</h3>
                <div className="summary-grid">
                  <div className="summary-item">
                    <div className="summary-number">{assets.length}</div>
                    <div className="summary-label">Total Assets</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-number">{tickets.length}</div>
                    <div className="summary-label">Total Tickets</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-number">
                      {tickets.filter(t => t.status === 'Open').length}
                    </div>
                    <div className="summary-label">Open Tickets</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Info */}
        <div className="connection-info">
          <div className="connection-status">
            <span className="status-dot connected"></span>
            Connected to: localhost:5128
          </div>
          <div className="system-info">
            System Ready • Role: <strong>{role}</strong>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>LabTrack Lite • Simple Lab Management • Version 1.0</p>
        <p className="footer-note">
          {role === "Admin" && "Administrator Mode - Full Access"}
          {role === "Technician" && "Technician Mode - Ticket Management"}
          {role === "Viewer" && "Viewer Mode - Read Only"}
        </p>
      </footer>
    </div>
  );
}

export default App;