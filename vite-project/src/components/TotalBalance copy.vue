<template>

  <div class="TotalBalanceBlock" id="TotalBalanceBlock">
    <span>Доступно:</span>
    <h2>{{ userData.walletBalance }}</h2>
  </div>

</template>

<script>
import { ref, toRef } from 'vue'
export default {
    setup() {
        
        const userId = ref('')
        const userData = ref([])

        const exampleStore = useCounterStore()

        userId.value = localStorage.getItem('userId')

        console.log(userId.value);

        const getUsreData = async () => {

          const data = await exampleStore.getUsreData()
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