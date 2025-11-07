import { Link, useNavigate } from 'react-router-dom'
import logo from './images/logo.png';

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const userName = localStorage.getItem('userName')

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
           <img
            src={logo}
            alt="Geeta University Logo"
            className="w-8 h-8 rounded-full object-cover"
            />
          <span className="font-bold">GU HackConnect</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          {token ? (
            <>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gu-gold" />
                <span className="text-sm">{userName || 'Student'}</span>
                <button onClick={logout} className="btn btn-primary">Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/register" className="btn">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}








