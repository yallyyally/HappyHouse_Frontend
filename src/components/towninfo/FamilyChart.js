import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: ["familyData"],
  methods: {
    renderLineChart() {
      this.renderChart(
        {
          labels: ["1인가구", "2인가구", "3인가구", "4인가구", "5인 이상 가구"],
          datasets: [
            {
              label: "가구수",
              backgroundColor: ["#9966cc", "#00ccff", "#ffcc00", "#ff6699", "#00cc33"],
              data: this.familyData,
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
  name: "FamilyChart",
  //    data 한번만 실행 후 computed 실행. -> props로 데이터 받고 watch로 감시하기
  watch: {
    familyData: function () {
      this.$data._chart.destroy();
      //console.log("야옹");
      this.renderLineChart();
    },
  },
};
