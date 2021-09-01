<template>
  <div class="loan-page">
    <div class="input-container">
      <div>
        <div>贷款总额</div>
        <a-input v-model='total' placeholder="贷款总额" />
        <div>合计总还款</div>
        <span>{{allPay}}</span>
      </div>
      <div>
        <div>月供</div>
        <a-input v-model='loan' placeholder="月供" />
        <div>总还款利息</div>
        <span>{{allPayFee}}</span>
      </div>
      <div>
        <div>月供本金</div>
        <a-input v-model='pay' placeholder="月供本金" />
        <div><b>利率一定高于</b></div>
        <span><b>{{allRate}}</b></span>
      </div>
      <div>
        <div>月供利息</div>
        <a-input v-model='payFee' placeholder="月供利息" />
      </div>
      <div>
        <div>总期数</div>
        <a-input v-model='month' placeholder="总期数" />
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
      key: 'index'
    },
    {
      title: '还款时间',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: '还款本金',
      dataIndex: 'sum',
      key: 'sum'
    },
    {
      title: '还款利息',
      dataIndex: 'fee',
      key: 'fee'
    },
    {
      title: '提前还款额',
      dataIndex: 'allSum',
      key: 'allSum'
    },
    {
      title: '实际利率(%)',
      dataIndex: 'rate',
      key: 'rate'
    }
  ]
//     const data = [{
//   index: 1,
//   date: '2021/2/10',
//   sum: 23667,
//   fee: this.fee,
//   allSum: (1420000 - 23667) + 4970,
//   rate: (4970 + 4970) / 1420000 * 12 * 100
// }]

export default {
  name: 'loan',
  data() {
    return {
      total: 1420000,
      fee: 4970,
      loan: 28637,
      pay: 23667,
      payFee: 4970,
      allPay: 28637 * 60,
      allPayFee: 4970 * 60,
      allRate: (4970 * 60) / (1420000 / 2) * 12 / 60 * 100,
      month: 60,
      columns,
      dataSource: []
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
      this.allPay = this.loan * this.month;
      this.allPayFee = this.allPay - this.total;
      this.allRate = this.allPayFee / (this.allPay / 2) * 12 / this.month * 100 ;
      // 1.02(10 5000)   0.839(10 12000) 0.83(10 28637) 0.47(10 6000)  0.15(3 6019.3)  0.08(3 5936)  0.443(3 1500)
      let lastMoney = this.total - this.pay
      let avgMoney = (lastMoney + this.total + this.pay) / 2
      let item = {
        index: 1,
        date: '2021/2/10',
        sum: this.pay,
        fee: this.fee,
        allSum: (this.total - this.pay) + this.fee,
        rate: (this.fee + this.fee) / avgMoney * 12 * 100
      }
      let itemAll = []
      itemAll.push({ ...item })
      for (let i = 2; i < 5 * 12 + 1; i++) {
        if (i == this.month) {
          let lastMoney = this.total - this.pay * this.month
          let avgMoney = (lastMoney + this.total + this.pay) / 2
          itemAll.push({
            index: this.month,
            date: '2026/2/10',
            sum: this.pay,
            fee: this.fee,
            allSum: this.total - this.pay * this.month,
            rate: this.fee * this.month / avgMoney * 12 / this.month * 100
          })
          continue
        }
        item.index = i
        let dateArr = item.date.split('/')
        if (dateArr[1] < 12) {
          dateArr[1] = +dateArr[1] + 1
        } else {
          dateArr[0] = +dateArr[0] + 1
          dateArr[1] = 1
        }
        item.date = dateArr.join('/')
        item.allSum = item.allSum - this.pay
        let lastMoney = item.allSum - this.fee
        let avgMoney = (lastMoney + this.total + this.pay) / 2
        let allFee = this.fee * item.index + this.fee
        item.rate = allFee / avgMoney * 12 / item.index * 100
        let tempItem = { ...item }
        itemAll.push(tempItem)
      }
      this.dataSource = itemAll
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
      width: 100px;
    }
  }

  .btn-container {
    margin-top: 21px;
  }
}

</style>
