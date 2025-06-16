import { defineStore } from "pinia";

export const useFetchStore = defineStore("fetch", {
    state: () => ({
        userId: localStorage.getItem('userId'),
        userData: null,
        categoriesIncome: [],
        categoriesExpense: [],
        transactionsArr: '1234567890',
    }),
    getters: {
        getWalletBalance: (state) => state.userData.walletBalance,
        getEmail: (state) => state.userData.email,
    },
    actions: {
        async getUserData() {

            try {

                const response = await fetch('http://localhost:3000/api/user/' + this.$state.userId)

                if (response.ok) {       
                    const data = await response.json()
                    console.log(data);
                    this.userData = data
                    return data
                } else {
                    throw new Error('Network response was not ok');
                }

            } catch (error) {
                console.log(error);
                return error
            }
           
        },

        async newTransaction(tranInfo) {

            try {
                const response = await fetch('http://localhost:3000/api/transactions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(tranInfo)
                })

                if (response.ok) {       
                    const data = await response.json()
                    console.log(data);
                    this.transactionsArr = data.transactions
                    console.log(this.$state.transactionsArr);
                    return data
                } else {
                    throw new Error('Network response was not ok');
                }

            } catch (error) {
                console.log(error);
                return error
            }
            

            // this.userId = data.userId
            // localStorage.setItem('userId', data.userId)
        },


        async deleteTransaction(transactionId) {

            try {
                const response = await fetch(`http://localhost:3000/api/transactions/${transactionId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                })

                if (response.ok) {       
                    const data = await response.json()
                    console.log(data);
                    this.getUserData()
                    return data
                } else {
                    throw new Error('Network response was not ok');
                }

            } catch (error) {
                console.log(error);
                return error
            }
        },



        async getTransaction() {

            try {
                const response = await fetch('http://localhost:3000/api/transactions/' + this.$state.userId)

                if (response.ok) {       
                    const data = await response.json()
                    console.log(data);

                    this.transactionsArr = data
                    console.log(this.$state.transactionsArr);
                    return data
                } else {
                    throw new Error('Network response was not ok');
                }

            } catch (error) {
                console.log(error);
                return error
            }
            

            // this.userId = data.userId
            // localStorage.setItem('userId', data.userId)
        },


        async newCategori(newCategoriArr) {

            try {
                const response = await fetch('http://localhost:3000/api/categories/' + this.$state.userId, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(newCategoriArr)
                })

                if (response.ok) {       
                    const data = await response.json()
                    console.log(data);
                    return data
                } else {
                    throw new Error('Network response was not ok');
                }

            } catch (error) {
                console.log(error);
                return error
            }
        },


        async deleteCategori(categoriId) {

            try {
                const response = await fetch(`http://localhost:3000/api/categories/${this.$state.userId}/${categoriId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                })

                if (response.ok) {       
                    const data = await response.json()
                    console.log(data);
                    return data
                } else {
                    throw new Error('Network response was not ok');
                }

            } catch (error) {
                console.log(error);
                return error
            }
        },


        async getCategoriesExpense() {
            
            try {
                const response = await fetch('http://localhost:3000/api/categories/type/expense/' + this.$state.userId)

                if (response.ok) {
                    const data = await response.json()
                    console.log(data);

                    return data
                } else {
                    throw new Error('Network response was not ok');
                }

            } catch (error) {
                console.log(error);
            }
            
        },


        async getCategoriesIncome() {
            
           try {
                const response = await fetch('http://localhost:3000/api/categories/type/income/' + this.$state.userId)

                if (response.ok) {
                    const data = await response.json()
                    console.log(data);

                    return data
                } else {
                    throw new Error('Network response was not ok');
                }

            } catch (error) {
                console.log(error);
            }
            
        },




        async getDefaultCalculation() {
            try {

                const response = await fetch('http://localhost:3000/api/transactions/defaultcalculation/' + this.$state.userId)

                if (response.ok) {
                    const data = await response.json()
                    console.log(data);
                    return data

                } else {
                    throw new Error('Network response was not ok');
                }  
            } catch (error) {
                console.log(error);
            }
            
        },

        async getAllUserCategories() {
            try {
                const response = await fetch('http://localhost:3000/api/categories/' + this.$state.userId)

                if (response.ok) {
                    const data = await response.json()
                    console.log(data);

                    return data
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.log(error);
                return error
            }
            
        },




        async registration(user) {

            try {
                const response = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(user)
                })

                if (response.ok) {       
                    const data = await response.json()
                    console.log(data);

                    this.userId = data.userId
                    localStorage.setItem('userId', data.userId)
                } else {
                    throw new Error('Network response was not ok');
                }

            } catch (error) {
                console.log(error);
                return error
            }
            

        },

        
        async login(user) {
            try {
                const response = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(user)
                })

                if (response.ok) {   
                    const data = await response.json()
                    console.log(data);

                    this.userId = data.userId
                    localStorage.setItem('userId', data.userId)
                } else {
                    throw new Error('Network response was not ok');
                }

            } catch (error) {
                console.log(error);
                return error
            }

        },



        async getUserAnalitic() {
            try {
                const response = await fetch('http://localhost:3000/api/analytics/summary/' + this.$state.userId)

                if (response.ok) {
                    const data = await response.json()
                    console.log(data);

                    return data
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.log(error);
                return error
            }
            
        },
    }
})