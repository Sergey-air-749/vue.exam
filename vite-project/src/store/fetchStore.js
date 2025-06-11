import { defineStore } from "pinia";


export const useCartStore = defineStore("count", {
    state: () => ({
        cartItems: []
    }),
    getters: {
        totalItems: (state) => state.cartItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: (state) => state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    },
    actions: {
        addToCart(product) {
            const existing = this.cartItems.find(item => item.id === product.id)

            if (existing) {
                existing.quantity++
            } else {
                this.cartItems.push({...product, quantity: 1})
            }
        },
        removeFromCart(id) {
            this.cartItems = this.cartItems.filter(item => item.id != id)
        }
    }
})