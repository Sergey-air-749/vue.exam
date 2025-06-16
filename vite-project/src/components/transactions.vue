<template>
    <div class="contenire">


        <TotalBalanceBlock @open-popup="openTransactionPopUp"/>

        <div class="panelBackground">

            <div class="panel">


            <div class="expensesOnMainTransactionsBlock">

                <div class="headPanel">
                    <h3>Все транзакции</h3>
                </div>
                

                <div class="allTransactions">


                    <div class="itemTransaction" v-for="(item, index) in exampleStore.transactionsArr" :key="index">

                        <div class="itemTransactionInfo">
                            <span>Сума: <span class="itemTransactionSelectLine">{{ item.amount }}</span> </span>
                            <span>Дата: <span class="itemTransactionSelectLine">{{ item.date }}</span> </span>

                            <span v-if="item.type == 'income'">Тип: <span class="itemTransactionSelectLine">Доход</span> </span>
                            <span v-if="item.type == 'expense'">Тип: <span class="itemTransactionSelectLine">Расход</span> </span>

                            <span>Категория: <span class="itemTransactionSelectLine">{{ item.category }}</span> </span>
                            <span>Описание: <span class="itemTransactionSelectLine">{{ item.description }}</span> </span>
                        </div>

                        <div class="itemTransactionСommand">
                            <button class="itemTransactionDeleteButton" @click="itemTransactionDeleteButton(item._id)">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                            </button>
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
    setup(props, { emit }) {

        const exampleStore = useFetchStore()
        const router = useRouter();

        const name = ref('')
        const type = ref('')
        const typeName = ref('')

        const showTransactionPopUp = ref(false);
        const transactionType = ref('');
        const getAllUserTransaction = ref([]);

        const showNewCategoriesPopUp = ref(false)
        const showNewCategoriesTabType = ref(false)
        
        const error = ref('')

        if (localStorage.getItem('userId') == null) {
            router.replace('/login');
        }

        const showCategoryType = () => {
            if (showNewCategoriesTabType.value == true) {
                showNewCategoriesTabType.value = false
            } else {
                showNewCategoriesTabType.value = true
            }

            console.log(showNewCategoriesTabType.value);
        }

        const selectNewCategoryType = (typeCategory) => {
            type.value = typeCategory

            if (type.value == 'income') {
                typeName.value = 'Даход'
                showCategoryType()

            } else if (type.value == 'expense') {
                typeName.value = 'Расход'
                showCategoryType()

            } else {
                console.log('Неверный тип категории');
            }

            console.log(type.value);
        }

        const getAllTransaction = async () => {
            const data = await exampleStore.getTransaction()
            getAllUserTransaction.value = data
            console.log(exampleStore.transactionsArr);
            
        }

        getAllTransaction()





        const openTransactionPopUp = (type) => {
            transactionType.value = type;
            showTransactionPopUp.value = true;
        };

        const closeTransactionPopUp = () => {
            showTransactionPopUp.value = false;
            transactionType.value = ''; 
        };

        const openNewCategoryPopUp = () => {
            showNewCategoriesPopUp.value = true;
        };

        const closeNewCategoryPopUp = () => {
            showNewCategoriesPopUp.value = false;
            transactionType.value = ''; 
        };

        return {
            name,
            type,
            typeName,
            error,
            getAllUserTransaction,
            showTransactionPopUp,
            transactionType,
            openTransactionPopUp,
            closeTransactionPopUp,

            showNewCategoriesPopUp,
            showNewCategoriesTabType,
            openNewCategoryPopUp,
            closeNewCategoryPopUp,

            showCategoryType,
            selectNewCategoryType,

            exampleStore,
            getAllTransaction
        }

    },
    components: {
        TotalBalanceBlock,
        TransactionPopUp
    },
    methods: {

        async onSubmit() {
            const arr = { 
                name: this.name,
                type: this.type, 
            }

            console.log(arr);

            const response = await this.exampleStore.newCategori(arr)
            console.log(response.message); 
            
            if (response.message == 'Successful') {
                this.closeNewCategoryPopUp()
                this.allUserCategories = response.categories            
            } else {
                this.error = response
                console.log(response);
            }
        },

        // удаление транзакции

        async itemTransactionDeleteButton(Id) {           

            const response = await this.exampleStore.deleteTransaction(Id)
            console.log(response.message); 
            
            if (response.message == 'Successful') {
                this.getAllTransaction()      
            } else {
                this.error = response
                console.log(response);
            }
        }

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






    .allTransactions {
        display: flex;
        flex-direction: column;
    }

    .itemTransaction {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 25px 10px;
        border-bottom: 1px solid #dedede;
    }

    .itemTransaction .itemTransactionInfo {
        display: flex;
        flex-direction: column;
        gap: 10px;
        color: #676767;
    }

    .itemTransaction .itemTransactionSelectLine {
        /* font-weight: 600; */
        color: #000000;
    }







    .newCategoriesBackground {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        height: 100vh;
        width: 100%;
        backdrop-filter: blur(80px);
    }

    .newCategoriesForm {
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 15px;
        width: 380px;
        background-color: #ffffff;
        border: 1.5px solid rgb(172, 172, 172);
        border-radius: 10px;
    }


    .titleBox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 10px 0px 10px;
    }

    .inputsNewCategori {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .closePopupButton {
        background: none;
        border: none;
    }

    .inputsNewCategori input {
        padding: 10px 15px;
        background-color: #ffffff;
        border: 1.5px solid rgb(172, 172, 172);
        border-radius: 10px;
    }

    .allCategory {
        background-color: #ffffff;
        border: 1.5px solid rgb(172, 172, 172);
        border-radius: 10px;
    }

    .newCategoriesTypeItem {
        text-align: start;
        width: 100%;
        padding: 10px;
        background: none;
        border: none;
        border-bottom: 1.5px solid rgb(172, 172, 172);
        font-size: 14px;
    }

    .buttonsNewCategori {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .buttonsNewCategori button {
        padding: 10px 15px;
        background-color: #0073ff;
        border: 1.5px solid #0073ff;
        border-radius: 10px;
        font-weight: 600;
        color: #ffffff;
        width: 100%;
    }

    .error {
        color: rgb(185, 0, 0);
    }

</style>