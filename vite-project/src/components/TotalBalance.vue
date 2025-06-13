<template>

  <div class="TotalBalanceBlock" id="TotalBalanceBlock">

    <div class="WalletBalanceinfo">
        <span>Доступно:</span>
        <h1>{{ exampleStore.getWalletBalance }}</h1>
    </div>
   

    <div class="buttonsForTransactionsLine">
        <button type="button">Прибавить</button>
        <button type="button">Отнять</button>
    </div>

  </div>

</template>

<script>
import { ref, toRef } from 'vue';
import { useFetchStore } from '../stores/fetch';
export default {
    setup() {
        const exampleStore = useFetchStore()

        console.log(exampleStore.userId);
        exampleStore.getUserData()


        return {
            exampleStore
        }

    }
}
</script>

<style>

.TotalBalanceBlock {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 70px 30px 20px 30px;
    background-color: rgb(201, 234, 255);
    color: rgb(0, 115, 255);;
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