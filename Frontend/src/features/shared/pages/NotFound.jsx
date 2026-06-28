import { useNavigate } from 'react-router'
import { ThemeToggle } from '../components/ThemeToggle.jsx'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <span className="text-3xl font-bold tracking-tight text-accent">SmartPrep</span>

      <h1 className="mt-8 text-6xl font-bold tracking-tight">404</h1>
      <p className="mt-3 text-lg font-medium">Page not found</p>
      <p className="mt-2 text-sm text-muted-light dark:text-muted-dark">
        The page you're looking for doesn't exist.
      </p>

      <button
        onClick={() => navigate('/')}
        className="mt-8 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
      >
        Go home
      </button>
    </main>
  )
}

export default NotFound
