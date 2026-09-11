import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useCart } from '../contexts/CartContext'
import { formatPriceClean } from '../utils/currency'

const Medicines = () => {
  const [medicines, setMedicines] = useState([])
  const [filteredMedicines, setFilteredMedicines] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [categories, setCategories] = useState([])
  const { addToCart } = useCart()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    fetchMedicines()
    
    // Check if category or search is in URL params
    const categoryParam = searchParams.get('category')
    const searchParam = searchParams.get('search')
    
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
    
    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [])

  useEffect(() => {
    filterMedicines()
  }, [searchQuery, selectedCategory, medicines])

  const fetchMedicines = async () => {
    try {
      const { data, error } = await supabase
        .from('medicines')
        .select('*')
        .eq('in_stock', true)
        .order('name')

      if (error) throw error

      setMedicines(data || [])

      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(m => m.category))]
      setCategories(uniqueCategories)
    } catch (error) {
      console.error('Error fetching medicines:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterMedicines = () => {
    let filtered = medicines

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(m => m.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(m =>
        m.name.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query) ||
        m.category.toLowerCase().includes(query)
      )
    }

    setFilteredMedicines(filtered)
  }

  const handleAddToCart = (medicine) => {
    addToCart(medicine, 1)
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
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">All Medicines</h1>
          <p className="text-gray-600 dark:text-gray-400">Browse our complete catalog</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10"
                  placeholder="Search medicines..."
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-56">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredMedicines.length} of {medicines.length} medicines
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </div>
        </div>

        {/* Medicines Grid */}
        {filteredMedicines.length === 0 ? (
          <div className="card p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No medicines found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMedicines.map((medicine) => (
              <div key={medicine.id} className="card p-4 group flex flex-col hover:scale-105 transition-all">
                <Link to={`/medicine/${medicine.id}`} className="flex-1">
                  <div className="relative mb-3 overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-800">
                    <img
                      src={medicine.image_url}
                      alt={medicine.name}
                      className="medicine-image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/images/medicines/placeholder.svg'
                      }}
                    />
                    {medicine.requires_prescription && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-semibold">
                        Rx Required
                      </span>
                    )}
                    <span className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded font-semibold">
                      {medicine.category}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold mb-1 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {medicine.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 line-clamp-2">{medicine.description}</p>
                </Link>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">{formatPriceClean(medicine.price)}</span>
                  <button
                    onClick={() => handleAddToCart(medicine)}
                    className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-medium shadow-glow"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Medicines
