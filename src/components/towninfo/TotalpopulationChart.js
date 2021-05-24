import { Line } from "vue-chartjs";

export default {
  extends: Line,

  props: ["populations", "dongs", "chartoptions"],
  methods: {
    renderLineChart() {
      this.renderChart(
        {
          labels: this.dongs,
          datasets: [
            {
              label: "거래액",
              backgroundColor: "#f87979",
              data: this.populations,
            },
          ],
        },
        { responsive: true, maintainAspectRatio: false }
      );
    },
  },
  mounted() {
    this.renderLineChart();
  },
  // 바뀔때마다 다시 호출 ..
  name: "TotalpopulationChart",
  //    data 한번만 실행 후 computed 실행. -> props로 데이터 받고 watch로 감시하기
  watch: {
    selectedHouseDealAmount: function () {
      this.$data._chart.destroy();
      //console.log("야옹");
      this.renderLineChart();
    },
  },
};
