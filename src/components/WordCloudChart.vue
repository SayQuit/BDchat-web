<template>
  <div id="echartsWordcloud" style="width:510px;height:400px;border:1px solid"></div>
</template>
<script>

export default{
data() {
  return {

  }
},
props:{
  word:{
    type:Array,
  }
},
mounted(){
  // let rotate=(parseInt(Math.random() * 4))*90;
  // console.log(rotate);
  this.initEcharts(this.word)
},
methods:{
  initEcharts(data){

      let echartsWordcloud = this.$echarts.init(document.getElementById("echartsWordcloud"));
      let option = {
        title: {
          text: "聊天词云",
          x: "center"
        },
        // backgroundColor: "#fff",
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize:20,
            //用来调整字的大小范围
            sizeRange: [20, 40],
            
            rotationRange: [0, 0],

            textStyle: {
                fontFamily: '微软雅黑',
                color: function () {
                    var colors = ['#fda67e', '#81cacc', '#cca8ba', "#88cc81", "#82a0c5", '#fddb7e', '#735ba1', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
                    return colors[parseInt(Math.random() * (colors.length-1))];
                }
              },

            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "120%",
            height: "150%",
            //数据
            data: data
          }
        ]
      };
      echartsWordcloud.setOption(option);
      echartsWordcloud.on("click",function(e){
        alert(e)
      })
  }
}
}
</script>