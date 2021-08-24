<template>
  <div class="loan-page">
    <div class="input-container">
      <div>
        <div>贷款总额</div>
        <a-input v-model='total' placeholder="贷款总额" />
      </div>
      <div>
        <div>提前还费用</div>
        <a-input v-model='fee' placeholder="提前还费用" />
      </div>
      <div class="btn-container">
        <a-button type="primary" @click="compute"> 计算</a-button>
      </div>
    </div>
    <a-table :columns="columns" :data-source="dataSource">
      <div>data.total</div>
    </a-table>
  </div>
</template>
<script>
const
  columns = [{
      title: '期数',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: '还款时间',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '还款本金',
      dataIndex: 'sum',
      key: 'sum',
    },
    {
      title: '还款利息',
      dataIndex: 'fee',
      key: 'fee',
    },
    {
      title: '提前还款额',
      dataIndex: 'allSum',
      key: 'allSum',
    },
    {
      title: '实际利率(%)',
      dataIndex: 'rate',
      key: 'rate',
    }
  ]

const data = [{
  index: 1,
  date: '2021/2/10',
  sum: 23667,
  fee: 4970,
  allSum: (1420000 - 23667) + 4970,
  rate: (4970 + 4970) / 1420000 * 12 * 100,
}]


export default {
  name: 'loan',
  data() {
    return {
      total: 1420000,
      fee: 4970,
      columns,
      dataSource: [],
    }
  },
  methods: {
    pressEnter() {
      if (this.userInput == this.password) {
        this.goPage('/overview')
      } else {
        this.userInput = ''
      }
    },
    compute(link) {
      let lastMoney = this.total - 23667;
      let avgMoney = (lastMoney + this.total+ 23667) / 2;
      let item = {
        index: 1,
        date: '2021/1/10',
        sum: 23667,
        fee: 4970,
        allSum: (this.total - 23667) + this.fee,
        rate: (4970 + this.fee) / avgMoney * 12 * 100,
      }
      let itemAll = [];
      itemAll.push({ ...item });
      for (let i = 2; i < 5 * 12 + 1; i++) {
        if (i == 60) {
            let lastMoney = this.total - 23667 * 60;
            let avgMoney = (lastMoney + this.total+ 23667) / 2;
          itemAll.push({
            index: 60,
            date: '2026/2/10',
            sum: 23667,
            fee: 4970,
            allSum: this.total - 23667 * 60,
            rate: 4970 * 60 / avgMoney * 12 / 60 * 100,
          })
          continue;
        }
        item.index = i;
        let dateArr = item.date.split('/');
        if (dateArr[1] < 12) {
          dateArr[1] = +dateArr[1] + 1;
        } else {
          dateArr[0] = +dateArr[0] + 1;
          dateArr[1] = 1;
        }
        item.date = dateArr.join('/');
        item.allSum = item.allSum - 23667;
        let lastMoney = item.allSum - this.fee;
        let avgMoney = (lastMoney + this.total+ 23667) / 2;
        let allFee = 4970 * item.index + this.fee;
        item.rate = allFee / avgMoney * 12 / item.index * 100;
        let tempItem = { ...item };
        itemAll.push(tempItem)
      }
      this.dataSource = itemAll;
    }
  },
  mounted() {
    // this.compute();
  }
}

</script>
<style lang="scss">
.loan-page {
  margin-top: 20px;

  .input-container {
    display: flex;
    justify-content: space-evenly;

    .ant-input {
      width: 180px;
    }
  }

  .btn-container {
    margin-top: 21px;
  }
}

</style>
