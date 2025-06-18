    <template>
  
    <div class="newTransactionBackground">

        <div class="newTransaction">

            <form class="newTransactionForm" id="newTransactionForm" @submit.prevent="onSubmit()">
                <div class="titleBox">
                    <h3>Новая транзакция</h3>
                    <button type="button" class="closePopupButton" @click="$emit('close-popup')">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    </button>
                </div>

                <div class="inputsNewTran">
                    <input type="number" v-model="amount" placeholder="Сума" name="amount" id="amount" required>
                    <input type="date" v-model="date" placeholder="ДД.ММ.ГГГГ" name="date" id="date" required>
                    <input type="text" v-model="category" @click="showCategory" placeholder="Категория" name="category" id="category" readonly required>

                    <Transition name="allCategoryShow">
                        <div class="allCategory" v-if="showCategoryStatus != false">

                            <button type="button" @click="showCategory" class="itemCategory closePopUp">

                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                                <span>Закрыть</span>

                            </button>

                            <button type="button" @click="itemCategoryButtonSelect(item.name)" class="itemCategory" v-for="(item, index) in categories" :key="index">
                                {{ item.name }}
                            </button>

                        </div>
                    </Transition>

                    <input type="text" v-model="description" placeholder="Короткое название" name="description" id="description" required>

                    <p class="error">{{ error }}</p>
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
    setup(props, {emit}) {
        

        const amount = ref('')
        const date = ref('')
        const category = ref('')
        const type = ref('')
        const description = ref('')

        const categories = ref([])

        const error = ref('')

        const showCategoryStatus = ref(false)
        const exampleStore = useFetchStore()

        const userId = exampleStore.userId
        console.log(userId);

        const showCategory = () => {
            if (showCategoryStatus.value == true) {

                showCategoryStatus.value = false
            } else {
                showCategoryStatus.value = true
            }

            console.log(showCategoryStatus.value);
        }

        const getCategoriesExpense = async () => {
        
            const data = await exampleStore.getCategoriesExpense()
            categories.value = data

        }

        const getCategoriesIncome = async () => {
           
            const data = await exampleStore.getCategoriesIncome()
            categories.value = data

        }

        const itemCategoryButtonSelect = (name) => {
            category.value = name
            console.log(name);
            showCategory()
            
        }

        console.log(props.transactionType);
        type.value = props.transactionType
        console.log( type.value );

        if (props.transactionType == 'expense') {
            getCategoriesExpense()
        } else if (props.transactionType == 'income') {
            getCategoriesIncome()
        }
        
        

        // console.log(exampleStore.getCategories);

        return {
            userId,
            categories,
            amount,
            date,
            description,
            exampleStore,
            category,
            showCategoryStatus,
            type,
            error,
            showCategory,
            itemCategoryButtonSelect
        }
    },
    props: {
        transactionType: {
            type: String,
            required: true
        }
    },
    methods: {

        async onSubmit() {
            const arr = { 
                userId: this.userId, 
                amount: this.amount,
                date: this.date, 
                category: this.category,
                type: this.type, 
                description: this.description
            }

            console.log(arr);

            const ret = await this.exampleStore.newTransaction(arr)
            console.log(ret.message); 
            
            if (ret.message == 'Successful') {
                this.$emit('close-popup')
                this.$emit('upDataTranArr')
                this.exampleStore.getUserData()
            } else {
                this.error = ret
                console.log(ret);
            }
        },

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
        backdrop-filter: blur(20px);
    }

    .newTransactionForm {
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 15px;
        width: 380px;
        background-color: #ffffff;
        border: 1.5px solid rgb(172, 172, 172);
        box-shadow: rgb(0 0 0 / 30%) 0px 5px 20px 0px;
        border-radius: 10px;
    }


    .titleBox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 10px 0px 10px;
    }

    .inputsNewTran {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .closePopupButton {
        background: none;
        border: none;
    }

    .inputsNewTran input {
        padding: 10px 15px;
        background-color: #ffffff;
        border: 1.5px solid rgb(172, 172, 172);
        border-radius: 100px;
    }

    .allCategory {
        position: absolute;
            overflow: scroll;
        top: 20px;
        left: 22px;
        width: 90%;
        height: 90%;
        background-color: #ffffff;
        border: 1.5px solid rgb(172, 172, 172);
        box-shadow: rgb(0 0 0 / 30%) 0px 5px 20px 0px;
        border-radius: 20px;
    }

    .itemCategory {
        text-align: start;
        width: 100%;
        padding: 10px;
        background: none;
        border: none;
        border-bottom: 1.5px solid rgb(172, 172, 172);
        font-size: 14px;
    }

    .closePopUp {
        display: flex;
        align-items: center;
        gap: 10px;
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
        border-radius: 100px;
        font-weight: 600;
        color: #ffffff;
        width: 100%;
    }

    .error {
        color: rgb(185, 0, 0);
    }
</style>