import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      // Get distinct categories with medicine count
      const { data, error } = await supabase
        .from('medicines')
        .select('category')
      
      if (error) throw error

      // Count medicines per category
      const categoryMap = {}
      data.forEach(item => {
        categoryMap[item.category] = (categoryMap[item.category] || 0) + 1
      })

      const categoriesWithCount = Object.entries(categoryMap).map(([name, count]) => ({
        name,
        count,
        icon: getCategoryIcon(name)
      }))

      setCategories(categoriesWithCount)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (category) => {
    const icons = {
      'Pain Relief': '💊',
      'Antibiotics': '🦠',
      'Vitamins': '🌟',
      'Allergy': '🤧',
      'Digestive': '🫀',
      'Diabetes': '💉',
      'Cardiovascular': '❤️',
      'Respiratory': '🫁',
      'Skin Care': '🧴',
      'Mental Health': '🧠'
    }
    return icons[category] || '💊'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Browse by Category
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Find the right medicines for your health needs
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/medicines?category=${encodeURIComponent(category.name)}`}
              className="card p-6 hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {category.count} {category.count === 1 ? 'medicine' : 'medicines'}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="card p-8 max-w-2xl mx-auto bg-gradient-to-r from-primary-50 to-green-50 dark:from-primary-900/20 dark:to-green-900/20">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Browse all medicines or contact our support team for assistance
            </p>
            <Link
              to="/medicines"
              className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all font-semibold shadow-glow hover:shadow-glow-lg"
            >
              View All Medicines
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
