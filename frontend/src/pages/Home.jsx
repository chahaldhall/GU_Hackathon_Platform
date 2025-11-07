import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-16">
      <h1 className="text-4xl sm:text-5xl font-extrabold ">
        Join or Host Hackathons at <span className="text-gu-red">Geeta University</span>
      </h1>
      <p className="max-w-2xl text-lg text-neutral-600">
        Find teammates, explore projects, and collaborate in real-time with GU HackConnect.
      </p>
      <div className="flex gap-4">
        <Link to="/register" className="btn btn-primary">Get Started</Link>
        <Link to="/dashboard" className="btn">Explore Dashboard</Link>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mt-10 w-full">
        <div className="card">
          <h3 className="font-semibold mb-1">Team Finder</h3>
          <p className="text-sm text-neutral-600">Post that you are looking for a team or members.</p>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-1">Project Explorer</h3>
          <p className="text-sm text-neutral-600">Browse ongoing and past hackathon projects.</p>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-1">Real-time Chat</h3>
          <p className="text-sm text-neutral-600">Collaborate with your team via Socket.io chatrooms.</p>
        </div>
      </div>
    </div>
  )
}








