"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import users from "../../data/users.json";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const user = users.find((user) => user.username === username);
    if (user && password === user.password) {
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("password", password);
      router.push("/reader");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl mb-4">Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-2 p-2 border"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 p-2 border"
      />
      <button onClick={handleLogin} className="p-2 bg-blue-500 text-white">
        Login
      </button>
    </div>
  );
};

export default Login;
