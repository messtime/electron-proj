<template>
  <div class="main-page">
    <div class="title">选型向导v6.9.0</div>
    
    <div class="item">
      <div class="label">制造公司</div>
      <div class="select">
        <a-select v-model="company" style="width: 250px">
          <a-select-option v-for="company in companyData" :key="company">
            {{ company }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="item">
      <div class="label">梯形</div>
      <div class="select">
        <a-select
          v-model="type"
          style="width: 250px"
          @change="handleTypeChange"
        >
          <a-select-option v-for="type in typeData" :key="type">
            {{ type }}
          </a-select-option>
        </a-select>
      </div>
      <div class="note">{{ typeNote[type] }}</div>
    </div>
    <div class="item">
      <div class="label">系列</div>
      <div class="select">
        <a-select
          v-model="series"
          style="width: 250px"
          @change="handleSeriesChange"
        >
          <a-select-option v-for="series in seriesDataTemp" :key="series">
            {{ series }}
          </a-select-option>
        </a-select>
      </div>
      <div class="note">{{ seriesNote[series] }}</div>
    </div>
    <div class="item">
      <div class="label">载重（kg）</div>
      <div class="select">
        <a-select
          v-model="load"
          style="width: 250px"
          @change="handleLoadChange"
        >
          <a-select-option v-for="load in loadDataTemp" :key="load">
            {{ load }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="item">
      <div class="label">速度（m/min）</div>
      <div class="select">
        <a-select
          v-model="speed"
          style="width: 250px"
          @change="handleSpeedChange"
        >
          <a-select-option v-for="speed in speedDataTemp" :key="speed">
            {{ speed }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="item">
      <div class="label">开门方式</div>
      <div class="select">
        <a-select
          v-model="door"
          style="width: 250px"
          @change="handleDoorChange"
        >
          <a-select-option v-for="door in doorDataTemp" :key="door">
            {{ door }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="item">
      <div class="label">你的选项:</div>
      <div class="select">
        {{
          company +
            ' ' +
            type +
            ' ' +
            series +
            ' ' +
            load +
            ' ' +
            speed +
            ' ' +
            door
        }}
      </div>
      <a-button type="primary" @click="copy">
        点击复制
      </a-button>
    </div>
  </div>
</template>
<script>
const companyData = ['广州永日电梯有限公司'];
const typeData = [
  'P系列乘客电梯',
  'P系列观光电梯',
  'P系列病床电梯',
  '载货电梯',
  '家用电梯',
  '杂物电梯',
];
const typeNote = {
  P系列乘客电梯: '乘客用电梯',
  P系列观光电梯: '观光用乘客电梯，部分轿壁为玻璃结构',
  P系列病床电梯: '医院专用电梯，可载病床',
  载货电梯: '载货用垫铁，可载人和货物',
  家用电梯: '家用电梯',
  杂物电梯: '最大载重为300kh,速度为0.5m/s',
};
const seriesNote = {
  GSM: '低噪音，高节能，绿色环保节能型小机房',
  GSW: '低噪音，高节能绿色和环保节能型无机房',
  落地式: '请查看境界配置 word模板',
  窗口式: '请查看境界配置 word模板',
};
const seriesData = {
  1: ['GSM', 'GSW'],
  2: ['落地式', '窗口式'],
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
  1: ['中分双扇门', '旁开双扇门'],
  2: ['中分四扇门', '中分六扇门', '旁开双扇门'],
  3: ['中分双扇门', '旁开双扇门', '手动门'],
};
export default {
  name: 'step3',
  components: {},
  data() {
    return {
      company: '',
      type: '',
      series: '',
      companyData,
      typeData,
      seriesData,
      typeNote,
      seriesNote,
      seriesDataTemp: [],
      loadDataTemp: [],
      speedDataTemp: [],
      doorDataTemp: [],
      load: '',
      speed: '',
      door: '',
      speedData,
      loadData,
      doorData,
    };
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    handleTypeChange(value) {
      switch (value) {
        case '杂物电梯':
          this.seriesDataTemp = seriesData[2];
          break;
        default:
          this.seriesDataTemp = seriesData[1];
      }
      this.series = '';
      this.load = '';
      this.speed = '';
      this.door = '';
      this.loadDataTemp = [];
      this.speedDataTemp = [];
      this.doorDataTemp = [];
    },
    handleSeriesChange(value) {
      var data = this.type + value;
      switch (data) {
        case 'P系列乘客电梯GSM':
        case 'P系列观光电梯GSM':
          this.loadDataTemp = loadData[1];
          break;
        case 'P系列乘客电梯GSW':
        case 'P系列观光电梯GSW':
          this.loadDataTemp = loadData[2];
          break;
        case 'P系列病床电梯GSM':
        case 'P系列病床电梯GSW':
          this.loadDataTemp = loadData[3];
          break;
        case '载货电梯GSM':
        case '载货电梯GSW':
          this.loadDataTemp = loadData[4];
          break;
        case '家用电梯GSM':
        case '家用电梯GSW':
          this.loadDataTemp = loadData[5];
          break;
        default:
          this.loadDataTemp = loadData[1];
      }
      this.load = '';
      this.speed = '';
      this.door = '';
      this.speedDataTemp = [];
      this.doorDataTemp = [];
    },
    handleLoadChange(value) {
      var data = this.type + this.series + value;

      switch (data) {
        case 'P系列乘客电梯GSM250':
        case 'P系列乘客电梯GSM320':
        case 'P系列乘客电梯GSM400':
        case 'P系列乘客电梯GSW250':
        case 'P系列乘客电梯GSW320':
        case 'P系列乘客电梯GSW400':
        case 'P系列观光电梯GSM250':
        case 'P系列观光电梯GSM320':
        case 'P系列观光电梯GSM400':
        case 'P系列观光电梯GSW250':
        case 'P系列观光电梯GSW320':
        case 'P系列观光电梯GSW400':
        case '载货电梯GSM1000':
        case '载货电梯GSM1600':
        case '载货电梯GSM2000':
        case '载货电梯GSM3000':
        case '载货电梯GSM5000':
        case '载货电梯GSW1000':
        case '载货电梯GSW1600':
        case '载货电梯GSW2000':
        case '载货电梯GSW3000':
        case '载货电梯GSW5000':
          this.speedDataTemp = speedData[1];
          break;
        case 'P系列乘客电梯GSM450':
        case 'P系列乘客电梯GSW450':
          this.speedDataTemp = speedData[2];
          break;
        case 'P系列乘客电梯GSM630':
        case 'P系列乘客电梯GSW630':
          this.speedDataTemp = speedData[3];
          break;

        case 'P系列乘客电梯GSM825':
          this.speedDataTemp = speedData[4];
          break;
        case 'P系列乘客电梯GSM1050':
        case 'P系列乘客电梯GSM1250':
        case 'P系列乘客电梯GSM1350':
        case 'P系列乘客电梯GSM1600':
        case 'P系列乘客电梯GSM2000':
          this.speedDataTemp = speedData[5];
          break;
        case 'P系列乘客电梯GSW825':
        case 'P系列乘客电梯GSW1050':
        case 'P系列乘客电梯GSW1250':
        case 'P系列乘客电梯GSW1350':
        case 'P系列乘客电梯GSW1600':
        case 'P系列病床电梯GSM1600':
        case 'P系列病床电梯GSM2000':
        case 'P系列病床电梯GSW1600':
        case 'P系列病床电梯GSW2000':
          this.speedDataTemp = speedData[6];
          break;
        case 'P系列观光电梯GSM450':
        case 'P系列观光电梯GSW450':
          this.speedDataTemp = speedData[7];
          break;
        case 'P系列观光电梯GSM630':
        case 'P系列观光电梯GSM825':
        case 'P系列观光电梯GSM1050':
        case 'P系列观光电梯GSM1250':
        case 'P系列观光电梯GSM1350':
        case 'P系列观光电梯GSM1600':
        case 'P系列观光电梯GSM2000':
        case 'P系列观光电梯GSW630':
        case 'P系列观光电梯GSW825':
        case 'P系列观光电梯GSW1050':
        case 'P系列观光电梯GSW1250':
        case 'P系列观光电梯GSW1350':
        case 'P系列观光电梯GSW1600':
          this.speedDataTemp = speedData[8];
          break;

        case '家用电梯GSM225':
        case '家用电梯GSM320':
        case '家用电梯GSM400':
        case '家用电梯GSW225':
        case '家用电梯GSW320':
        case '家用电梯GSW400':
          this.speedDataTemp = speedData[9];
          break;
        default:
          this.speedDataTemp = speedData[9];
      }
      this.speed = '';
      this.door = '';
      this.doorDataTemp = [];
    },
    handleSpeedChange(value) {
      // var data = this.type + this.series + this.speed
      switch (value) {
        case '载货电梯GSM3000':
        case '载货电梯GSM5000':
        case '载货电梯GSW3000':
        case '载货电梯GSW5000':
          this.doorDataTemp = doorData[2];
          break;
        case '家用电梯GSM225':
        case '家用电梯GSM320':
        case '家用电梯GSM400':
        case '家用电梯GSW225':
        case '家用电梯GSW320':
        case '家用电梯GSW400':
          this.doorDataTemp = doorData[3];
          break;
        default:
          this.doorDataTemp = doorData[1];
      }
      this.door = '';
    },
    handleDoorChange(value) {},
    copy() {
      var content =
        this.company +
        ' ' +
        this.type +
        ' ' +
        this.series +
        ' ' +
        this.load +
        ' ' +
        this.speed +
        ' ' +
        this.door;
      var aux = document.createElement('input');
      aux.setAttribute('value', content);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand('copy');
      document.body.removeChild(aux);
      alert('复制成功');
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
</style>
