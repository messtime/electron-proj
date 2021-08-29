export default {
  template: `
      <div class="editable-cell">
        <div v-if="editable" class="editable-cell-input-wrapper ">
            <a-textarea :value="value"  autosize='true' @enter="handleChange"   @change="handleChange"  @blur="check" placeholder="请输入"  />

        </div>
        <div v-else class="editable-cell-text-wrapper"  @click="edit">
          {{ value || ' ' }}
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
