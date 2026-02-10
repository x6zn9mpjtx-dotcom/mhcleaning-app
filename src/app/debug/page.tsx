'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function DebugPage() {
  const [customers, setCustomers] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    // Laad alle klanten
    const { data: customersData, error: customersError } = await supabase
      .from('customers')
      .select('*')
    
    if (customersError) {
      console.error('Customers error:', customersError)
    } else {
      setCustomers(customersData || [])
    }

    // Laad alle appointments
    const { data: appointmentsData, error: appointmentsError } = await supabase
      .from('appointments')
      .select(`
        *,
        customer:customers(*),
        service:services(*)
      `)
    
    if (appointmentsError) {
      console.error('Appointments error:', appointmentsError)
    } else {
      setAppointments(appointmentsData || [])
    }
  }

  const createTestAppointment = async () => {
    if (customers.length === 0) return

    const { error } = await supabase
      .from('appointments')
      .insert({
        customer_id: customers[0].id,
        service_id: 1, // Assuming service 1 exists
        status: 'monthly',
        monthly_target_date: '2024-12-20'
      })

    if (error) {
      console.error('Insert error:', error)
    } else {
      console.log('Test appointment created!')
      loadData()
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Debug Page</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Customers ({customers.length})</h2>
        <div className="bg-gray-100 p-4 rounded">
          {customers.map(customer => (
            <div key={customer.id} className="mb-2">
              <strong>ID:</strong> {customer.id}, <strong>Name:</strong> {customer.name}, <strong>Address:</strong> {customer.address}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Appointments ({appointments.length})</h2>
        <div className="bg-gray-100 p-4 rounded">
          {appointments.map(appointment => (
            <div key={appointment.id} className="mb-2">
              <strong>ID:</strong> {appointment.id}, 
              <strong> Customer:</strong> {appointment.customer?.name || 'Unknown'}, 
              <strong> Status:</strong> {appointment.status}, 
              <strong> Date:</strong> {appointment.monthly_target_date || appointment.weekly_date || 'No date'}
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={createTestAppointment}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={customers.length === 0}
      >
        Create Test Appointment voor eerste klant
      </button>
    </div>
  )
}