<template>
  <div
    id="echartsWordcloud"
    style="width: 510px; height: 400px; border: 1px solid; padding-top: 20px"
  ></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    word: {
      type: Array,
    },
  },
  mounted() {
    let newWord = [];
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i]) {
        newWord.push(this.word[i]);
      }
    }
    this.initEcharts(newWord);
  },
  methods: {
    initEcharts(data) {
      let echartsWordcloud = this.$echarts.init(
        document.getElementById("echartsWordcloud")
      );
      let option = {
        title: {
          text: "聊天词云",
          x: "center",
        },
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 20,
            //用来调整字的大小范围
            sizeRange: [20, 40],

            rotationRange: [0, 0],

            textStyle: {
              fontFamily: "微软雅黑",
              color: function () {
                var colors = [
                  "#fda67e",
                  "#81cacc",
                  "#cca8ba",
                  "#88cc81",
                  "#82a0c5",
                  "#fddb7e",
                  "#735ba1",
                  "#bda29a",
                  "#6e7074",
                  "#546570",
                  "#c4ccd3",
                ];
                return colors[parseInt(Math.random() * (colors.length - 1))];
              },
            },

            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "90%",
            height: "80%",
            //数据
            data: data,
          },
        ],
      };
      echartsWordcloud.setOption(option);
    },
  },
};
</script>