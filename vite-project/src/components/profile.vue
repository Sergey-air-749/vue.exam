<template>
    <div class="contenire">
        <div class="panelBackground">

            <div class="panel">


            <div class="expensesOnMainTransactionsBlock">

                <div class="headPanel">
                    <h3>Профиль</h3>

                    <button type="button" @click="profilelogOutButton()" class="profilelogOutButton" id="profilelogOutButton">Выход</button>
                </div>
                

                <div class="profileBlock">

                    <div class="profile" v-if="userData == null">

                        <h3>Загрузка...</h3>

                    </div>


                    <div class="profile" v-if="userData != null">

                        <div class="profileInfoIconBlock">
                            <img :src="userData.avatar" alt="userIcon" class="userIcon">
                        </div>

                        <div class="profileInfoBlock">

                           <span>Почта: <span class="userEmail profileInfoSelectLine">{{ userData.email }} </span></span>
                           <span>Баланс: <span class="userWalletBalance profileInfoSelectLine">{{ userData.walletBalance }} </span></span>

                           <!-- <h3 class="profileInfoSelectLine">Аналитика</h3>

                           <span>Доход: <span class="userEmail profileInfoSelectLine colorGreen">+{{ userAnalitic.incomeTotal }} </span></span>
                           <span>Pасход: <span class="userWalletBalance profileInfoSelectLine colorRed">-{{ userAnalitic.expenseTotal }} </span></span> -->

                        </div>

                    </div>

                </div>

                <div class="headPanel">
                    <h3>Аналитика</h3>
                </div>


                <div class="profileBlock">

                    <div class="profile" v-if="userAnalitic == null">

                        <h3>Загрузка...</h3>

                    </div>


                    <div class="profile" v-if="userAnalitic != null">

                        <div class="analiticInfoBlock">
                           <span>Доход: <span class="userEmail profileInfoSelectLine colorGreen">+{{ userAnalitic.incomeTotal }} </span></span>
                           <span>Pасход: <span class="userWalletBalance profileInfoSelectLine colorRed">-{{ userAnalitic.expenseTotal }} </span></span>
                        </div>

                        <div class="TotalBalanceChart">
                            <BarChart />
                        </div>

                    </div>

                </div>
                

            </div>

            </div>

        </div>

        <Transition name="bounce">  
            <TransactionPopUp v-if="showTransactionPopUp" :transaction-type="transactionType" @close-popup="closeTransactionPopUp" />
        </Transition>


    </div>  


</template>

<script>
import { onMounted, ref, toRef } from 'vue'
import TotalBalanceBlock from './TotalBalance.vue'
import TransactionPopUp from './transactionPopUp.vue'
import { useFetchStore } from '../stores/fetch';
import { useRouter } from 'vue-router';

import BarChart from './BarChart.vue'

export default {
    setup(props, { emit }) {

        const exampleStore = useFetchStore()
        const router = useRouter();

        const userData = ref(null)
        const userAnalitic = ref(null)

        const error = ref('')

        if (localStorage.getItem('userId') == null) {
            router.replace('/login');
        }




        const getUserData = async () => {
            const data = await exampleStore.getUserData()
            console.log(data);
            
            userData.value = await data
            console.log(userData.value);
        }

        getUserData()


        const getUserAnalitic = async () => {
            const data = await exampleStore.getUserAnalitic()
            console.log(data);
            
            userAnalitic.value = await data
            console.log(userAnalitic.value);
        }

        getUserAnalitic()



        const profilelogOutButton = async () => {
            localStorage.removeItem('userId')
            router.replace('/login');
        }




        return {
            error,
            userData,
            userAnalitic,
            getUserData,
            profilelogOutButton,

            exampleStore, 
        }

    },
    components: {
        TotalBalanceBlock,
        TransactionPopUp,
        BarChart
    }
}
</script>

<style>

    .contenire {
        /* overflow: hidden; */
        height: 100vh;
    }



    .headPanel {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 3px 10px 0px 10px;
    }

    .allCategorieButton {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        background-color: #0073ff;
        border: none;
        border-radius: 200px;
    }


    .itemTransactionDeleteButton {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        background-color: #e70000;
        border: none;
        border-radius: 200px;
    }





    .panelBackground {
        height: 67vh;
        background-color: rgb(201, 234, 255);
        padding-top: 26px;
    }

    .panel {
        display: flex;
        flex-direction: column;
        height: 67vh;
        background-color: rgb(255, 255, 255);
        border-radius: 40px 40px 0px 0px;
    }


    .profile {
        display: flex;
        padding: 10px;
        padding-top: 20px;
        gap: 30px;
    }

    .profileInfoBlock {
        display: flex;
        flex-direction: column;
        gap: 10px;
        color: #676767;
    }

    .analiticInfoBlock {
        display: flex;
        flex-direction: column;
        gap: 20px;
        color: #676767;
    }

    .profileInfoSelectLine {
        color: #000;
    }

    .userIcon {
        width: 70px;
        height: 70px;
        border-radius: 100px;
    }


    .profilelogOutButton {
        width: 100px;
        padding: 7px 10px;
        background-color: #e70000;
        border: none;
        border-radius: 100px;
        font-weight: 600;
        color: #ffffff;
    }






    .mainСategoriesInfo {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        color: #0073ff;
    }

    .mainСategoriesIconColor {
        fill: #0073ff;
    }

    .expensesOnMainTransactionsBlock {
        display: flex;
        flex-direction: column;
        padding: 25px 15px;
        gap: 20px;
    }

    .expensesOnMainCategories {
        display: grid;
        grid-template-columns: 200px 200px;
        grid-template-rows: 100px 100px;
    }

    .mainСategories {
        display: flex;
        align-items: center;
        gap: 20px;
    }


    .colorGreen {
        color: green;
    }

    .colorRed {
        color: red;
    }



</style>