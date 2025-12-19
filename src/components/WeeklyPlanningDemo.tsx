'use client'

import { useState } from 'react'

interface Customer {
  name: string
  street: string
  city: string
  phone: string
}

interface Service {
  name: string
}

interface Appointment {
  id: number
  customer: Customer
  service: Service
  price: number
  weekly_date: string
  weekly_time: string
}

// Demo component om prijs bewerking te tonen
export function WeeklyPlanningDemo() {
  const [editingPrice, setEditingPrice] = useState<number | null>(null)
  const [newPrice, setNewPrice] = useState('')
  
  // Demo data
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      customer: { name: 'Familie Janssen', street: 'Kerkstraat 12', city: 'Lommel', phone: '011 123 456' },
      service: { name: 'Binnen + Buiten' },
      price: 45.00,
      weekly_date: '2025-12-12',
      weekly_time: '09:00'
    },
    {
      id: 2,
      customer: { name: 'Meneer De Vries', street: 'Marktplein 5', city: 'Lommel', phone: '011 234 567' },
      service: { name: 'Alleen ramen' },
      price: 25.00,
      weekly_date: '2025-12-12', 
      weekly_time: '14:30'
    }
  ])

  const handleStartEditPrice = (appointmentId: number, currentPrice: number): void => {
    setEditingPrice(appointmentId)
    setNewPrice(currentPrice.toString())
  }

  const handleSavePrice = (appointmentId: number): void => {
    const price = parseFloat(newPrice)
    if (!isNaN(price)) {
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId ? { ...apt, price } : apt
      ))
    }
    setEditingPrice(null)
    setNewPrice('')
  }

  const handleCancelEditPrice = (): void => {
    setEditingPrice(null)
    setNewPrice('')
  }

  const formatPrice = (price: number): string => {
    return `€${price.toFixed(2).replace('.', ',')}`
  }

  const formatTime = (timeString: string): string => {
    if (!timeString) return 'Stel tijd in'
    return timeString.substring(0, 5)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">⏰ Weekplanning Demo</h2>
        <p className="text-gray-600">Klik op de prijs om aan te passen</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <h3 className="text-xl font-semibold text-blue-600 mb-4">
          📅 Donderdag 12 december 2025
        </h3>
        
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-lg mb-2">
                    {appointment.customer.name}
                  </h4>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-gray-600 text-sm">
                      {appointment.service.name}
                    </span>
                    {/* Prominente prijs weergave met bewerking */}
                    {editingPrice === appointment.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-medium">€</span>
                        <input
                          type="number"
                          step="0.01"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          className="w-20 px-3 py-1 border-2 border-green-400 rounded-md text-sm font-bold text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSavePrice(appointment.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs transition-colors"
                        >
                          ✓
                        </button>
                        <button
                          onClick={handleCancelEditPrice}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-2 py-1 rounded text-xs transition-colors"
                        >
                          ✗
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleStartEditPrice(appointment.id, appointment.price)}
                        className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 px-3 py-2 rounded-lg transition-all hover:shadow-md"
                      >
                        <span className="text-green-800 font-bold text-lg">
                          {formatPrice(appointment.price)}
                        </span>
                        <span className="text-green-600 text-xs ml-1">✏️</span>
                      </button>
                    )}
                  </div>

                  <p className="text-gray-500 text-sm mb-1">
                    📍 {appointment.customer.street}, {appointment.customer.city}
                  </p>
                  <p className="text-gray-500 text-sm">
                    📞 {appointment.customer.phone}
                  </p>
                </div>
                
                <div className="text-right flex flex-col items-end gap-3">
                  {/* Tijd weergave */}
                  <div className="text-lg font-bold text-blue-600">
                    ⏰ {formatTime(appointment.weekly_time)}
                  </div>
                  
                  {/* Voltooi knop */}
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    ✅ Voltooid
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Uitleg */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Nieuwe functionaliteit:</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• <strong>Prominente prijsweergave</strong>: Prijzen zijn nu groter en opvallender weergegeven</li>
          <li>• <strong>Prijs aanpassingen</strong>: Klik op een prijs om deze aan te passen (bijv. minder ramen)</li>
          <li>• <strong>Visuele feedback</strong>: Groene knoppen met hover effects voor duidelijke interactie</li>
          <li>• <strong>Gemakkelijk bewerken</strong>: Directe input met opslaan/annuleren knoppen</li>
        </ul>
      </div>
    </div>
  )
}