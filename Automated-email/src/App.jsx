import { useState } from "react";
import axios from "axios";
import "./App.css";

function EmailSender() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("manual");
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const addEmail = (e) => {
    if (e) e.preventDefault();
    if (!emailInput) return;

    // Parse multiple emails using common separators: comma, semicolon, space, or newline
    const newEmails = emailInput
      .split(/[\s,;\n]+/)
      .map(email => email.trim())
      .filter(email => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

    const uniqueNewEmails = newEmails.filter(email => !emails.includes(email));

    if (uniqueNewEmails.length > 0) {
      setEmails([...emails, ...uniqueNewEmails]);
      setEmailInput("");
      setStatus({ type: "success", message: `Added ${uniqueNewEmails.length} recipient(s)` });
      setTimeout(() => setStatus({ type: "", message: "" }), 3000);
    } else if (newEmails.length === 0) {
      setStatus({ type: "error", message: "No valid emails found in input" });
    }
  };

  const removeEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".csv")) {
      setFile(selectedFile);
      setStatus({ type: "", message: "" });
    } else {
      setStatus({ type: "error", message: "Please upload a valid .csv file" });
    }
  };

  const handleSubmit = async () => {
    if (!message) {
      setStatus({ type: "error", message: "Message content required" });
      return;
    }
    if (mode === "manual" && emails.length === 0) {
      setStatus({ type: "error", message: "Recipient list is empty" });
      return;
    }
    if (mode === "csv" && !file) {
      setStatus({ type: "error", message: "CSV file required" });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    const formData = new FormData();
    formData.append("subject", subject || "Automated Email");
    formData.append("message", message);
    formData.append("mode", mode);

    if (mode === "manual") {
      formData.append("emails", JSON.stringify(emails));
    } else {
      formData.append("file", file);
    }

    try {
      const response = await axios.post("http://localhost:5000/send", formData);
      setStatus({ type: "success", message: response.data.message });
      if (mode === "manual") setEmails([]);
      setSubject("");
      setMessage("");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Communication failure. Is the backend live?";
      setStatus({ type: "error", message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Bulk Email Sender</h2>

      <div className="form-group">
        <label>Subject</label>
        <input
          type="text"
          placeholder="Enter email subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Message</label>
        <textarea
          placeholder="Write your email content here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="mode-selector">
        <button
          className={`mode-btn ${mode === "manual" ? "active" : ""}`}
          onClick={() => setMode("manual")}
        >
          Manual Entry
        </button>
        <button
          className={`mode-btn ${mode === "csv" ? "active" : ""}`}
          onClick={() => setMode("csv")}
        >
          CSV Upload
        </button>
      </div>

      {mode === "manual" ? (
        <div className="form-group">
          <label>Recipients</label>
          <form className="email-input-wrapper" onSubmit={addEmail}>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="recipient@example.com"
            />
            <button type="button" className="add-btn" onClick={addEmail}>
              Add
            </button>
          </form>

          <div className="email-list">
            {emails.map((email, index) => (
              <span key={index} className="email-chip">
                {email}
                <span className="remove-chip" onClick={() => removeEmail(email)}>
                  &times;
                </span>
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="form-group">
          <label>CSV File</label>
          <div className="file-upload" onClick={() => document.getElementById("csv-input").click()}>
            <p>{file ? `Selected: ${file.name}` : "Click to upload CSV (must have 'email' column)"}</p>
            <input
              id="csv-input"
              type="file"
              accept=".csv"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}

      {status.message && (
        <div className={`status-msg ${status.type}`}>
          {status.message}
        </div>
      )}

      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading && <span className="loader"></span>}
        {loading ? "Sending..." : "Send Bulk Emails"}
      </button>
    </div>
  );
}

export default EmailSender;