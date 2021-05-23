import { Line } from "vue-chartjs";

export default {
  extends: Line,

  props: ["selectedHouseDealAmount", "selectedHouseDealDate", "chartoptions"],
  methods: {
    renderLineChart() {
      this.renderChart(
        {
          labels: this.selectedHouseDealDate,
          datasets: [
            {
              label: "거래액",
              backgroundColor: "#f87979",
              data: this.selectedHouseDealAmount,
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
  name: "HousedealChart",
  //    data 한번만 실행 후 computed 실행. -> props로 데이터 받고 watch로 감시하기
  watch: {
    selectedHouseDealAmount: function () {
      this.$data._chart.destroy();
      //console.log("야옹");
      this.renderLineChart();
    },
  },
};
