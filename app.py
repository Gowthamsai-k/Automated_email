from flask import Flask, render_template, request
import yagmail
import os

app = Flask(__name__)


yag = yagmail.SMTP('youremail@gmail.com', oauth2_file=os.path.expanduser('creds'))

@app.route('/', methods=['GET', 'POST'])
def index():
    message = None  

    if request.method == 'POST':
        name = request.form.get('name')
        mobile = request.form.get('mobile')
        email = request.form.get('email')


        if not name or not mobile or not email:
            message = " All fields are required."
        else:
            subject = "New Registration for Automated Mail"
            contents = f"""
            <h2>New Registration</h2>
            <p><b>Name:</b> {name}</p>
            <p>Mobile:</b> {mobile}</p>
            <p>Email:</b> {email}</p>
            """
            try:
                yag.send(to=email, subject=subject, contents=contents)
                message = " Form submitted and email sent successfully!"
            except Exception as e:
                message = f"Failed to send email: {str(e)}"

    return render_template('index.html', message=message)

if __name__ == '__main__':
    app.run(debug=True)
