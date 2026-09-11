import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { supabase } from '../lib/supabase'

const CartContext = createContext({})

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)
  const [cartAnimation, setCartAnimation] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadCart()
    } else {
      // Load from localStorage for non-authenticated users
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    }
  }, [user])

  const loadCart = async () => {
    if (!user) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          medicine:medicines(*)
        `)
        .eq('user_id', user.id)

      if (error) throw error

      const formattedCart = data.map(item => ({
        id: item.medicine.id,
        name: item.medicine.name,
        price: item.medicine.price,
        image_url: item.medicine.image_url,
        quantity: item.quantity,
      }))

      setCart(formattedCart)
    } catch (error) {
      console.error('Error loading cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveToLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const addToCart = async (medicine, quantity = 1) => {
    setCartAnimation(true)
    setTimeout(() => setCartAnimation(false), 500)

    const existingItem = cart.find(item => item.id === medicine.id)

    let updatedCart
    if (existingItem) {
      updatedCart = cart.map(item =>
        item.id === medicine.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    } else {
      updatedCart = [
        ...cart,
        {
          id: medicine.id,
          name: medicine.name,
          price: medicine.price,
          image_url: medicine.image_url,
          quantity,
        },
      ]
    }

    setCart(updatedCart)

    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .upsert({
            user_id: user.id,
            medicine_id: medicine.id,
            quantity: existingItem ? existingItem.quantity + quantity : quantity,
          })

        if (error) throw error
      } catch (error) {
        console.error('Error adding to cart:', error)
      }
    } else {
      saveToLocalStorage(updatedCart)
    }
  }

  const updateQuantity = async (medicineId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(medicineId)
      return
    }

    const updatedCart = cart.map(item =>
      item.id === medicineId ? { ...item, quantity } : item
    )

    setCart(updatedCart)

    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('user_id', user.id)
          .eq('medicine_id', medicineId)

        if (error) throw error
      } catch (error) {
        console.error('Error updating quantity:', error)
      }
    } else {
      saveToLocalStorage(updatedCart)
    }
  }

  const removeFromCart = async (medicineId) => {
    const updatedCart = cart.filter(item => item.id !== medicineId)
    setCart(updatedCart)

    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
          .eq('medicine_id', medicineId)

        if (error) throw error
      } catch (error) {
        console.error('Error removing from cart:', error)
      }
    } else {
      saveToLocalStorage(updatedCart)
    }
  }

  const clearCart = async () => {
    setCart([])

    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)

        if (error) throw error
      } catch (error) {
        console.error('Error clearing cart:', error)
      }
    } else {
      localStorage.removeItem('cart')
    }
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cart,
    loading,
    cartAnimation,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
