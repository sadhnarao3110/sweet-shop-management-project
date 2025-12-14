import { useState } from "react";
import axios from "axios";

function Register({ goToLogin }: { goToLogin: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        name,
        email,
        password
      });

      setMessage("Account created successfully 🎉");
      setTimeout(() => {
        goToLogin();
      }, 1500);
    } catch (err: any) {
      setMessage("Registration failed ❌");
    }
  };

  return (
    <div className="card">
      <h2>Create Account</h2>

      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <button onClick={handleRegister}>Register</button>

      <p className="message">{message}</p>

      <p className="link" onClick={goToLogin}>
        Already have an account? Login
      </p>
    </div>
  );
}

export default Register;
