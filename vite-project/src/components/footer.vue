<template>

  <div class="footerPanrl">
    <router-link class="footerLink" id="home" to="/">Главное</router-link>
    <router-link class="footerLink" id="categories" to="/categories">Категории</router-link>
    <router-link class="footerLink" id="transactions" to="/transactions">Транзакция</router-link>
    <router-link class="footerLink" id="transactions" to="/profile">Профиль</router-link>
  </div>

</template>

<script>
import { useTemplateRef, onMounted, toRef, watch } from 'vue'
import { useRoute } from 'vue-router';
export default {
    setup(props) {

        const currentRoute = useRoute();

        console.log(currentRoute.path);
        console.log(currentRoute.fullPath);


        onMounted(() => {

            const home = document.querySelector('#home')
            const categories = document.querySelector('#categories')
            const transactions = document.querySelector('#transactions')

            const footerLinks = document.querySelectorAll('.footerLink')
            console.log(footerLinks);

            footerLinks.forEach(elementLink => {

                elementLink.addEventListener('click', (e) => {

                    footerLinks.forEach(element => {
                        element.classList.remove('select')
                    });

                    elementLink.classList.add('select')
                });

            });

        })

        return {
            useRoute
        }
    
    },
    props: {
        url: {
            type: String,
            required: true
        }
    }
}
</script>

<style>

.footerPanrl {
    width: 100%;
    display: flex;
    justify-content: space-around;
    backdrop-filter: blur(80px);
    position: fixed;
    padding: 15px;
    bottom: 0px;
}

.footerLink {
    text-decoration: none;
    color: #313131;
}

.select {
    color: #0073ff;
}

</style>