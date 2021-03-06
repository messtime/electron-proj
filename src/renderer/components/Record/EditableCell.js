var time = null;  //  在这里定义time 为null

export default {
  template: `
      <div class="editable-cell">
        <div v-if="editable" class="editable-cell-input-wrapper ">
            <a-textarea ref="textZone" :value="value"  :autoSize='true'  @keydown="keydown" @change="handleChange"  @blur="check"  placeholder="请输入"  />

        </div>
        <div v-else class="editable-cell-text-wrapper"
        @click="edit"    @dblclick="double"  v-html="value || ' '">
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
      var tempValue = value.replace(/target="_file">/,`target="_blank" onclick="openFile(event)">`)

      this.value = tempValue;
    },
    addNewLine(e) {
      // 1.获取光标位置
      const ele = e.target;
      const cursorIndex = ele.selectionStart;

      // 2.光标后加入换行符
      let temp_text = this.value.split("");
      temp_text.splice(cursorIndex, 0, "\n");
      this.value = temp_text.join("");

      // 3.移动光标
      this.$nextTick(() => {
        ele.selectionStart = ele.selectionEnd = cursorIndex + 1;
      });
    },
    keydown(e) {
      if (e.altKey && e.keyCode == 13) {
        //  this.value += '\n';
        //  this.value = this.value +'\n';
        this.addNewLine(e);
      } else if (e.keyCode == 13) {
        this.check(e);
      }
    },
    check() {
      this.editable = false;
      this.$emit("change", this.value);
    },
    double(e) {
      clearTimeout(time);  //首先清除计时器

      // pasteText.focus();
      this.editable = true;
      var _this= this;
      // this.$refs.textZone.target.focus();
      setTimeout(()=>{
        _this.$refs.textZone.focus();

        document.execCommand("paste");
        _this.$refs.textZone.blur();

      },10)

    },
    edit() {
      clearTimeout(time);  //首先清除计时器
      time = setTimeout(() => {
      this.editable = true;
      }, 200);
    },
  },
};
