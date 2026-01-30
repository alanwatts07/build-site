const workflowSteps = [
  {
    number: '01',
    title: 'Discovery & Scoping',
    description: 'Rapid requirements gathering with AI-assisted research. I analyze market context, technical constraints, and existing solutions to define a focused MVP scope.'
  },
  {
    number: '02',
    title: 'Architecture Design',
    description: 'System design leveraging proven patterns and modern tooling. I use AI pair programming to evaluate trade-offs and generate architectural documentation.'
  },
  {
    number: '03',
    title: 'Accelerated Development',
    description: 'AI-augmented coding with continuous iteration. Automated testing, code review, and documentation generation accelerate delivery without sacrificing quality.'
  },
  {
    number: '04',
    title: 'Deploy & Iterate',
    description: 'Production deployment with monitoring and feedback loops. Rapid iteration based on real-world usage data and stakeholder input.'
  }
]

export default function Workflow() {
  return (
    <section id="workflow" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            AI-Augmented Prototyping
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            My development workflow integrates AI tools at every stage,
            dramatically accelerating the path from concept to working product
            while maintaining engineering rigor.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-accent-500/50 via-dark-700 to-transparent lg:left-1/2 lg:block" />

          <div className="space-y-12">
            {workflowSteps.map((step, index) => (
              <div
                key={step.number}
                className={`relative flex flex-col lg:flex-row lg:items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Step number marker */}
                <div className="absolute left-0 flex h-16 w-16 items-center justify-center rounded-full border border-dark-700 bg-dark-900 text-xl font-bold text-accent-400 lg:left-1/2 lg:-translate-x-1/2">
                  {step.number}
                </div>

                {/* Content card */}
                <div
                  className={`ml-24 rounded-xl border border-dark-700 bg-dark-900/50 p-6 lg:ml-0 lg:w-5/12 ${
                    index % 2 === 0 ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'
                  }`}
                >
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
