<template>
  
    <div class="newTransactionBackground">

        <div class="newTransaction">

            <form class="newTransactionForm" id="newTransactionForm">
                <div class="titleBox">
                    <h3>Новая транзакция</h3>
                </div>

                <div class="inputsNewTran">
                    <input type="number" placeholder="Сума" name="amount" id="amount" required>
                    <input type="date" placeholder="ДД.ММ.ГГ" name="date" id="date" required>
                    <input type="text" @click="showCategory" placeholder="Категория" name="category" id="category" readonly required>

                    <div class="allCategory" v-if="showCategoryStatus != false">

                        <div class="itemCategory">
                            <span>1234</span>
                        </div>

                        <div class="itemCategory">
                            <span>1234</span>
                        </div>

                    </div>

                    <input type="text" placeholder="Описание" name="description" id="description" required>
                </div>

                <div class="buttonsNewTran">
                    <button type="submit">Сохранить</button>
                </div>
            </form>

            <!-- <p>{{ exampleStore.getWalletBalance }}</p> -->

        </div>

    </div>

</template>

<script>
import { useFetchStore } from '../stores/fetch';
import { ref, toRef } from 'vue'
export default {
    setup() {
        const showCategoryStatus = ref(false)
        const exampleStore = useFetchStore()

        const showCategory = () => {
            if (showCategoryStatus.value == true) {

                showCategoryStatus.value = false
            } else {
                showCategoryStatus.value = true
            }

            console.log(showCategoryStatus.value);
        }

        exampleStore.getUserData()
        // console.log(exampleStore.getCategories);

        return {
            exampleStore,
            showCategoryStatus,
            showCategory
        }
    }
}
</script>

<style>
    .newTransactionBackground {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        height: 100vh;
        width: 100%;
        backdrop-filter: blur(50px);
    }

    .newTransactionForm {
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
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px 10px 0px 10px;
    }

    .inputsNewTran {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .inputsNewTran input {
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

    .itemCategory {
        padding: 10px;
        border-bottom: 1.5px solid rgb(172, 172, 172);
        font-size: 14px;
    }

    .buttonsNewTran {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .buttonsNewTran button {
        padding: 10px 15px;
        background-color: #0073ff;
        border: 1.5px solid #0073ff;
        border-radius: 10px;
        font-weight: 600;
        color: #ffffff;
        width: 100%;
    }
</style>