API Endpoints Documentation
Overview

This documentation provides an overview of the authentication API endpoints, including their methods, request bodies, and response formats.
Base URL
http://yourdomain.com/api/auth -->enter your domain and port instead of yourdomain.com

Endpoints:

1. User Signup

Endpoint: POST /signup
Description: Registers a new user. You will get an OTP in your email and need to verify it under 10 minutes

Request Body:
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
}

Responses:

    201 Created: User created successfully.

        {
        "success": true,
        "message": "User created successfully! Please verify OTP."
        }
    
    400 Bad Request: Missing fields or email already exists.

        {
            "success": false,
            "message": "Name, email, and password are required."
        }
    
    500 Internal Server Error: Server error.

        {
            "success": false,
            "message": "Internal server error."
        }


2. Verify OTP

Endpoint: POST /verify-otp
Description: Verifies the OTP sent to the user's email during signup.

Request Body:
{
    "email": "john@example.com",
    "otp": "123456"
}

Responses:

    200 OK: Email verified successfully.

        {
            "success": true,
            "message": "Email verified successfully"
        }
    
    404 Not Found: User not found or OTP expired.

        {
            "success": false,
            "message": "User not found or OTP expired"
        }

    400 Bad Request: Invalid OTP.

        {
            "success": false,
            "message": "Invalid OTP"
        }
    
    500 Internal Server Error: Server error.

        {
            "success": false,
            "message": "Server error"
        }


3. User Login

Endpoint: POST /login
Description: Authenticates the user and generates a JWT token.

Request Body:

{
    "email": "john@example.com",
    "password": "securepassword123"
}

Responses:

    200 OK: Authentication successful, JWT token returned.

        {
            "success": true,
            "message": "your-jwt-token"
        }

    401 Unauthorized: Invalid credentials or email not verified.

        {
            "success": false,
            "message": "Invalid credentials or email not verified."
        }

    500 Internal Server Error: Server error.

        {
            "success": false,
            "message": "Server error"
        }


4. Forgot Password

Endpoint: POST /forgot-password
Description: Initiates the password reset process by sending an OTP to the user's email.

Request Body:

    {
        "email": "john@example.com"
    }

Responses:

    200 OK: OTP sent for password reset.

        {
            "success": true,
            "message": "OTP sent for password reset"
        }

    404 Not Found: User not found.

        {
            "success": false,
            "message": "User not found"
        }

    500 Internal Server Error: Server error.

        {
            "success": false,
            "message": "Server error"
        }


5. Reset Password

Endpoint: POST /reset-password
Description: Resets the user's password using the OTP.

Request Body:

    {
        "email": "john@example.com",
        "newPassword": "newsecurepassword123",
        "otp": "123456"
    }

Responses:

    200 OK: Password reset successfully.

        {
            "success": true,
            "message": "Password reset successfully"
        }

    404 Not Found: User not found.

        {
            "success": false,
            "message": "User not found"
        }

    400 Bad Request: Invalid or expired OTP.

        {
            "success": false,
            "message": "Invalid or expired OTP. Try again!"
        }

    500 Internal Server Error: Server error.

        {
            "success": false,
            "message": "Server error"
        }
    

6. Change Password

Endpoint: PUT /change-password
Description: Allows users to change their password by verifying their current password.

Request Body:

{
    "currentPassword": "oldpassword123",
    "newPassword": "newpassword123"
}

Responses:

    200 OK: Password changed successfully.

        {
            "success": true,
            "message": "Password changed successfully"
        }

    404 Not Found: User not found.

        {
            "success": false,
            "message": "User not found"
        }

    401 Unauthorized: Current password is incorrect.

        {
            "success": false,
            "message": "Current password is incorrect"
        }

    500 Internal Server Error: Server error.

        {
            "success": false,
            "message": "Server error"
        }

Notes:
    All responses follow a consistent format, returning a success flag and a message.
    Error messages are generic to avoid exposing sensitive information.




FOR DEV PURPOSES:

Your .env file should have:

MONGODB_URI=XXX (Your connection url of mongoDB database)
JWT_SECRET=XXX (Your secret: eg: *123456789@mySecret*)

EMAIL_USER=XXX (Your email address) --> Assuming you are using your gmail account This email address is used to send email to the user. Better not to give your personal email

EMAIL_PASS=XXX (Your app password of the email)  --> Not your email account password.


To run this code in your local computer:
- Install nodeJS.
- Install mongoBD compass or use mongoDB atlas.
- Get your mongoDB connection string.
- open the code in VS code or any other code editor.
- Create a .env file and fill your data.
- Open terminal and type "npm install" . And also install nodemon and morgan if possible
- type "npm run dev" or "npm start" in your terminal.
- Your project runs now. Open postman or anything to test the api endpoint.


Others:
paste this code before app.listen (optional)

// Function to delete expired unverified users
const User = require('./models/User');
const deleteExpiredUsers = async () => {
    const now = Date.now();
    try {
        // Find users who are unverified and whose OTP expiration has passed
        const result = await User.deleteMany({
            otpExpiration: { $lt: now }, // OTP expiration time is less than current time
            isVerified: false,
        });

        console.log(`users checked at ${new Date()}`);
    } catch (err) {
        console.error('Error deleting expired unverified users:', err);
    }
};

// Set interval to run every 10 minutes (600000 ms)
setInterval(deleteExpiredUsers, 600000);

