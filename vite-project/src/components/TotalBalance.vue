<template>

  <div class="TotalBalanceBlock" id="TotalBalanceBlock">

    <div class="userInfo" v-if="exampleStore.userData != null">
        <div class="WalletBalanceinfo">
            <span>Доступно:</span>
            <h1>{{ exampleStore.userData.walletBalance }}</h1>
        </div>

        <div class="Emailinfo">
            <span>{{ exampleStore.userData.email }}</span>
        </div>
        
    </div>
   

    <div class="buttonsForTransactionsLine">
        <button type="button" @click="$emit('open-popup', 'income')">Прибавить</button>
        <button type="button" @click="$emit('open-popup', 'expense')">Отнять</button>
    </div>

  </div>

</template>

<script>
import { ref, toRef } from 'vue';
import { useFetchStore } from '../stores/fetch';
export default {
    setup(props, { emit }) {
        const exampleStore = useFetchStore()
        const userData = ref(null)

        console.log(exampleStore.userId);
        exampleStore.getUserData()

        const getUserData = async () => {
            const data = await exampleStore.getUserData()
            console.log(data);
            
            userData.value = await data
            console.log(userData.value);
        }

        getUserData()

        console.log(exampleStore.userData);
        

        return {
            exampleStore,
            userData
        }

    }
}
</script>

<style>

.TotalBalanceBlock {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 70px 30px 0px 30px;
    background-color: rgb(201, 234, 255);
    color: rgb(0, 115, 255);;
}

.userInfo {
    display: flex;
    justify-content: space-between;
    gap: 5px;
}

.WalletBalanceinfo {
    display: flex;
    flex-direction: column;
    gap: 5px;
}


.buttonsForTransactionsLine {
    display: flex;
    justify-content: space-between;
    border-radius: 100px;
    background-color: rgb(255, 255, 255);
    padding: 10px;
    gap: 20px;
}

.buttonsForTransactionsLine button {
    background-color: rgb(0 115 255);
    color: #ffffff;
    border: none;
    width: 450px;
    padding: 8px 0px;
    border-radius: 100px;
    font-weight: 600; 
}

</style>