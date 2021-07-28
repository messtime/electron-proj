<template>
  <div class="main-page">
    <div class="title">字段修改页面</div>

    <div class="item" v-for="(fieldData, index) in fieldList" :key="index">
      <div class="label">{{ fieldData.title }}</div>
      <div class="select" v-show="fieldData.type == 1">
        <a-select v-model="fieldData.value" style="width: 250px">
          <a-select-option
            v-for="(data, index) in fieldData.dataList"
            :key="data + index"
          >
            {{ data.value || data }}
          </a-select-option>
        </a-select>
      </div>
      <div class="select" v-show="fieldData.type == 2" style="width: 250px">
        <a-input placeholder="Basic usage" />
      </div>
    </div>
    <div class="item">
      <div class="label">增加字段:</div>
      <!-- <div class="select">
        {{
          company +
            " " +
            type +
            " " +
            series +
            " " +
            load +
            " " +
            speed +
            " " +
            door
        }}
      </div> -->
      <a-button class="add-label" type="primary" @click="addField">
        增加字段
      </a-button>
      <a-button type="primary" @click="confirmStep">
        确认完成
      </a-button>
    </div>
    <div class="add-field" v-show="showAddField">
      <div class="label">字段名</div>
      <a-input placeholder="请输入" v-model="addTitle" style="width: 150px" />
      <div class="label">字段类型</div>
      <a-select v-model="addType" style="width: 150px">
        <a-select-option v-for="type in addTypeData" :key="type">
          {{ type }}
        </a-select-option>
      </a-select>
      <div
        class="add-item"
        v-show="addType == '下拉选项'"
        @click="addDataTolist"
      >
        +添加一个选项
      </div>
      <!-- <div class="item-list"> -->
      <!-- <div class="label">选项</div> -->
      <a-input
        class="new-list"
        placeholder="请输入选项内容"
        v-for="addData in addDataList"
        v-model="addData.value"
        style="width: 150px"
      />
      <!-- </div> -->
      <div class="btn-container">
        <a-button @click="cancel">取消</a-button>
        <a-button type="primary" @click="confirm">确认</a-button>
      </div>
    </div>
  </div>
</template>
<script>
const companyData = ["广州永日电梯有限公司"];
const typeData = [
  "P系列乘客电梯",
  "P系列观光电梯",
  "P系列病床电梯",
  "载货电梯",
  "家用电梯",
  "杂物电梯",
];
const typeNote = {
  P系列乘客电梯: "乘客用电梯",
  P系列观光电梯: "观光用乘客电梯，部分轿壁为玻璃结构",
  P系列病床电梯: "医院专用电梯，可载病床",
  载货电梯: "载货用垫铁，可载人和货物",
  家用电梯: "家用电梯",
  杂物电梯: "最大载重为300kh,速度为0.5m/s",
};
const seriesNote = {
  GSM: "低噪音，高节能，绿色环保节能型小机房",
  GSW: "低噪音，高节能绿色和环保节能型无机房",
  落地式: "请查看境界配置 word模板",
  窗口式: "请查看境界配置 word模板",
};
const seriesData = {
  1: ["GSM", "GSW"],
  2: ["落地式", "窗口式"],
};
const loadData = {
  1: [250, 320, 400, 450, 630, 825, 1050, 1250, 1350, 1600, 2000],
  2: [250, 320, 400, 450, 630, 825, 1050, 1250, 1350, 1600],
  3: [1600, 2000],
  4: [1000, 1600, 2000, 3000, 5000],
  5: [225, 320, 400],
};
const speedData = {
  1: [30, 60],
  2: [30, 60, 90],
  3: [30, 60, 90, 105],
  4: [60, 90, 105, 120, 150],
  5: [60, 90, 105, 120, 150, 180],
  6: [60, 90, 105, 120],
  7: [60, 90],
  8: [60, 90, 105],
  9: [24],
};
const doorData = {
  1: ["中分双扇门", "旁开双扇门"],
  2: ["中分四扇门", "中分六扇门", "旁开双扇门"],
  3: ["中分双扇门", "旁开双扇门", "手动门"],
};
export default {
  name: "step2",
  components: {},
  data() {
    return {
      companyData,
      typeData,
      seriesData,
      typeNote,
      seriesNote,
      speedData,
      loadData,
      doorData,

      fieldList: [
        {
          title: "梯形",
          type: 1,
          value: null,
          dataList: typeData,
        },
        {
          title: "系列",
          type: 1,
          value: null,

          dataList: seriesData,
        },
      ],
      showAddField: false,
      addType: "",
      addTitle: "",
      addTypeData: ["文本框", "下拉选项"],
      addDataList: [],
    };
  },
  methods: {
    open(link) {
      // this.localStorage
      this.$router.push("overview");

      // this.$electron.shell.openExternal('https://baidu.com');
    },

    addField() {
      this.showAddField = true;
    },
    confirm() {
      var addData = {
        title: this.addTitle,
        type: this.addType == "文本框" ? 2 : 1,
        value: null,

        dataList: this.addType == "文本框" ? [] : this.addDataList,
      };
      this.fieldList.push(addData);
      // if(this.addType == '文本框') {

      // } else {
      //   this
      // }
      this.showAddField = false;
    },
    confirmStep() {
      this.open();
    },
    cancel() {
      this.addDataList = [];
      this.addType = "";
      this.addTitle = "";
      this.showAddField = false;
    },
    addDataTolist() {
      this.addDataList.push({
        value: "",
      });
    },
  },
};
</script>
<style lang="scss">
.main-page {
  width: 850px;
  height: 550px;
  margin: 0px auto;
  padding-top: 50px;
  font-size: 20px;
}
.ant-select-selection-selected-value,
.ant-select-dropdown-menu-item {
  font-size: 18px !important;
}
.item {
  display: flex;
  margin: 20px;
  .label {
    width: 140px;
  }
  .select {
    width: 260px;
    margin-right: 20px;
  }
}
.add-label {
  margin-right: 75px;
}
.add-field {
  background: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  margin: 10px;
  padding-top: 10px;
  width: 200px;
  font-size: 14px;
  position: relative;
  left: 96px;
  .label {
    display: inline-block;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .btn-container {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .new-list {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .add-item {
    margin-top: 10px;
    margin-bottom: 10px;

    &:hover {
      color: #1890ff;
      cursor: pointer;
    }
  }
}
</style>
