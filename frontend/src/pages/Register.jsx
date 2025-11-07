import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', year: '', department: '', skills: '', interests: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    
    // Client-side validation
    if (!form.name || !form.name.trim()) {
      setError('Name is required')
      return
    }
    if (!form.email || !form.email.trim()) {
      setError('Email is required')
      return
    }
    
    // Validate email domain
    const emailLower = form.email.toLowerCase().trim()
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
    
    if (!form.password || form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    try {
      const payload = {
        ...form,
        skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
        interests: form.interests.split(',').map((s) => s.trim()).filter(Boolean),
      }
      const { data } = await axios.post('/api/auth/register', payload)
      localStorage.setItem('token', data.token)
      localStorage.setItem('userName', data.user.name)
      localStorage.setItem('userId', data.user.id)
      navigate('/dashboard')
    } catch (err) {
      // Show detailed error message
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.message || 
                          'Registration failed. Please check your connection and try again.'
      setError(errorMessage)
      console.error('Registration error:', err.response?.data || err.message)
    }
  }

  return (
    <div className="max-w-xl mx-auto card">
      <h2 className="text-xl font-bold mb-4">Create your account</h2>
      <p className="text-sm text-gray-600 mb-4">Only @geetauniversity.edu.in email addresses are allowed</p>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <form className="grid gap-3" onSubmit={onSubmit}>
        <div className="grid sm:grid-cols-2 gap-3">
          <input className="border rounded-md px-3 py-2" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="border rounded-md px-3 py-2" type="email" placeholder="Email (@geetauniversity.edu.in)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <input className="border rounded-md px-3 py-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <div className="grid sm:grid-cols-2 gap-3">
          <input className="border rounded-md px-3 py-2" placeholder="Year (e.g., 2nd)" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
          <input className="border rounded-md px-3 py-2" placeholder="Department (e.g., CSE)" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
        </div>
        <input className="border rounded-md px-3 py-2" placeholder="Skills (comma separated)" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
        <input className="border rounded-md px-3 py-2" placeholder="Interests (comma separated)" value={form.interests} onChange={(e) => setForm({ ...form, interests: e.target.value })} />
        <button className="btn btn-primary" type="submit">Create account</button>
      </form>
      <div className="text-sm mt-3">Have an account? <Link to="/login" className="text-gu-red underline">Login</Link></div>
    </div>
  )
}






