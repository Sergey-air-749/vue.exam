<template>
  <router-view></router-view>
  <Footer v-if="isLoginPage == true"/>
</template>

<script>
import Footer from './components/footer.vue'
import { computed } from 'vue';
import { useRoute } from 'vue-router';
export default {
  setup() {

    const route = useRoute();

    const isLoginPage = computed(() => {

      if (isLoginPage != '/login' || isLoginPage != '/registration') {
        console.log(route.fullPath);
        return false
      }

      return true
    });

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
