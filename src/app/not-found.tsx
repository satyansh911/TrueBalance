"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import dynamic from "next/dynamic"

// Completely disable SSR for the Lottie component
const Lord404Icon = dynamic(() => import("@/components/ui/404notfound"), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center bg-muted/20 rounded-lg animate-pulse"
      style={{ height: 240, width: 240 }}
    >
      <span className="text-8xl text-muted-foreground">🔍</span>
    </div>
  ),
})

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <div className="mb-2">
          <Suspense
            fallback={
              <div
                className="flex items-center justify-center bg-muted/20 rounded-lg animate-pulse"
                style={{ height: 240, width: 240 }}
              >
                <span className="text-8xl text-muted-foreground">🔍</span>
              </div>
            }
          >
            <Lord404Icon size={240} />
          </Suspense>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Don&apos;t worry, even the best data sometimes gets lost in the internet.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        If you believe this is an error, please contact our support team.
      </footer>
    </div>
  )
}
