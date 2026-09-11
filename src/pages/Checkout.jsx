import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { formatPriceClean } from '../utils/currency'

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart()
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')
  const [formData, setFormData] = useState({
    name: profile?.full_name || '',
    address: '',
    phone: profile?.phone || '',
  })

  const coupons = {
    'FIRST10': { type: 'percentage', value: 10, minOrder: 0, description: '10% off on first order' },
    'SAVE20': { type: 'fixed', value: 20, minOrder: 200, description: '₹20 off on orders above ₹200' },
    'HEALTH15': { type: 'percentage', value: 15, minOrder: 0, description: '15% off on medicines' },
    'MEGA50': { type: 'fixed', value: 50, minOrder: 500, description: '₹50 off on orders above ₹500' },
    'WELLNESS25': { type: 'percentage', value: 25, minOrder: 0, description: '25% off on vitamins' },
    'CARE100': { type: 'fixed', value: 100, minOrder: 1000, description: '₹100 off on orders above ₹1000' }
  }

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase()
    const coupon = coupons[code]

    if (!coupon) {
      setCouponError('Invalid coupon code')
      return
    }

    const subtotal = getCartTotal()
    if (subtotal < coupon.minOrder) {
      setCouponError(`Minimum order of ₹${coupon.minOrder} required for this coupon`)
      return
    }

    setAppliedCoupon({ code, ...coupon })
    setCouponError('')
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    setCouponError('')
  }

  const getDiscount = () => {
    if (!appliedCoupon) return 0
    
    const subtotal = getCartTotal()
    if (appliedCoupon.type === 'percentage') {
      return (subtotal * appliedCoupon.value) / 100
    }
    return appliedCoupon.value
  }

  const getFinalTotal = () => {
    return Math.max(0, getCartTotal() - getDiscount())
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'Invalid phone number (10 digits required)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            total_amount: getFinalTotal(),
            status: 'pending',
            delivery_name: formData.name,
            delivery_address: formData.address,
            delivery_phone: formData.phone,
            payment_method: 'cash_on_delivery',
          },
        ])
        .select()
        .single()

      if (orderError) throw orderError

      // Create order items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        medicine_id: item.id,
        quantity: item.quantity,
        price_at_time: item.price,
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      // Clear cart
      await clearCart()

      // Navigate to success/orders page
      navigate('/orders', { state: { orderSuccess: true } })
    } catch (error) {
      console.error('Error creating order:', error)
      setErrors({ submit: 'Failed to place order. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Delivery Details */}
            <div className="lg:col-span-2">
              <div className="card p-5 mb-4">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Delivery Details</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Delivery Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`input-field ${errors.address ? 'border-red-500' : ''}`}
                      placeholder="House no., Street, Area, City, State, PIN Code"
                      rows={3}
                    />
                    {errors.address && (
                      <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="1234567890"
                    />
                    {errors.phone && (
                      <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card p-5">
                <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Payment Method</h2>
                <div className="flex items-center gap-3 p-3 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg">
                  <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Cash on Delivery</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pay when you receive your order</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-5 sticky top-20">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Order Summary</h2>

                <div className="space-y-2 mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-gray-900 dark:text-white">{formatPriceClean(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-3 space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>{formatPriceClean(getCartTotal())}</span>
                  </div>
                  
                  {/* Coupon Code Section */}
                  <div className="pt-2 pb-2">
                    {!appliedCoupon ? (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Have a coupon code?
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => {
                              setCouponCode(e.target.value.toUpperCase())
                              setCouponError('')
                            }}
                            placeholder="Enter code"
                            className="flex-1 min-w-0 px-3 py-2 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                          />
                          <button
                            type="button"
                            onClick={applyCoupon}
                            className="flex-shrink-0 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all text-sm whitespace-nowrap"
                          >
                            Apply
                          </button>
                        </div>
                        {couponError && (
                          <p className="text-red-500 dark:text-red-400 text-xs">{couponError}</p>
                        )}
                      </div>
                    ) : (
                      <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                            {appliedCoupon.code} Applied
                          </span>
                          <button
                            type="button"
                            onClick={removeCoupon}
                            className="text-xs text-red-600 dark:text-red-400 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-xs text-green-600 dark:text-green-300">
                          {appliedCoupon.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-{formatPriceClean(getDiscount())}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Delivery</span>
                    <span className="text-green-600 dark:text-green-400">Free</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-primary-600 dark:text-primary-400">{formatPriceClean(getFinalTotal())}</span>
                    </div>
                  </div>
                </div>

                {errors.submit && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-500 text-red-600 dark:text-red-400 px-3 py-2 rounded-lg mb-3 text-sm">
                    {errors.submit}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout
