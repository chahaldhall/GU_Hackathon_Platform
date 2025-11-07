export default function ProjectCard({ project }) {
  return (
    <div className="card">
      <div className="font-semibold">{project.title}</div>
      <div className="text-sm text-neutral-600">Team: {project.team?.name}</div>
      <p className="text-sm mt-2 line-clamp-3">{project.description}</p>
      <div className="flex gap-2 mt-3 flex-wrap">
        {project.tags?.slice(0, 4).map((t) => (
          <span key={t} className="text-xs bg-neutral-100 px-2 py-1 rounded-full">{t}</span>
        ))}
      </div>
      <div className="mt-3 flex gap-3">
        {project.repoUrl && <a className="text-gu-red underline" href={project.repoUrl} target="_blank" rel="noreferrer">Repo</a>}
        {project.demoUrl && <a className="text-gu-red underline" href={project.demoUrl} target="_blank" rel="noreferrer">Demo</a>}
      </div>
    </div>
  )
}








