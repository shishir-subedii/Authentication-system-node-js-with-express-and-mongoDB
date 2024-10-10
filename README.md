API Endpoints Documentation
Overview

This documentation provides an overview of the authentication API endpoints, including their methods, request bodies, and response formats.
Base URL
http://<your-domain-or-ip>:<port>/api/auth

Endpoints:

1. User Signup

Endpoint: POST /signup
Description: Registers a new user.

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

Endpoint: POST /change-password
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




Others:
paste this code before app.listen (optional)
// Function to delete expired unverified users
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

