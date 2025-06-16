<template>
    <div class="contenire">


        <TotalBalanceBlock @open-popup="openTransactionPopUp"/>

        <div class="panelBackground">

            <div class="panel">


            <div class="expensesOnMainCategoriesBlock">

                <div class="headPanel">
                    <h3>Все категории</h3>

                    <button type="button" class="allCategorieButton" @click="openNewCategoryPopUp()">
                        <svg xmlns="http://www.w3.org/2000/svg" height="27px" viewBox="0 -960 960 960" width="27px" fill="#c9eaff"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    </button>
                </div>
                

                <div class="allCategories">


                    <div class="itemCategori" v-for="(item, index) in allUserCategories" :key="index">

                        <div class="itemCategoriInfo">
                            <h3>{{ item.name }}</h3>

                            <span v-if="item.type == 'expense'">
                                Расход
                            </span>

                            <span v-else-if="item.type == 'income'">
                                Доход
                            </span>
                        </div>

                        <div class="itemCategoriСommand" v-if="item.isDefault == false">
                            <button class="itemCategoriDeleteButton" @click="itemCategoriDeleteButton(item.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                            </button>
                        </div>


                    </div>


                </div>

            </div>


            </div>

        </div>


        <TransactionPopUp v-if="showTransactionPopUp" :transaction-type="transactionType" @close-popup="closeTransactionPopUp" />



        <div class="newCategoriesBackground" v-if="showNewCategoriesPopUp">

            <div class="newCategories">

                <form class="newCategoriesForm" id="newCategoriesForm" @submit.prevent="onSubmit()">

                    <div class="titleBox">
                        <h3>Добавить категорию</h3>

                        <button type="button" class="closePopupButton" @click="closeNewCategoryPopUp()">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                        </button>
                    </div>

                    <div class="inputsNewCategori">
                        <input type="text" v-model="name" placeholder="Название категории" name="name" id="name" required>
                        <input type="text" v-model="typeName" @click="showCategoryType" placeholder="Тип категориям" name="type" id="type" readonly required>

                        <div class="allCategory" v-if="showNewCategoriesTabType != false">
                            <button type="button" @click="selectNewCategoryType('income')" class="newCategoriesTypeItem">Доход</button>
                            <button type="button" @click="selectNewCategoryType('expense')" class="newCategoriesTypeItem">Расход</button>
                        </div>
                
                        <p class="error">{{ error }}</p>
                    </div>

                    <div class="buttonsNewCategori">
                        <button type="submit">Добавить</button>
                    </div>
                </form>

                <!-- <p>{{ exampleStore.getWalletBalance }}</p> -->

            </div>

        </div>

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
        const allUserCategories = ref('');

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

        const getAllUserCategories = async () => {
            const data = await exampleStore.getAllUserCategories()
            allUserCategories.value = data
        }

        getAllUserCategories()





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
            allUserCategories,
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

            exampleStore
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


        async itemCategoriDeleteButton(Id) {           

            const response = await this.exampleStore.deleteCategori(Id)
            console.log(response.message); 
            
            if (response.message == 'Successful') {
                this.allUserCategories = response.updatedCategories            
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


    .itemCategoriDeleteButton {
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

    .expensesOnMainCategoriesBlock {
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






    .allCategories {
        display: flex;
        flex-direction: column;
    }

    .itemCategori {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 25px 10px;
        border-bottom: 1px solid #dedede;
    }

    .itemCategori .itemCategoriInfo {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .itemCategori .itemCategoriСommand {
        
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