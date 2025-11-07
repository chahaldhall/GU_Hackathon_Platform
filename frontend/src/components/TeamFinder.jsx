import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function TeamFinder() {
  const [teams, setTeams] = useState([])
  const [filters, setFilters] = useState({ domain: '', skill: '', looking: 'true' })

  useEffect(() => {
    axios.get('/api/teams', { params: filters }).then((res) => setTeams(res.data)).catch(() => {})
  }, [filters])

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input className="border rounded-md px-3 py-2" placeholder="Domain (AI, Web, etc.)" value={filters.domain} onChange={(e) => setFilters({ ...filters, domain: e.target.value })} />
        <input className="border rounded-md px-3 py-2" placeholder="Skill (React, ML, etc.)" value={filters.skill} onChange={(e) => setFilters({ ...filters, skill: e.target.value })} />
        <select className="border rounded-md px-3 py-2" value={filters.looking} onChange={(e) => setFilters({ ...filters, looking: e.target.value })}>
          <option value="true">Looking for members</option>
          <option value="false">Any</option>
        </select>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((t) => (
          <div key={t._id} className="border rounded-xl p-4">
            <div className="font-semibold">{t.name}</div>
            <div className="text-sm text-neutral-600">{t.domain}</div>
            <div className="text-sm mt-2">Needs: {t.skillsNeeded?.join(', ') || '—'}</div>
            <Link to={`/chat/${t._id}`} className="btn btn-primary mt-3">Open Chat</Link>
          </div>
        ))}
        {teams.length === 0 && <div className="text-neutral-500">No teams match filters.</div>}
      </div>
    </div>
  )
}








