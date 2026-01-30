export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-dark-800 px-6 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <p className="text-sm text-gray-500">
          {currentYear} Matt Corwin. Built with React & Tailwind.
        </p>
        <p className="text-sm text-gray-600">
          Technical Product Architect
        </p>
      </div>
    </footer>
  )
}
