<template>
  <div class="flight-item">
    <div>
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{flight.airline_name}}</span>
          {{flight.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{flight.dep_time}}</strong>
              <span>{{flight.org_airport_name + flight.org_airport_quay}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{duration}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{flight.arr_time}}</strong>
              <span>{{flight.dst_airport_name + flight.dst_airport_quay}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{flight.base_price}}</span>起
        </el-col>
      </el-row>
    </div>
    <div class="flight-recommend">
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
            :key="index"
            v-for="(item,index) in flight.seat_infos"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{item.name}}</span>
              | {{item.supplierName}}
            </el-col>
            <el-col :span="5" class="price">￥{{item.settle_price_coupon}}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini">选定</el-button>
              <p>剩余：{{item.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   //数据
  //   data: {
  //     type: Object,
  //     //默认是空数组
  //     default: {}
  //   }
  // },
  props: ["flight"],
  computed: {
    duration() {
      //我们在这里计算航班飞行时间
      //我们可以直接在接口获取日期和时间的字符串
      //格式是:2019-12-13 00:20:00
      //可以直接作为参数创建一个日期对象
      //var date = new Date('2019-12-13 00:20:00')
      //时间戳 = date.getTime()
      var arr_timestamp = new Date(this.flight.arr_datetime).getTime();
      var dep_timestamp = new Date(this.flight.dep_datetime).getTime();
      var duration = arr_timestamp - dep_timestamp;

      //这里处理跨过凌晨的飞行航班问题
      if (duration < 0) {
        //跨过了凌晨,那么到达时间应该加上一天的毫秒数
        var msOfDay = 24 * 60 * 60 * 1000;
        duration = arr_timestamp + msOfDay - dep_timestamp;
      }
      var durationMinutes = duration / 1000 / 60;
      var hours = Math.floor(durationMinutes / 60);
      var minutes = durationMinutes % 60;
      return hours + "小时" + minutes + "分钟";
    }
  }
};
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>