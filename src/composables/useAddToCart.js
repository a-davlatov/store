export function useAddToCart(product, cart) {
  const alreadyAdded = cart.find(obj => obj.id === product.id)
  
  if (alreadyAdded) {
    cart = cart.map((cartproduct) => {
      
      if (cartproduct.id === product.id) {
        return {
          ...cartproduct,
          quantity: cartproduct.quantity += 1,
        }
      }

      return cartproduct
    })
    return
  }

  product.quantity = 1
  product.isAdded = true
  cart.push(product)
}