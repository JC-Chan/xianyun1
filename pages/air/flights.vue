<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <div>
          <!-- 航班列表 -->
          <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";

export default {
  data() {
    return {
      //航班总数据
      flightsData: {},
      //航班列表数据,用于循环 flightsItem 组件,单独出来是因为要分页
      dataList: []
    };
  },
  components: {
    FlightsListHead,
    FlightsItem
  },
  methods: {
    //获取航班总数据
    getData() {
      this.$axios({
        url: `airs`,
        params: this.$route.query //来自 URL 的5个参数
      }).then(res => {
        this.flightsData = res.data;
        this.dataList = this.flightsData.flights;
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>