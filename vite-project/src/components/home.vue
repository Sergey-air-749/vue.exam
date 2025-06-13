<template>
    <div class="contenire">


        <TotalBalanceBlock />

        <Homepanel />

        <TransactionPopUp />


    </div>  
</template>

<script>
import { ref, toRef } from 'vue'
import TotalBalanceBlock from './TotalBalance.vue'
import Homepanel from './homepanel.vue'
import TransactionPopUp from './transactionPopUp.vue'
import { useRouter } from 'vue-router';
export default {
    setup() {

        const router = useRouter();

        if (localStorage.getItem('userId') == null) {
            router.replace('/login');
        }

    },
    methods: {

    },
    components: {
        TotalBalanceBlock,
        Homepanel,
        TransactionPopUp
    } 
}
</script>

<style>

    .contenire {
        overflow: hidden;
        height: 100vh;
    }

</style>