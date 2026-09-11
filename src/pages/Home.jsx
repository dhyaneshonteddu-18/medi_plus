import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useCart } from '../contexts/CartContext'
import { formatPriceClean } from '../utils/currency'

const Home = () => {
  const [medicines, setMedicines] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const { addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    fetchFeaturedMedicines()
  }, [])

  const fetchFeaturedMedicines = async () => {
    try {
      const { data, error } = await supabase
        .from('medicines')
        .select('*')
        .eq('in_stock', true)
        .limit(12)

      if (error) throw error
      setMedicines(data || [])
    } catch (error) {
      console.error('Error fetching medicines:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/medicines?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleAddToCart = (medicine) => {
    addToCart(medicine, 1)
  }

  const categories = [
    { name: 'Pain Relief', icon: '💊', color: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' },
    { name: 'Vitamins', icon: '🌟', color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' },
    { name: 'Antibiotics', icon: '🦠', color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' },
    { name: 'Digestive', icon: '🫀', color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' },
    { name: 'Cardiovascular', icon: '❤️', color: 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800' },
    { name: 'Respiratory', icon: '🫁', color: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-zinc-900 dark:to-emerald-950 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl space-y-6">
              <div className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-semibold">
                🎉 Special Offer
              </div>
              <h1 className="text-6xl font-bold text-zinc-900 dark:text-white leading-tight">
                <span className="text-emerald-600">ZERO</span> Delivery Charges
              </h1>
              <p className="text-2xl text-zinc-600 dark:text-zinc-400">
                on your first order
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mt-8">
                <div className="flex gap-3 max-w-2xl">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for medicines, wellness & more..."
                      className="w-full px-5 py-4 pl-14 rounded-2xl text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none shadow-sm transition-all"
                    />
                    <svg
                      className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    Search
                  </button>
                </div>
              </form>

              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={() => navigate('/medicines')}
                  className="px-8 py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-semibold rounded-xl transition-all shadow-md"
                >
                  Shop Now →
                </button>
                <Link
                  to="/offers"
                  className="px-8 py-3 text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                >
                  View Offers
                </Link>
              </div>
            </div>
            
            {/* Medical Illustration */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-emerald-200 to-teal-200 dark:from-emerald-800/30 dark:to-teal-800/30 rounded-full flex items-center justify-center">
                  <div className="text-9xl">💊</div>
                </div>
                <div className="absolute top-10 -left-10 w-32 h-32 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-5xl animate-bounce">
                  🏥
                </div>
                <div className="absolute bottom-10 -right-10 w-24 h-24 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center text-4xl animate-pulse">
                  ⚕️
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Categories */}
      <section className="py-12 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-white">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/medicines?category=${encodeURIComponent(category.name)}`}
                className={`${category.color} border-2 rounded-2xl p-6 text-center hover:scale-105 hover:shadow-md transition-all cursor-pointer`}
              >
                <div className="text-5xl mb-3">{category.icon}</div>
                <p className="font-semibold text-zinc-900 dark:text-white text-sm">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Medicines */}
      <section className="py-12 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Popular Medicines
            </h2>
            <Link
              to="/medicines"
              className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-2"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
            {medicines.map((medicine) => (
              <div
                key={medicine.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl hover:shadow-lg transition-all overflow-hidden group"
              >
                <Link to={`/medicine/${medicine.id}`} className="block">
                  {/* 1:1 Image Container */}
                  <div className="relative bg-zinc-50 dark:bg-zinc-800 aspect-square flex items-center justify-center overflow-hidden">
                    <img
                      src={medicine.image_url}
                      alt={medicine.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/images/medicines/placeholder.svg'
                      }}
                    />
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2.5 py-1 font-bold rounded-lg shadow-sm">
                      25% OFF
                    </span>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-sm text-zinc-900 dark:text-white mb-2 line-clamp-2 min-h-[40px]">
                      {medicine.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg font-bold text-zinc-900 dark:text-white">
                        {formatPriceClean(medicine.price)}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 line-through">
                        {formatPriceClean(medicine.price * 1.25)}
                      </span>
                    </div>
                  </div>
                </Link>
                
                {/* Add to Cart Button */}
                <div className="px-4 pb-4">
                  <button
                    onClick={() => handleAddToCart(medicine)}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="py-8 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">Special Offers Just for You!</h2>
            <p className="text-xl mb-4">Get up to 50% off on selected medicines</p>
            <Link
              to="/offers"
              className="inline-block px-8 py-3 bg-white text-orange-600 font-bold hover:bg-gray-100 transition-all"
            >
              View All Offers
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
