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
  } catch (error) {
    console.error("Error during login:", error);
  }
}; 

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();  // Prevent the default form submission behavior
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);  // Call the login function
});

