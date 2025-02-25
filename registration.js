const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

// Toggle between sign-in and sign-up forms
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Login Logic
const email_input = document.querySelector(".input_email");
const password_input = document.querySelector(".input_password");
const loginBtn = document.querySelector(".login_btn");

loginBtn.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent page refresh

  let latestUserData = localStorage.getItem("sign_up_storedValue");
  let latestUser = latestUserData ? JSON.parse(latestUserData) : null;

  if (!email_input.value || !password_input.value) {
    alert("Please enter your email and password.");
    return;
  }

  if (
    latestUser &&
    email_input.value === latestUser.Newemail &&
    password_input.value === latestUser.Newpassword
  ) {
    alert(`Successfully logged in as ${email_input.value}`);
    localStorage.setItem("usersignedup", "true");

    // Redirect to index.html after successful login
    setTimeout(() => {
      window.location.href = "../userdetails/user.html";
    }, 500);
  } else {
    alert("Incorrect email or password. Please try again.");
  }
});

// Sign-Up Logic
const signup_username = document.querySelector(".signup_username");
const signup_email = document.querySelector(".signup_email");
const signup_password = document.querySelector(".signup_password");
const signup_repassword = document.querySelector(".signup_repassword");
const signup_btn = document.querySelector(".signup_btn");
let signup_otp = document.querySelector(".signup_otp");



// Email validation regex
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

signup_btn.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent page refresh

  if (
    !signup_username.value ||
    !signup_email.value ||
    !signup_password.value ||
    !signup_repassword.value
  ) {
    alert("Please fill in all fields.");
    return;
  }

  // Check if email format is valid
  if (!emailPattern.test(signup_email.value)) {
    alert("Invalid email format. Please enter a valid email address.");
    return;
  }

  if (signup_password.value.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  if (signup_password.value !== signup_repassword.value) {
    alert("Passwords do not match.");
    return;
  }



  let userData = {
    Newusername: signup_username.value,
    Newemail: signup_email.value,
    Newpassword: signup_password.value,
  };

  localStorage.setItem("sign_up_storedValue", JSON.stringify(userData));

  alert("Account created successfully! Please log in.");

  container.classList.remove("sign-up-mode");

  // Clear sign-up inputs
  signup_username.value = "";
  signup_email.value = "";
  signup_password.value = "";
  signup_repassword.value = "";
});


signup_email.addEventListener("input", () => {
  if (!emailPattern.test(signup_email.value)) {
    signup_email.style.border = "2px solid red";
    signup_email.style.borderRadius = "30px"; // Add border-radius
  } else {
    signup_email.style.border = "2px solid green";
    signup_email.style.borderRadius = "30px"; // Add border-radius
  }
});
