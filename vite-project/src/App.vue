<template>
  <router-view></router-view>
  <Footer v-if="isLoginPage == true"/>
</template>

<script>
import Footer from './components/footer.vue'
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
export default {
  setup() {

    const route = useRoute();

    let isLoginPage = computed(() => {
      
      isLoginPage = route.fullPath

      if (isLoginPage == '/login' || isLoginPage == '/registration') {
        console.log(route.fullPath);
        return false
      }else {
        console.log(isLoginPage);
      }

      return true
    });

    console.log(isLoginPage);

    return {
      isLoginPage
    };
  },
  components: {
    Footer
  }
}
</script>

<style>

</style>
