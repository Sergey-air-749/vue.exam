<template>

  <div class="footerPanrl">
    <router-link class="footerLink" to="/">Главное</router-link>
    <router-link class="footerLink" to="/">Категории</router-link>
    <router-link class="footerLink" to="/">Транзакция</router-link>
  </div>

</template>

<script>
import { useTemplateRef, onMounted, toRef, watch } from 'vue'
import { useRoute } from 'vue-router';
export default {
    setup() {

        const currentRoute = useRoute();

        console.log(currentRoute.path);
        console.log(currentRoute.fullPath);

        onMounted(() => {
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
    
    }
}
</script>

<style>

.footerPanrl {
    width: 100%;
    display: flex;
    justify-content: space-around;
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