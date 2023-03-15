# Home LLC Project Readme


This Project has all the specifications as per required by the assignment details:
1. Web Page with login input fiels `Email` and `Password`

1. New user can sign up by entering `Email`, `Password`, `First Name` and `Last Name`. 

1. Details are matched with the database and is only redirected to the HomePage when successfully logged in. 

1. After the details are matched successfully with the database a **JWT token** is created for login authentication system by the express server. which is then stored in the localStorage for further usage.

1. The JWT token is then used to authenticate the user for every request made to the server. In my case it was used for fetching user's first and last name from the database on the **HOMEPAGE**

1. The **HOMEPAGE** has a **LOGOUT** button which clears the localStorage and redirects the user to the login page.

1. I have made both the horizontal and vertically functionality of navigation bars. You can toggle bw them by the **TOGGLE** button on the mid right corner.

1. You will need to do `npm install` in both the client and server folders to install all the dependencies.

1. Then you will have to start both client and server by running `npm start` in both the folders terminal directory.



Here are some of the screenshots of the project:

# HomePage
<a href="https://ibb.co/PwMJYgz"><img src="https://i.ibb.co/SRcHxB7/Homepage-hor.png" alt="Homepage-hor" border="0"></a>



# Login Page
<a href="https://ibb.co/yp2jvPs"><img src="https://i.ibb.co/r39r80y/login.png" alt="login" border="0"></a><br />


# Register Page
<a href="https://ibb.co/HxBgr7T"><img src="https://i.ibb.co/GtnPV7Q/register.png" alt="register" border="0"></a>

# HomePage Vertical navigation
<a href="https://ibb.co/HzyfPzj"><img src="https://i.ibb.co/YkSFdkx/homepage-ver.png" alt="homepage-ver" border="0"></a>

