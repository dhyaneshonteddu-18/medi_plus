import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { formatPriceClean } from '../utils/currency'

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!user) {
      navigate('/login')
    } else {
      navigate('/checkout')
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-50 dark:bg-zinc-950">
        <div className="text-center">
          <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-12 h-12 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">Your cart is empty</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-lg">Add some medicines to get started</p>
          <Link to="/medicines" className="btn-primary">
            Browse Medicines
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="card p-5 hover:shadow-lg transition-shadow">
                <div className="flex gap-5">
                  {/* Image */}
                  <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden flex items-center justify-center p-2">
                    <img
                      src={item.image_url || '/images/medicines/placeholder.png'}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 text-zinc-900 dark:text-zinc-50">{item.name}</h3>
                    <p className="text-emerald-600 dark:text-emerald-400 font-bold text-xl">{formatPriceClean(item.price)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-9 h-9 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <svg className="w-5 h-5 text-zinc-700 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="text-lg font-bold w-10 text-center text-zinc-900 dark:text-zinc-50">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-9 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <svg className="w-5 h-5 text-zinc-700 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Total: <span className="text-zinc-900 dark:text-zinc-50 font-semibold">{formatPriceClean(item.price * item.quantity)}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-5 text-zinc-900 dark:text-zinc-50">Order Summary</h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPriceClean(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Delivery</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Free</span>
                </div>
                <div className="border-t-2 border-zinc-200 dark:border-zinc-800 pt-3 mt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-zinc-900 dark:text-zinc-50">Total</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{formatPriceClean(getCartTotal())}</span>
                  </div>
                </div>
              </div>

              <button onClick={handleCheckout} className="btn-primary w-full mb-3">
                Proceed to Checkout
              </button>

              <Link to="/medicines" className="block text-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
