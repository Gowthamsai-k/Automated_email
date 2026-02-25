from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from automate_email import send_email 
import pandas as pd

import json

app = Flask(__name__)
CORS(app)

@app.route("/send", methods=['POST'])
def sending():
    try:
        message = request.form.get("message")
        subject = request.form.get("subject", "Automated Email")
        mode = request.form.get("mode")

        if not message:
            return jsonify({"status": "error", "message": "Message is required"}), 400

        if mode == "manual":
            emails_raw = request.form.get("emails")
            if not emails_raw:
                return jsonify({"status": "error", "message": "Emails are required for manual mode"}), 400
            emails = json.loads(emails_raw)
        else:
            if 'file' not in request.files:
                return jsonify({"status": "error", "message": "File is required for CSV mode"}), 400
            file = request.files["file"]
            try:
                df = pd.read_csv(file)
                if 'email' not in df.columns:
                    return jsonify({"status": "error", "message": "CSV must contain an 'email' column"}), 400
                emails = df["email"].dropna().tolist()
            except Exception as e:
                return jsonify({"status": "error", "message": f"Error parsing CSV: {str(e)}"}), 400

        if not emails:
            return jsonify({"status": "error", "message": "No valid emails found"}), 400

        success = send_email(emails=emails, subject=subject, body=message)
        
        if success:
            return jsonify({"status": "success", "message": f"Successfully sent to {len(emails)} recipients"}), 200
        else:
            return jsonify({"status": "error", "message": "Failed to send emails. Check server logs."}), 500

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)