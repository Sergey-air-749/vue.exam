<template>
  <Doughnut
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)
import { useFetchStore } from '../stores/fetch';
import { ref, computed } from 'vue';

export default {
  name: 'DoughnutChart',
  components: { Doughnut },
setup() {

    const exampleStore = useFetchStore()
    const userAnalitic = ref({incomeTotal: 0, expenseTotal: 0})

    const getUserAnalitic = async () => {
        const data = await exampleStore.getUserAnalitic()
        console.log(data);
        
        userAnalitic.value = await data
        console.log(userAnalitic.value.incomeTotal);

    }

    getUserAnalitic()

    const chartData = computed(() => {
        return {
            labels: [ 'Расход', 'Дохот' ],
            datasets: [{
                label: 'Data One',
                backgroundColor: ['#f54242', '#84f542'],
                data: [
                    userAnalitic.value.expenseTotal,
                    userAnalitic.value.incomeTotal,
                ],
            }],
        }
    })

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false
    }

    return {
        chartData,
        chartOptions
    }
    
  }
}
</script>