import React, { useState } from 'react'
import {useNavigate, Link} from 'react-router'
import {useAuth} from '../hook/useAuth.js'
import {ThemeToggle} from '../../shared/components/ThemeToggle.jsx'

const Login = () => {

  const {loading, handleLogin} = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const result = await handleLogin({email, password});
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message || "Invalid email or password.");
    }
  }

  if(loading){
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl font-medium text-muted-light dark:text-muted-dark">Loading...</h1>
      </main>
    )
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm rounded-2xl bg-panel-light p-8 shadow-sm ring-1 ring-muted-light/15 dark:bg-panel-dark dark:ring-muted-dark/15">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-accent">SmartPrep</h1>
          <p className="mt-1 text-sm text-muted-light dark:text-muted-dark">Practice smarter, interview better..</p>
        </div>

        <h2 className="mb-6 text-xl font-semibold tracking-tight">Login</h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-muted-light dark:text-muted-dark">Email</label>
            <input
              type="email" id="email" name="email"
              placeholder="Enter your email address"
              onChange={(e)=>setEmail(e.target.value)}
              className="rounded-lg bg-surface-light px-3 py-2 text-sm outline-none ring-1 ring-muted-light/20 transition-shadow placeholder:text-muted-light/60 focus:ring-2 focus:ring-accent dark:bg-surface-dark dark:ring-muted-dark/20 dark:placeholder:text-muted-dark/50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-muted-light dark:text-muted-dark">Password</label>
            <input
              type="password" id="password" name="password"
              placeholder="Enter your password"
              onChange={(e)=>setPassword(e.target.value)}
              className="rounded-lg bg-surface-light px-3 py-2 text-sm outline-none ring-1 ring-muted-light/20 transition-shadow placeholder:text-muted-light/60 focus:ring-2 focus:ring-accent dark:bg-surface-dark dark:ring-muted-dark/20 dark:placeholder:text-muted-dark/50"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600 ring-1 ring-red-500/20 dark:text-red-400">
              {error}
            </p>
          )}

          <button className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-light dark:text-muted-dark">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-accent hover:text-accent-hover">Register</Link>
        </p>
      </div>
    </main>
  )
}

export default Login;