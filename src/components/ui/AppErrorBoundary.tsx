import { Component, type ReactNode, type ErrorInfo } from 'react'
import { Link } from 'react-router-dom'

interface State { hasError: boolean; error?: Error }

export default class AppErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[AppErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-limewash px-5 text-umber">
          <div className="max-w-md text-center">
            <h1 className="display-fraunces mb-4 text-4xl">Something went wrong</h1>
            <p className="body-copy mb-8 text-umber/80">
              An unexpected error occurred. Please try again, or return to the home page.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => this.setState({ hasError: false })} className="btn-line">
                Try again
              </button>
              <Link to="/" className="btn-bronze" onClick={() => this.setState({ hasError: false })}>
                Return home
              </Link>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
