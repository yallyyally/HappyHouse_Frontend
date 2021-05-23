<template>
    <div>
        <line-chart :chartdata= "chartData" :options= "chartOptions" :key= "cnt"/>

    </div>
</template>
<script>
import LineChart from './LineChart.js'
import { mapGetters } from "vuex";

export default {

    name:'HousedealChart',
components : { LineChart },
    computed:{
        ...mapGetters(['cnt'])
    },
//    data 한번만 실행 후 computed 실행.
    
    props:['selectedHouseDealAmount','selectedHouseDealDate'],
     data(){
        return {
    chartData: {
      labels: this.selectedHouseDealDate,
      //['January', 'February'],
      datasets: 
       [
         {
           label: '거래액',
           backgroundColor: '#f87979',
           data: this.selectedHouseDealAmount
         }
      ]
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false
    }
  }},

//   mounted () {
//     this.renderChart(this.chartdata, this.options)
//   }
}
</script>