# 📧 Automated Bulk Email Sender

A powerful and efficient **Bulk Email Sender** built with **Flask (Python)** and **React (Vite)**. Securely send personalized or bulk emails via Gmail SMTP with ease.

---

## 🌟 Features

- **🚀 Mass Mailing**: Send hundreds of emails in one go using Gmail's secure SMTP.
- **📝 Manual Entry**: Add multiple recipients manually with smart email validation.
- **📊 CSV Support**: Upload a `.csv` file with an `email` column for automated bulk mailing.
- **🎨 Modern UI**: Sleek, responsive interface with real-time status updates and loaders.
- **🔒 Secure**: Environment variable support for protecting your credentials.
- **⚡ Fast**: Built with Vite for a lightning-fast frontend experience.

---

## 🛠️ Tech Stack

### Backend
- ![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white) **Flask**: Lightweight web framework.
- ![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat&logo=pandas&logoColor=white) **Pandas**: For efficient CSV handling.
- ![SMTP](https://img.shields.io/badge/SMTP-Email-blue) **smtplib**: Core Python library for sending emails.
- ![Dotenv](https://img.shields.io/badge/Dotenv-yellow) **Python-Dotenv**: Manages sensitive environment variables.

### Frontend
- ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) **React**: For a dynamic user interface.
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) **Vite**: Modern frontend build tool.
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white) **Axios**: Promised-based HTTP client for the browser.

---

## 📂 Project Structure

```text
AutomatedMail/
├── app.py                # Flask main application
├── automate_email.py     # Email sending logic
├── .env                  # Environment secrets (DO NOT COMMIT)
├── test_emails.csv       # Sample CSV for testing
├── Automated-email/      # React Frontend (Vite)
│   ├── src/              # React components and logic
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite configuration
└── venv/                 # Python virtual environment
```

---

## 🚀 Installation & Setup

### 1. Clone the Project
```bash
git clone <your-repo-link>
cd AutomatedMail
```

### 2. Backend Setup
Create a virtual environment and install dependencies:
```bash
# Create venv
python -m venv venv

# Activate venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install requirements
pip install flask flask-cors pandas python-dotenv
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
EMAIL_ADDRESS="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
```
> [!IMPORTANT]
> Use a **Gmail App Password** instead of your regular password for better security. [Learn more here](https://support.google.com/accounts/answer/185833).

### 4. Frontend Setup
```bash
cd Automated-email
npm install
```

---

## 🖥️ Usage

### Running the App
1. **Start the Backend**:
   ```bash
   python app.py
   ```
   *Backend runs on `http://localhost:5000`*

2. **Start the Frontend**:
   ```bash
   cd Automated-email
   npm run dev
   ```
   *Frontend usually runs on `http://localhost:5173`*

### Steps to Send Bulk Emails:
1. Open the web interface.
2. Enter the **Subject** and **Message Body**.
3. Choose **Manual Entry** to type/paste emails OR **CSV Upload** to select your `.csv` file.
4. Click **Send Bulk Emails** and watch the magic happen! ✨

---

## 🤝 Contributing
Feel free to fork this project, open issues, or submit pull requests to improve it!

## 📜 License
This project is licensed under the MIT License.
# Automated-email
