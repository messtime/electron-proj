<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd">
      Add
    </a-button>
    <a-table bordered :data-source="dataSource" :columns="columns">
      <template slot="name" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)" />
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)"
        >
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
const EditableCell = {
  template: `
      <div class="editable-cell">
        <div v-if="editable" class="editable-cell-input-wrapper">
          <a-input :value="value" @change="handleChange" @pressEnter="check" /><a-icon
            type="check"
            class="editable-cell-icon-check"
            @click="check"
          />
        </div>
        <div v-else class="editable-cell-text-wrapper">
          {{ value || ' ' }}
          <a-icon type="edit" class="editable-cell-icon" @click="edit" />
        </div>
      </div>
    `,
  props: {
    text: String,
  },
  data() {
    return {
      value: this.text,
      editable: false,
    };
  },
  methods: {
    handleChange(e) {
      const value = e.target.value;
      this.value = value;
    },
    check() {
      this.editable = false;
      this.$emit('change', this.value);
    },
    edit() {
      this.editable = true;
    },
  },
};
export default {
  components: {
    EditableCell,
  },
  data() {
    return {
      dataSource: [
        {
          key: '0',
          name: 'P系列乘客电梯',
          age: 'GSM',
          address: '250',
        },
        {
          key: '1',
          name: 'P系列乘客电梯',
          age: 'GSW',
          address: '450',
        },
      ],
      count: 2,
      columns: [
        {
          title: '梯形',
          dataIndex: 'name',
          width: '30%',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '系列',
          dataIndex: 'age',
        },
        {
          title: '载重（kg）',
          dataIndex: 'address',
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ],
    };
  },
  methods: {
    onCellChange(key, dataIndex, value) {


      const dataSource = [...this.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    onDelete(key) {

      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.key !== key);
    },
    handleAdd() {
      const { count, dataSource } = this;
      const newData = {
        key: count,
        name: `梯形${count}`,
        age: 'GSM',
        address: `速度${count}`,
      };
      this.dataSource = [...dataSource, newData];
      this.count = count + 1;
    },
  },
};
</script>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>
