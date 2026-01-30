import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

export default function Showcase() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Technical MVPs
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Production-ready prototypes built with modern architectures.
            Each project demonstrates end-to-end technical execution from
            concept to deployment.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
