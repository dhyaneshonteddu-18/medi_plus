import { useState } from 'react'

const Offers = () => {
  const [copiedCode, setCopiedCode] = useState(null)

  const offers = [
    {
      id: 1,
      code: 'FIRST10',
      title: '10% Off First Order',
      description: 'Get 10% discount on your first order. Valid for all products.',
      discount: '10%',
      minOrder: 0,
      validUntil: '2024-12-31',
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 2,
      code: 'SAVE20',
      title: '₹20 Off on Orders Above ₹200',
      description: 'Save ₹20 on orders worth ₹200 or more. Limited time offer.',
      discount: '₹20',
      minOrder: 200,
      validUntil: '2024-12-31',
      color: 'from-green-500 to-green-700'
    },
    {
      id: 3,
      code: 'HEALTH15',
      title: '15% Off on All Medicines',
      description: 'Get 15% discount on all medicines. No minimum order value.',
      discount: '15%',
      minOrder: 0,
      validUntil: '2024-12-31',
      color: 'from-purple-500 to-purple-700'
    },
    {
      id: 4,
      code: 'MEGA50',
      title: '₹50 Off on Orders Above ₹500',
      description: 'Big savings! Get ₹50 off on orders worth ₹500 or more.',
      discount: '₹50',
      minOrder: 500,
      validUntil: '2024-12-31',
      color: 'from-orange-500 to-orange-700'
    },
    {
      id: 5,
      code: 'WELLNESS25',
      title: '25% Off on Vitamins',
      description: 'Special discount on all vitamin supplements. Stay healthy!',
      discount: '25%',
      minOrder: 0,
      validUntil: '2024-12-31',
      color: 'from-yellow-500 to-yellow-700'
    },
    {
      id: 6,
      code: 'CARE100',
      title: '₹100 Off on Orders Above ₹1000',
      description: 'Huge discount on bulk orders. Perfect for family needs.',
      discount: '₹100',
      minOrder: 1000,
      validUntil: '2024-12-31',
      color: 'from-red-500 to-red-700'
    }
  ]

  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-6xl">🎉</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Special Offers & Deals
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Save more on your healthcare needs with our exclusive coupon codes
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {offers.map((offer) => (
            <div key={offer.id} className="card p-0 overflow-hidden hover:scale-105 transition-all duration-300">
              {/* Header with gradient */}
              <div className={`bg-gradient-to-r ${offer.color} text-white p-6`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-2xl font-bold">{offer.discount}</h3>
                  <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold">
                    LIMITED
                  </span>
                </div>
                <h4 className="text-lg font-semibold mb-1">{offer.title}</h4>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {offer.description}
                </p>

                <div className="space-y-2 mb-4">
                  {offer.minOrder > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Min. order: ₹{offer.minOrder}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Valid until: {new Date(offer.validUntil).toLocaleDateString()}
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-center">
                    <span className="font-mono font-bold text-lg text-gray-900 dark:text-white">
                      {offer.code}
                    </span>
                  </div>
                  <button
                    onClick={() => copyCode(offer.code)}
                    className="px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all font-semibold shadow-lg"
                  >
                    {copiedCode === offer.code ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How to Use */}
        <div className="card p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
            How to Use Coupon Codes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Choose Your Offer</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select and copy the coupon code that suits your needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Add to Cart</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add medicines to your cart and proceed to checkout
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Apply & Save</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Paste the code at checkout and enjoy instant savings
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Offers
