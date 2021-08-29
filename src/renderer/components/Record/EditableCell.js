export default {
  template: `
      <div class="editable-cell">
        <div v-if="editable" class="editable-cell-input-wrapper ">
            <a-textarea :value="value"  :autosize='true'  @keydown="keydown" @change="handleChange"  @blur="check"  placeholder="请输入"  />

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
    addNewLine(e) {
      // 1.获取光标位置
      const ele = e.target
      const cursorIndex = ele.selectionStart
 
      // 2.光标后加入换行符
      let temp_text = this.value.split('')
      temp_text.splice(cursorIndex, 0, '\n')
      this.value = temp_text.join('')
 
      // 3.移动光标
      this.$nextTick(() => {
        ele.selectionStart = ele.selectionEnd = cursorIndex + 1
      })
    },
    keydown(e) {
      
      if(e.altKey && e.keyCode  == 13) {
      //  this.value += '\n';
      //  this.value = this.value +'\n';
      this.addNewLine(e)
      } else if ( e.keyCode  == 13){
        this.check(e);
      }
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
