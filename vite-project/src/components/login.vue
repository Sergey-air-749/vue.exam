<template>
  
  <div class="contenireFormLogReg">

    <form class="formReg" id="formReg" @submit.prevent="onSubmit">

        <h2 class="formTitle">Вход</h2>

        <div class="inputs">
            <input type="email" v-model="userEmail" placeholder="Почта" required name="inputEmail" id="inputEmail">
            <input :type="typeShowPassword" v-model="userPassword" placeholder="Пароль" required name="inputPassword" id="inputPassword">
            <button type="button" class="showPass" @click="showPass()">Показать пароль</button>
            <span class="error"></span>
        </div>

        <div class="buttons">
            <button class="buttonSubmit" type="submit">Войти</button>
            <router-link class="buttonGoLogin" to="/registration">Нет акаунта, регистрация</router-link>
        </div>

    </form>

  </div>

</template>

<script>
import { ref, toRef } from 'vue';
import { useFetchStore } from '../stores/fetch';
import { useRouter } from 'vue-router';
export default {
    setup() {

        const exampleStore = useFetchStore()
        const router = useRouter();

        const typeShowPassword = ref('password')
        const userEmail = ref('')
        const userPassword = ref('')


        return {
            exampleStore,
            router,
            typeShowPassword,
            userEmail,
            userPassword
        }

    },
    methods: {

        async onSubmit() {
            let user = {
                email: this.userEmail,
                password: this.userPassword
            };

            console.log(user);

            await this.exampleStore.login(user)
            await this.router.push('/');
        },

        showPass() {
            if (this.typeShowPassword == 'password') {
                this.typeShowPassword = 'text'
                console.log(event.target.textContent = 'Скрыть пароль');
            } else {
                this.typeShowPassword = 'password'
                console.log(event.target.textContent = 'Показать пароль');
            }

            console.log(this.typeShowPassword);
        }
    }
}
</script>

<style>

    .contenireFormLogReg {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        height: 80vh;
    }

    .formReg {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* width: 400px; */
        height: 400px;
        padding: 20px;
        border: 1.5px solid rgb(203, 203, 203);
        border-radius: 10px;
        gap: 30px;
    }

    .formTitle {
        padding: 20px 0px;
    }

    .inputs {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 10px;
    }

    .inputs input {
        width: 300px;
        padding: 10px 15px;
        background-color: #ffffff;
        border: 1.5px solid rgb(203, 203, 203);
        border-radius: 100px;
    }

    .showPass {
        background: none;
        border: none;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        padding: 20px 0px 0px 0px;
        gap: 20px;
    }

    .buttons .buttonSubmit {
        width: 300px;
        padding: 10px 15px;
        background-color: #0073ff;
        border: 1.5px solid #0073ff;
        border-radius: 100px;
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
    }

    .buttons .buttonGoLogin {
        color: #343434;
    }

</style>