<template>
    <div class="contenire">


        <TotalBalanceBlock @open-popup="openTransactionPopUp"/>

        <div class="panelBackground">

            <div class="panel">


            <div class="expensesOnMainCategoriesBlock">

                
                <h3>Траты на основные категории</h3>

                <div class="expensesOnMainCategories">

                    <div class="mainСategories">
                        <div class="mainСategoriesIcon">
                            <svg xmlns="http://www.w3.org/2000/svg" class="mainСategoriesIconColor" height="70px" viewBox="0 -960 960 960" width="70px"><path d="M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366h-80Zm400 0v-320H560v-280q0-83 58.5-141.5T760-880v800h-80Z"/></svg>
                        </div>

                        <div class="mainСategoriesInfo">
                            <span>Еда:</span>
                            <h3><span class="colorRed">-{{ defaultcalculation.togetherFood }}</span></h3>
                        </div>
                    </div>

                    <div class="mainСategories">
                        <div class="mainСategoriesIcon">
                            <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 -960 960 960" width="70px" class="mainСategoriesIconColor"><path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"/></svg>                        
                        </div>

                        <div class="mainСategoriesInfo">
                            <span>Зарплата:</span>
                            <h3><span class="colorGreen">+{{ defaultcalculation.togetherSalary }}</span></h3>
                        </div>
                    </div>

                    <div class="mainСategories">
                        <div class="mainСategoriesIcon">
                            <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 -960 960 960" width="70px" class="mainСategoriesIconColor"><path d="M240-200v40q0 17-11.5 28.5T200-120h-40q-17 0-28.5-11.5T120-160v-320l84-240q6-18 21.5-29t34.5-11h440q19 0 34.5 11t21.5 29l84 240v320q0 17-11.5 28.5T800-120h-40q-17 0-28.5-11.5T720-160v-40H240Zm-8-360h496l-42-120H274l-42 120Zm-32 80v200-200Zm100 160q25 0 42.5-17.5T360-380q0-25-17.5-42.5T300-440q-25 0-42.5 17.5T240-380q0 25 17.5 42.5T300-320Zm360 0q25 0 42.5-17.5T720-380q0-25-17.5-42.5T660-440q-25 0-42.5 17.5T600-380q0 25 17.5 42.5T660-320Zm-460 40h560v-200H200v200Z"/></svg>
                        </div>

                        <div class="mainСategoriesInfo">
                            <span>Транспорт:</span>
                            <h3><span class="colorRed">-{{ defaultcalculation.togetherTransport }}</span></h3>
                        </div>
                    </div>

                    <div class="mainСategories">
                        <div class="mainСategoriesIcon">
                            <svg xmlns="http://www.w3.org/2000/svg" height="70px" viewBox="0 -960 960 960" width="70px" class="mainСategoriesIconColor"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
                        </div>

                        <div class="mainСategoriesInfo">
                            <span>Жилье:</span>
                            <h3><span class="colorRed">-{{ defaultcalculation.togetherHousing }}</span></h3>
                        </div>
                    </div>


                    


                </div>

            </div>


            </div>

        </div>


        <TransactionPopUp v-if="showTransactionPopUp" :transaction-type="transactionType" @close-popup="closeTransactionPopUp" />


    </div>  
</template>

<script>
import { ref, toRef } from 'vue'
import TotalBalanceBlock from './TotalBalance.vue'
import TransactionPopUp from './transactionPopUp.vue'
import { useFetchStore } from '../stores/fetch';
import { useRouter } from 'vue-router';
export default {
    setup() {

        const exampleStore = useFetchStore()

        const router = useRouter();
        const showTransactionPopUp = ref(false);
        const transactionType = ref('');
        const defaultcalculation = ref('')

        if (localStorage.getItem('userId') == null) {
            router.replace('/login');
        }


        const getDefaultCalculation = async () => {
            const data = await exampleStore.getDefaultCalculation()
            defaultcalculation.value = data 
        }

        getDefaultCalculation()





        const openTransactionPopUp = (type) => {
            transactionType.value = type;
            showTransactionPopUp.value = true;
        };

        const closeTransactionPopUp = () => {
            getDefaultCalculation()
            showTransactionPopUp.value = false;
            transactionType.value = ''; 
        };

        return {
            defaultcalculation,
            showTransactionPopUp,
            transactionType,
            openTransactionPopUp,
            closeTransactionPopUp
        }

    },
    components: {
        TotalBalanceBlock,
        TransactionPopUp
    } 
}
</script>

<style>

    .contenire {
        /* overflow: hidden; */
        height: 100vh;
    }



    .panelBackground {
        height: 67vh;
        background-color: rgb(201, 234, 255);
    }

    .panel {
        display: flex;
        flex-direction: column;
        height: 67vh;
        background-color: rgb(255, 255, 255);
        border-radius: 20px 20px 0px 0px;
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

    .expensesOnMainCategoriesBlock {
        display: flex;
        flex-direction: column;
        padding: 25px 15px;
        gap: 20px;
    }

    .expensesOnMainCategories {
        display: grid;
        justify-content: center;
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