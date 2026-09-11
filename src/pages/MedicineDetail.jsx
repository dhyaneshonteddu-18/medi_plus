import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { formatPriceClean } from '../utils/currency'

const MedicineDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [medicine, setMedicine] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewComment, setReviewComment] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)
  const [reviews, setReviews] = useState([])
  const { addToCart } = useCart()
  const { user } = useAuth()

  console.log('MedicineDetail rendered with ID:', id)

  useEffect(() => {
    if (id) {
      setLoading(true)
      setMedicine(null) // Reset medicine state
      fetchMedicine()
      fetchReviews()
    }
  }, [id])

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:user_id (full_name)
        `)
        .eq('medicine_id', id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setReviews(data || [])
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  const handleSubmitReview = async () => {
    if (!user) {
      alert('Please login to submit a review')
      navigate('/login')
      return
    }

    if (reviewRating === 0) {
      alert('Please select a rating')
      return
    }

    if (!reviewComment.trim()) {
      alert('Please write a comment')
      return
    }

    setSubmittingReview(true)
    try {
      const { error } = await supabase
        .from('reviews')
        .insert([
          {
            medicine_id: id,
            user_id: user.id,
            rating: reviewRating,
            comment: reviewComment.trim()
          }
        ])

      if (error) throw error

      alert('Review submitted successfully!')
      setShowReviewModal(false)
      setReviewRating(0)
      setReviewComment('')
      fetchReviews() // Refresh reviews
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Failed to submit review. Please try again.')
    } finally {
      setSubmittingReview(false)
    }
  }

  const fetchMedicine = async () => {
    try {
      console.log('Fetching medicine with ID:', id)
      const { data, error } = await supabase
        .from('medicines')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      console.log('Medicine data:', data)
      setMedicine(data)
    } catch (error) {
      console.error('Error fetching medicine:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    addToCart(medicine, quantity)
    navigate('/cart')
  }

  // Generate overview content based on medicine details
  const generateOverview = (med) => {
    const categoryInfo = {
      'Pain Relief': {
        uses: 'Pain relief, fever reduction, headaches, muscle pain, arthritis, inflammation',
        mechanism: 'Works by blocking pain signals in the brain and reducing inflammation',
        duration: 'Effects typically last 4-6 hours',
        precautions: 'Do not exceed recommended dosage. Consult doctor if symptoms persist.'
      },
      'Antibiotics': {
        uses: 'Bacterial infections, respiratory infections, skin infections, urinary tract infections',
        mechanism: 'Kills or inhibits the growth of bacteria by interfering with bacterial cell wall synthesis',
        duration: 'Complete the full course as prescribed (typically 5-10 days)',
        precautions: 'Take with food if stomach upset occurs. Complete full course even if feeling better.'
      },
      'Vitamins': {
        uses: 'Nutritional supplementation, immune support, bone health, energy metabolism',
        mechanism: 'Provides essential nutrients required for normal body functions and cellular processes',
        duration: 'For best results, take daily as directed',
        precautions: 'Do not exceed recommended daily dosage. Store in cool, dry place.'
      },
      'Allergy': {
        uses: 'Allergic reactions, hay fever, skin rashes, itching, seasonal allergies',
        mechanism: 'Blocks histamine receptors to reduce allergic symptoms and inflammation',
        duration: 'Relief typically lasts 24 hours (once-daily dosing)',
        precautions: 'May cause drowsiness in some individuals. Avoid alcohol.'
      },
      'Digestive': {
        uses: 'Acid reflux, heartburn, indigestion, stomach ulcers, digestive disorders',
        mechanism: 'Reduces stomach acid production or improves digestive enzyme activity',
        duration: 'Take as directed, usually before meals',
        precautions: 'If symptoms persist for more than 2 weeks, consult your doctor.'
      },
      'Diabetes': {
        uses: 'Type 2 diabetes management, blood sugar control',
        mechanism: 'Improves insulin sensitivity and helps regulate blood glucose levels',
        duration: 'Long-term medication, take daily as prescribed',
        precautions: 'Monitor blood sugar regularly. Take with meals to reduce side effects.'
      },
      'Cardiovascular': {
        uses: 'High blood pressure, heart disease, cholesterol management, angina',
        mechanism: 'Relaxes blood vessels, reduces cholesterol, or regulates heart rhythm',
        duration: 'Long-term medication for chronic conditions',
        precautions: 'Do not stop suddenly without consulting doctor. Monitor blood pressure regularly.'
      },
      'Respiratory': {
        uses: 'Asthma, COPD, breathing difficulties, bronchitis',
        mechanism: 'Opens airways and reduces inflammation in respiratory passages',
        duration: 'Use as needed for acute symptoms or daily for control',
        precautions: 'Rinse mouth after inhaler use. Keep track of inhaler doses.'
      },
      'Skin Care': {
        uses: 'Fungal infections, eczema, dermatitis, skin inflammation',
        mechanism: 'Reduces inflammation or kills fungi/bacteria on skin surface',
        duration: 'Apply as directed, typically 2-3 times daily',
        precautions: 'For external use only. Avoid contact with eyes.'
      },
      'Mental Health': {
        uses: 'Depression, anxiety, panic disorders, mood regulation',
        mechanism: 'Balances neurotransmitters in the brain to improve mood and reduce anxiety',
        duration: 'May take 2-4 weeks to see full effects',
        precautions: 'Do not stop abruptly. Regular follow-up with healthcare provider required.'
      }
    }

    return categoryInfo[med.category] || {
      uses: 'Various therapeutic applications',
      mechanism: 'Consult product information for detailed mechanism',
      duration: 'As directed by healthcare provider',
      precautions: 'Follow prescribed dosage and consult doctor for any concerns.'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!medicine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Medicine not found</h2>
          <button onClick={() => navigate('/medicines')} className="btn-primary">
            Back to Medicines
          </button>
        </div>
      </div>
    )
  }

  const overview = generateOverview(medicine)

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/medicines')}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Medicines
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="card p-6">
            <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 h-96 flex items-center justify-center">
              <img
                key={medicine.id}
                src={medicine.image_url}
                alt={medicine.name}
                className="w-full h-full object-contain p-4"
                loading="lazy"
                onError={(e) => {
                  console.log('Image failed, using fallback')
                  e.target.src = '/images/medicines/placeholder.svg'
                }}
              />
            </div>
            {medicine.requires_prescription && (
              <div className="mt-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
                <p className="font-bold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Prescription Required
                </p>
                <p className="text-sm mt-1">This medicine requires a valid prescription from a doctor.</p>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm mb-3 font-semibold">
              {medicine.category}
            </div>
            <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">{medicine.name}</h1>
            <div className="flex items-baseline gap-4 mb-5">
              <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">{formatPriceClean(medicine.price)}</span>
              <span className="text-gray-500 dark:text-gray-400">per unit</span>
            </div>

            <div className="card p-5 mb-4">
              <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Description</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{medicine.description}</p>
            </div>

            <div className="card p-5 mb-4">
              <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Stock Status</h2>
              <div className="flex items-center gap-2">
                {medicine.in_stock ? (
                  <>
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-green-600 dark:text-green-400 font-medium">In Stock ({medicine.stock_quantity} available)</span>
                  </>
                ) : (
                  <>
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="text-red-600 dark:text-red-400 font-medium">Out of Stock</span>
                  </>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="card p-5 mb-4">
              <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Quantity</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-xl font-bold w-14 text-center text-gray-900 dark:text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(medicine.stock_quantity, quantity + 1))}
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                Total: <span className="text-gray-900 dark:text-white font-bold text-lg">{formatPriceClean(medicine.price * quantity)}</span>
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!medicine.in_stock}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {medicine.in_stock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* Share and Coupons Section */}
            <div className="grid grid-cols-2 gap-4">
              {/* Share Button */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: medicine.name,
                      text: `Check out ${medicine.name} on MediCare Plus!`,
                      url: window.location.href
                    }).catch(err => console.log('Error sharing:', err))
                  } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(window.location.href)
                    alert('Link copied to clipboard!')
                  }
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-semibold shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>

              {/* Coupons Button */}
              <button
                onClick={() => {
                  // Toggle coupon modal or section
                  alert('Available Coupons:\n\n🎉 FIRST10 - 10% off on first order\n💊 SAVE20 - ₹20 off on orders above ₹200\n🏥 HEALTH15 - 15% off on medicines\n\nCopy the code and apply at checkout!')
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-all font-semibold shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Coupons
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-12">
          <div className="card p-6">
            {/* Tabs */}
            <div className="flex border-b-2 border-gray-200 dark:border-gray-800 mb-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'overview'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400 -mb-0.5'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('usage')}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'usage'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400 -mb-0.5'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Usage & Dosage
              </button>
              <button
                onClick={() => setActiveTab('precautions')}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'precautions'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400 -mb-0.5'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Precautions
              </button>
            </div>

            {/* Tab Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Common Uses
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{overview.uses}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      How It Works
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{overview.mechanism}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Duration of Effect
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{overview.duration}</p>
                  </div>
                </div>
              )}

              {activeTab === 'usage' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Dosage Information</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                      <li>Adults: Follow prescribed dosage or as directed on label</li>
                      <li>Take with or without food as directed</li>
                      <li>Swallow tablets/capsules whole with water</li>
                      <li>Do not crush or chew unless specifically directed</li>
                      <li>Maintain consistent timing for best results</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 p-4 rounded-lg">
                    <h4 className="font-bold text-yellow-800 dark:text-yellow-400 mb-2">Important</h4>
                    <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                      Always follow the dosage prescribed by your healthcare provider. Do not exceed recommended dosage.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'precautions' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Safety Information</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{overview.precautions}</p>
                    
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">General Precautions</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                      <li>Inform your doctor about all medications you're currently taking</li>
                      <li>Mention any allergies or medical conditions</li>
                      <li>Avoid alcohol unless specifically permitted</li>
                      <li>Store in a cool, dry place away from direct sunlight</li>
                      <li>Keep out of reach of children</li>
                      <li>Check expiry date before use</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-600 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 dark:text-red-400 mb-2">Seek Medical Attention If:</h4>
                    <ul className="list-disc list-inside space-y-1 text-red-700 dark:text-red-300 text-sm">
                      <li>You experience severe side effects or allergic reactions</li>
                      <li>Symptoms worsen or don't improve after the recommended period</li>
                      <li>You accidentally take more than the recommended dose</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ratings & Reviews Section */}
        <div className="mt-8">
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Ratings & Reviews</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Rating Summary */}
              <div>
                <div className="flex items-center gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                      {reviews.length > 0
                        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                        : '5.0'}
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const avgRating = reviews.length > 0
                          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                          : 5
                        return (
                          <svg
                            key={star}
                            className={`w-5 h-5 ${
                              star <= avgRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        )
                      })}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {reviews.length} {reviews.length === 1 ? 'rating' : 'ratings'}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = reviews.filter((r) => r.rating === rating).length
                      const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                      return (
                        <div key={rating} className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-3">{rating}</span>
                          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary-600"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Review Form */}
              <div className="border-l-0 md:border-l-2 border-gray-200 dark:border-gray-800 md:pl-8">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Review this product</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Help others make an informed decision!</p>
                
                <div className="flex gap-2 mb-6 justify-center md:justify-start">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => {
                        setReviewRating(star)
                        setShowReviewModal(true)
                      }}
                      className="text-gray-300 dark:text-gray-600 hover:text-yellow-400 transition-colors"
                    >
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowReviewModal(true)}
                  className="w-full py-3 border-2 border-primary-600 dark:border-primary-500 text-primary-600 dark:text-primary-400 font-semibold rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                >
                  Write a review
                </button>
              </div>
            </div>

            {/* Display Reviews */}
            {reviews.length > 0 && (
              <div className="mt-8 pt-8 border-t-2 border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  Customer Reviews ({reviews.length})
                </h3>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {review.profiles?.full_name || 'Anonymous User'}
                            </span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(review.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Write a Review</h3>
              <button
                onClick={() => {
                  setShowReviewModal(false)
                  setReviewRating(0)
                  setReviewComment('')
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Star Rating */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className={`${
                      star <= reviewRating
                        ? 'text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    } hover:text-yellow-400 transition-colors`}
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Your Review
              </label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience with this medicine..."
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="4"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowReviewModal(false)
                  setReviewRating(0)
                  setReviewComment('')
                }}
                className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={submittingReview || reviewRating === 0}
                className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MedicineDetail
