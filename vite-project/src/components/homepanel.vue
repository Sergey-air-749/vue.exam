<template>

  <div class="panelBackground">

    <div class="panel">


      <div class="expensesOnMainCategoriesBlock">

        <h3>Траты на основные категории</h3>

        <div class="expensesOnMainCategories">

        </div>

      </div>


    </div>

  </div>

</template>

<script>
import { ref, toRef } from 'vue';
import { useFetchStore } from '../stores/fetch';
export default {
    setup() {
      const exampleStore = useFetchStore()

      console.log(exampleStore.userId);
      exampleStore.getUserData()


      return {
        exampleStore
      }

    }
}
</script>

<style>

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


.expensesOnMainCategoriesBlock {
  display: flex;
  flex-direction: column;
  padding: 25px 15px;
  gap: 20px;
}

.expensesOnMainCategories {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 100px 100px;
}


</style>