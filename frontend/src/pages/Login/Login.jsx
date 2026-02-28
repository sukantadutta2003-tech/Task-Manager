import { useEffect, useState } from "react";
import "./login.css";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const signInButton = document.getElementById("signIn");
    const signUpButton = document.getElementById("signUp");
    const container = document.getElementById("container");

    signUpButton.onclick = () => container.classList.add("right-panel-active");
    signInButton.onclick = () => container.classList.remove("right-panel-active");
  }, []);

  // ================= LOGIN =================
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // SAVE JWT
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);

      alert("Login successful!");

      // redirect to main page later
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // ================= REGISTER =================
  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      if (!res.ok) {
        const text = await res.text();
        alert(text);
        return;
      }

      alert("Account created! Please login.");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="login-page">
      <div className="container" id="container">
        {/* SIGN UP */}
        <div className="form-container sign-up-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social"><FaFacebookF /></a>
              <a href="#" className="social"><FaGoogle /></a>
              <a href="#" className="social"><FaLinkedinIn /></a>
            </div>
            <span>or use your email</span>

            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email id"
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            />

            <button type="button" onClick={handleSignup}>Sign Up</button>
          </form>
        </div>

        {/* SIGN IN */}
        <div className="form-container sign-in-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social"><FaFacebookF /></a>
              <a href="#" className="social"><FaGoogle /></a>
              <a href="#" className="social"><FaLinkedinIn /></a>
            </div>
            <span>or use your account</span>

            <input
              type="email"
              placeholder="Email id"
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />

            <a href="#">Forgot your password?</a>
            <button type="button" onClick={handleLogin}>Sign In</button>
          </form>
        </div>

        {/* OVERLAY */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back</h1>
              <p>Already have an account? <br />Login here</p>
              <button className="ghost" id="signIn">Sign In</button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>Don't have an account?</h1>
              <p>Register here to get started</p>
              <button className="ghost" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;