import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { formatPriceClean } from '../utils/currency'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState(null)
  const { user } = useAuth()
  const location = useLocation()
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (location.state?.orderSuccess) {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
      // Clear the state
      window.history.replaceState({}, document.title)
    }
    fetchOrders()
  }, [location])

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(
            *,
            medicine:medicines(*)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700',
      processing: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700',
      shipped: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700',
      delivered: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700',
      cancelled: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700',
    }
    return colors[status] || colors.pending
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">My Orders</h1>

        {showSuccess && (
          <div className="card p-4 mb-6 bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-green-700 dark:text-green-400">Order placed successfully!</p>
                <p className="text-sm text-green-600 dark:text-green-300">Your order will be delivered within 24-48 hours.</p>
              </div>
            </div>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">No orders yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start shopping to see your orders here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="card p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Order #{order.id.slice(0, 8)}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{formatDate(order.created_at)}</p>
                  </div>
                  <div className="mt-3 md:mt-0 text-left md:text-right">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Total Amount</p>
                    <p className="text-xl font-bold text-primary-600 dark:text-primary-400">{formatPriceClean(order.total_amount)}</p>
                  </div>
                </div>

                {/* Delivery Details */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Delivery Details</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Name</p>
                      <p className="text-gray-900 dark:text-gray-200">{order.delivery_name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="text-gray-900 dark:text-gray-200">{order.delivery_phone}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-gray-500 dark:text-gray-400">Address</p>
                      <p className="text-gray-900 dark:text-gray-200">{order.delivery_address}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="flex items-center justify-between w-full text-left text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <span className="font-semibold">
                      {order.order_items.length} {order.order_items.length === 1 ? 'item' : 'items'}
                    </span>
                    <svg
                      className={`w-5 h-5 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {expandedOrder === order.id && (
                    <div className="mt-3 space-y-3">
                      {order.order_items.map((item) => (
                        <div key={item.id} className="flex gap-4 bg-gray-100 dark:bg-gray-800/80 dark:border dark:border-emerald-900/30 rounded-lg p-3">
                          <img
                            src={item.medicine.image_url || '/images/medicines/placeholder.png'}
                            alt={item.medicine.name}
                            className="w-14 h-14 medicine-image"
                            loading="lazy"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 dark:text-white">{item.medicine.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">{formatPriceClean(item.price_at_time)}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">each</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
