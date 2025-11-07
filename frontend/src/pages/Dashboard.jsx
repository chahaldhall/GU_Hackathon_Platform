import { useEffect, useState } from 'react'
import axios from 'axios'
import TeamFinder from '../components/TeamFinder.jsx'
import ProjectCard from '../components/ProjectCard.jsx'

export default function Dashboard() {
  const [hackathons, setHackathons] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios.get('/api/admin/hackathons').then((res) => setHackathons(res.data)).catch(() => {})
    axios.get('/api/projects?status=ongoing').then((res) => setProjects(res.data)).catch(() => {})
  }, [])

  return (
    <div className="grid gap-6">
      <section className="grid sm:grid-cols-3 gap-4">
        {hackathons.map((h) => (
          <div className="card" key={h.id}>
            <h3 className="font-semibold">{h.title}</h3>
            <p className="text-sm text-neutral-600">{h.date} • {h.location}</p>
            <p className="text-sm mt-2">{h.description}</p>
          </div>
        ))}
        {hackathons.length === 0 && (
          <div className="text-neutral-500">No upcoming hackathons yet. Check back soon!</div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Team Finder</h2>
        <TeamFinder />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Ongoing Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} />)
          )}
        </div>
      </section>
    </div>
  )
}








