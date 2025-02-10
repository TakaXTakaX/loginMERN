// app.js (Frontend)

const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    console.log("Login successful:", data);

    // navigate to the dashboard.html
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Error during login:", error);
  }
};

// you forgot to call the register here, basically the same as the one above that you did
const register = async (username, email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    console.log("Registration successful:", data);
    // use this so it is more abvious
    alert(data.message);
  } catch (error) {
    console.error("Error during registration:", error);
    alert(error.message);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // we need the loginform to load first and make sure that we can actually reference it
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      login(email, password); // Call the login function
    });
  }

  // Dont do this. you need to check with DOMContentLoaded first

  // document.getElementById("loginForm").addEventListener("submit", (event) => {
  //   event.preventDefault(); // Prevent the default form submission behavior
  //   const email = document.getElementById("email").value;
  //   const password = document.getElementById("password").value;
  //   login(email, password); // Call the login function
  // });

  // you were missing the call for register func
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      register(username, email, password); // Call the register function
    });
  }
});
