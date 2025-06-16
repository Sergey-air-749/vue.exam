<template>
  <router-view></router-view>
  <Footer v-if="isLoginPage == true" :url="urlfullPath"/>
</template>

<script>
import Footer from './components/footer.vue'
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
export default {
  setup() {

    const route = useRoute();
    let urlfullPath = ref('')

    let isLoginPage = computed(() => {

      urlfullPath = route.fullPath
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
      urlfullPath,
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
