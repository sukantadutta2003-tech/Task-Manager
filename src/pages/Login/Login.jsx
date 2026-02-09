import { useEffect } from "react";
import "./login.css";

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
              <a href="#" className="social"><i className="fa-brands fa-facebook"></i></a>
              <a href="#" className="social"><i className="fa-brands fa-google-plus"></i></a>
              <a href="#" className="social"><i className="fa-brands fa-linkedin"></i></a>
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
              <a href="#" className="social"><i className="fa-brands fa-facebook"></i></a>
              <a href="#" className="social"><i className="fa-brands fa-google-plus"></i></a>
              <a href="#" className="social"><i className="fa-brands fa-linkedin"></i></a>
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
              <p>To keep connected please login</p>
              <button className="ghost" id="signIn">Sign In</button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your details and start journey</p>
              <button className="ghost" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
