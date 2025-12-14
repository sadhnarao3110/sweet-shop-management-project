import { useState } from "react";
import axios from "axios";

function Login({ goToRegister }: { goToRegister: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      setMessage("Login successful 🎉");

      // IMPORTANT
      window.location.reload();
    } catch {
      setMessage("Invalid email or password ❌");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p className="message">{message}</p>

      <p className="link" onClick={goToRegister}>
        New user? Create account
      </p>
    </div>
  );
}

export default Login;
