import { defineStore } from "pinia";

export const useFetchStore = defineStore("fetch", {
    state: () => ({
        userId: localStorage.getItem('userId'),
        userData: {}
    }),
    getters: {
        getWalletBalance: (state) => state.userData.walletBalance,
        getEmail: (state) => state.userData.email,
    },
    actions: {
        async getUserData() {

            const response = await fetch('http://localhost:3000/api/user/' + localStorage.getItem('userId'))
            const data = await response.json()
            console.log(data);

            this.userData = data
        },

        async getCategories() {
            const response = await fetch('http://localhost:3000/api/user/' + localStorage.getItem('userId'))
            const data = await response.json()
            console.log(data);

            this.userData = data
        },

        async registration(user) {

            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            })
            const data = await response.json()
            console.log(data);

            this.userId = data.userId
            localStorage.setItem('userId', data.userId)
        },

        
        async login(user) {

            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            })
            const data = await response.json()
            console.log(data);

            this.userId = data.userId
            localStorage.setItem('userId', data.userId)
        }
    }
})