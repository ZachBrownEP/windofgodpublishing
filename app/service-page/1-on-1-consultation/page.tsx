"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ConsultationRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the correct consultation page
    router.replace("/services/consultation")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to consultation page...</p>
      </div>
    </div>
  )
}
