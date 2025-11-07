import { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    
    // Validate email domain
    if (!email || !email.trim()) {
      setError('Email is required')
      return
    }
    
    const emailLower = email.toLowerCase().trim()
    if (!emailLower.endsWith('@geetauniversity.edu.in')) {
      setError('Only @geetauniversity.edu.in email addresses are allowed')
      return
    }
    // Ensure there's a username part before @
    const atIndex = emailLower.indexOf('@')
    if (atIndex <= 0 || emailLower.substring(atIndex) !== '@geetauniversity.edu.in') {
      setError('Please enter a valid email address')
      return
    }
    
    try {
      const { data } = await axios.post('/api/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('userName', data.user.name)
      localStorage.setItem('userId', data.user.id)
      const redirect = location.state?.from?.pathname || '/dashboard'
      navigate(redirect)
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <p className="text-sm text-gray-600 mb-4">Only @geetauniversity.edu.in email addresses are allowed</p>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <form className="grid gap-3" onSubmit={onSubmit}>
        <input className="border rounded-md px-3 py-2" type="email" placeholder="Email (@geetauniversity.edu.in)" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border rounded-md px-3 py-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
      <div className="text-sm mt-3">No account? <Link to="/register" className="text-gu-red underline">Register</Link></div>
    </div>
  )
}






