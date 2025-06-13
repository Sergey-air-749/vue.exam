<template>

  <div class="TotalBalanceBlock" id="TotalBalanceBlock">
    <span>Доступно:</span>
    <h2>{{ userData.walletBalance }}</h2>
  </div>

</template>

<script>
import { ref, toRef } from 'vue'
import { useCounterStore } from '@/stores/counter'
export default {
    setup() {
        
        const userId = ref('')
        const userData = ref([])

        const exampleStore = useCounterStore()

        userId.value = localStorage.getItem('userId')

        console.log(userId.value);

        async function getUsreData() {
            const response = await fetch('http://localhost:3000/api/user/' + userId.value)
            const data = await response.json()
            console.log(data);
            userData.value = data
        }

        getUsreData()

        return {
            userData
        }

    }
}
</script>

<style>

</style>