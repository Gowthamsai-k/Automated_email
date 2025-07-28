# 📧 Automated Email Sender using Flask & Yagmail (OAuth2)

This is a simple Flask-based application that renders an HTML form to collect user details (name, email, mobile number), and sends a personalized email using **Gmail OAuth2** authentication via **Yagmail**.

---

## 🚀 Features

- 🔒 Secure Gmail sending using OAuth2 (no need for app passwords!)
- 🌐 Clean HTML form to collect user input
- 📩 Sends a styled confirmation email to the recipient
- 🧪 Simple and minimal to integrate into other projects

---

## 📦 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/Automated_email.git
cd Automated_email
Step 2: Install Python Dependencies
bash
Copy
Edit
pip install -r req.txt
🔑 Step 3: Set Up Gmail OAuth2 with Yagmail
1. Get Google Client ID & Secret
Visit: Google Cloud Console

Create/select a project

Navigate to: APIs & Services → Credentials

Click "Create Credentials" → "OAuth client ID"

Choose "Desktop App"

Download the client_secret_XXXX.json file

Save it as ~/.yagmail (or the default used in your code)

2. Authenticate with Gmail
Run this once to authenticate and store credentials securely:

bash
Copy
Edit
python app.py
A browser window will open. Log into your Gmail account and allow access.

🧪 Step 4: Run the App
Once authenticated, you can launch the Flask server:

bash
Copy
Edit
flask run
Or if you’re using a custom filename:

bash
Copy
Edit
python app.py
Then go to http://127.0.0.1:5000 in your browser.

📝 Usage
Fill out the form: Name, Email, Mobile Number (all required)

Submit the form

An HTML email will be sent to the provided address!

📂 Project Structure

Automated_email/
│
├── app.py               # Flask server and email logic
├── templates/
│   └── form.html        # HTML form template
├── static/              # Optional: styles, images
├── req.txt              # Required Python packages
└── README.md            # You're here!
📧 Example Email Output
The email includes:

A warm welcome message

KL University hackathon announcement

Stylish HTML format

✅ Requirements
Python 3.7+

Gmail account with OAuth enabled

Internet connection (for browser-based OAuth prompt)

🙋‍♂️ Author
Gowtham K – [KL University]
Drop me a mail: gowthamsai0519@gmail.com

🛡️ License
MIT License – free to use and modify!

yaml
Copy
Edit
