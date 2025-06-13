<template>
    <div class="contenire">
        <TotalBalanceBlock />

        <Homepanel/>


        


    </div>  
</template>

<script>
import { ref, toRef } from 'vue'
import TotalBalanceBlock from './TotalBalance.vue'
import Homepanel from './homepanel.vue'
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
        Homepanel
    } 
}
</script>

<style>

    .contenire {
        overflow: hidden;
        height: 100vh;
    }

</style>