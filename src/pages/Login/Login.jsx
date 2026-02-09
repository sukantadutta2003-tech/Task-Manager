import { useEffect } from "react";
import "./login.css";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";


function Login() {
  useEffect(() => {
    const signInButton = document.getElementById("signIn");
    const signUpButton = document.getElementById("signUp");
    const container = document.getElementById("container");

    signUpButton.onclick = () => {
      container.classList.add("right-panel-active");
    };

    signInButton.onclick = () => {
      container.classList.remove("right-panel-active");
    };
  }, []);

  return (
    <div className="login-page">
      <div className="container" id="container">
        {/* SIGN UP */}
        <div className="form-container sign-up-container">
          <form>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social"><FaFacebookF /></a>
              <a href="#" className="social"><FaGoogle /></a>
              <a href="#" className="social"><FaLinkedinIn /></a>
            </div>
            <span>or use your email</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="button">Sign Up</button>
          </form>
        </div>

        {/* SIGN IN */}
        <div className="form-container sign-in-container">
          <form>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social"><FaFacebookF /></a>
              <a href="#" className="social"><FaGoogle /></a>
              <a href="#" className="social"><FaLinkedinIn /></a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button type="button">Sign In</button>
          </form>
        </div>

        {/* OVERLAY */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back</h1>
              <p>Already have an account? <br/>Login here</p>
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
