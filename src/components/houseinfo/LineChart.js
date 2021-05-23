import { Line } from "vue-chartjs";
export default {
  extends: Line,
  props: ["chartdata", "options"],
  name: "LineChart",
  mounted() {
    this.renderChart(this.chartdata, this.options);
    console.log("렌더링 시작");
  },
};
