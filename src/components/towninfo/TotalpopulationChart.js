import { Bar } from "vue-chartjs";

export default {
  extends: Bar,

  props: ["populations", "dongs", "chartoptions", "barColor"],
  methods: {
    renderLineChart() {
      this.renderChart(
        {
          labels: this.dongs,
          datasets: [
            {
              label: "인구",
              backgroundColor: this.barColor,
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
