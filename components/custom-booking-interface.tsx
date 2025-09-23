"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function CustomBookingInterface({ serviceType = "consultation" }: { serviceType?: string }) {
  const [selectedDate, setSelectedDate] = useState<number>(15) // Default to 15th
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const handleBookNow = () => {
    // Redirect to Acuity scheduler with your actual IDs
    window.open("https://app.acuityscheduling.com/schedule.php?owner=29289453&appointmentType=79659765", "_blank")
  }

  const getSelectedDateString = () => {
    if (!selectedDate) return ""

    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate)
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dayName = dayNames[date.getDay()]
    const monthName = monthNames[date.getMonth()]

    return `${dayName}, ${monthName} ${selectedDate}`
  }

  const handleDateSelect = (day: number) => {
    setSelectedDate(day)
  }

  const days = getDaysInMonth(currentMonth)

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">Schedule your service</h3>
      <p className="text-gray-600 mb-6">
        Check our availability and select a time that works best for you. Click next to select your package.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium">Select a Date and Time</h4>
            <p className="text-sm text-gray-500">Time zone: Hawaii-Aleutian Standard Time (HST)</p>
          </div>

          {/* Calendar Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => navigateMonth("prev")} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </button>

            <h4 className="text-lg font-medium">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h4>

            <button onClick={() => navigateMonth("next")} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}

            {days.map((day, index) => (
              <div key={index} className="aspect-square">
                {day && (
                  <button
                    onClick={() => handleDateSelect(day)}
                    className={`w-full h-full flex items-center justify-center text-sm rounded-lg transition-colors ${
                      selectedDate === day ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-900"
                    }`}
                  >
                    {day}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Availability Info */}
          <div className="mb-4">
            <p className="font-medium text-gray-900 mb-2">Availability for {getSelectedDateString()}</p>
            <p className="text-gray-600 text-sm mb-3">
              Click below to check real-time availability and book your consultation.
            </p>
            <Button onClick={handleBookNow} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 w-full">
              Check Availability & Book
            </Button>
          </div>
        </div>

        {/* Service Details */}
        <div>
          <h4 className="text-lg font-medium mb-4">Service Details</h4>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Available Online</span>
            </div>

            <div>
              <h5 className="font-medium text-gray-900">
                {serviceType === "consultation" && "1 on 1 Consultation"}
                {serviceType === "manuscript-review" && "Manuscript Review"}
                {serviceType === "silver-package" && "Silver Package"}
                {serviceType === "gold-package" && "Gold Package"}
                {serviceType === "diamond-package" && "Diamond Package"}
                {serviceType === "platinum-package" && "Platinum Package"}
              </h5>
              <p className="text-2xl font-bold text-gray-900">
                {serviceType === "consultation" && "$97"}
                {serviceType === "manuscript-review" && "$100"}
                {serviceType === "silver-package" && "$397"}
                {serviceType === "gold-package" && "$597"}
                {serviceType === "diamond-package" && "$1,397"}
                {serviceType === "platinum-package" && "$2,397"}
              </p>
            </div>

            <ul className="space-y-2 text-sm text-gray-600">
              {serviceType === "consultation" && (
                <>
                  <li>• 1 hour personalized consultation</li>
                  <li>• Conducted via Zoom</li>
                  <li>• Tailored publishing strategy</li>
                  <li>• Manuscript guidance</li>
                  <li>• Marketing insights</li>
                </>
              )}
              {serviceType === "manuscript-review" && (
                <>
                  <li>• Professional manuscript evaluation</li>
                  <li>• 1 hour consultation via Zoom</li>
                  <li>• Written review within 7-10 days</li>
                  <li>• Structure and content feedback</li>
                  <li>• Marketability assessment</li>
                </>
              )}
              {serviceType === "silver-package" && (
                <>
                  <li>• Two 30-minute calls per week</li>
                  <li>• 2 weeks of coaching support</li>
                  <li>• Publishing Q&A sessions</li>
                  <li>• Resource recommendations</li>
                  <li>• Conducted via Zoom</li>
                </>
              )}
              {serviceType === "gold-package" && (
                <>
                  <li>• One 45-minute call per week</li>
                  <li>• 4 weeks of coaching support</li>
                  <li>• Manuscript preparation guidance</li>
                  <li>• Formatting and cover resources</li>
                  <li>• Publishing walkthrough</li>
                </>
              )}
              {serviceType === "diamond-package" && (
                <>
                  <li>• Six 1-hour calls per week</li>
                  <li>• 6 weeks of intensive coaching</li>
                  <li>• Complete publishing process</li>
                  <li>• Copyright and ISBN guidance</li>
                  <li>• Professional book cover completion</li>
                </>
              )}
              {serviceType === "platinum-package" && (
                <>
                  <li>• Full-service publishing</li>
                  <li>• Editing up to 30,000 words</li>
                  <li>• Custom book cover design</li>
                  <li>• Amazon KDP setup</li>
                  <li>• Complete publishing management</li>
                </>
              )}
            </ul>

            <Button onClick={handleBookNow} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
