<template>
  <div class="tiny-container">
    <div v-show="!showFavorite" class="TinyMCE">
      <!-- TinyMCE：一款易用、且功能强大的所见即所得的富文本编辑器 -->
      <div class="line"></div>
      <editor
        v-model="tinymceHtml"
        id="tinymce"
        api-key="no-api-key"
        :disabled="editorOptions.disabled"
        :init="editorOptions.editorInit"
        output-format="html"
        @onChange="handleChange"
      />

      <!-- 预览 -->
      <div class="preview" v-if="false">
        {{ tinymceHtml ? tinymceHtml : "预览html结构" }}
      </div>
      <a-button class="copy-btn" @click="copyToClip">
        Copy
      </a-button>
      <a-button class="clean-btn" @click="clean">
        Clean
      </a-button>
      <a-button class="favorite-btn" @click="favorite">
        Favorite
      </a-button>
    </div>
    <div v-show="showFavorite" class="add-input">
      <div class="line"></div>

      <div>
        <a-table bordered :data-source="dataSource1" :columns="columns1">
          <template slot="paste" slot-scope="text, record">
            <a href="javascript:;" @click="copyClip(record.key)">√</a>
          </template>
          <template slot="age" slot-scope="text, record">
            <editable-cell
              :text="text"
              @change="onCellChange(record.key, 'age', $event, 1)"
            />
          </template>
          <template slot="operation" slot-scope="text, record">
            <a-popconfirm
              v-if="dataSource1"
              title="Sure to delete?"
              @confirm="() => onDelete(record.key, 1)"
            >
              <a href="javascript:;">X</a>
            </a-popconfirm>
          </template>
          <template slot="footer" slot-scope="text, record">
            <a-button class="editable-add-btn" @click="handleAdd(1)">
              Add
            </a-button>
            <a-button class="favorite-btn" @click="favorite">
              Html
            </a-button>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";

import "tinymce/icons/default/icons"; // 解决了icons.js 报错Unexpected token '<'
// 引入富文本编辑器主题的js和css
import "tinymce/themes/silver/theme.min.js";
import "tinymce/skins/ui/oxide/skin.min.css";
// 扩展插件
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/image";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/wordcount";
import EditableCell from "./Record/EditableCell.js";

export default {
  name: "TinyMCE",
  components: {
    Editor,
    EditableCell,
  },
  data() {
    return {
      showFavorite: false,

      tinymceHtml: "",
      dataSource1: [
        {
          key: "1",
          age: "data",
        },
      ],
      columns1: [
        {
          title: "",
          dataIndex: "paste",
          width: "3%",
          scopedSlots: { customRender: "paste" },
        },
        {
          title: "link",
          dataIndex: "age",
          width: "18%",

          scopedSlots: { customRender: "age" },
        },
        {
          title: "",
          dataIndex: "operation",
          width: "3%",
          scopedSlots: { customRender: "operation" },
        },
      ],
      // 编辑器初始化配置
      editorOptions: {
        disabled: false, // 编辑器是否只读
        editorInit: {
          selector: "#tinymce", // 容器
          language_url: "/static/tinymce/langs/zh_CN.js",
          language: "zh_CN",
          skin_url: "/static/tinymce/skins/ui/oxide", // 主题
          height: 320,
          plugins: "link lists image code table wordcount", // 用到的插件：链接、列表、图片、代码块、表格、字数
          toolbar:
            "undo redo | bold italic underline strikethrough | formatselect fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | link unlink table image | removeformat", // 工具栏
          images_upload_handler: (blobInfo, success, failure) => {
            // 图片上传
            console.log(blobInfo, success, failure, "上传图片====--==-");
            const img = "data:image/jpeg;base64," + blobInfo.base64();
            success(img);
            // this.handleImgUpload(blobInfo, success, failure)
          },
          statusbar: true, // 底部的状态栏
          menubar: false, // 最上方的菜单
          branding: false, // 水印“Powered by TinyMCE”
          max_height: 500,
          min_height: 300,
        },
      },
    };
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    handleChange(e, editor) {
      console.log(e, editor, "===change事件");
    },
    onCellChange(key, field, value, type) {
      this.dataSource1[key - 1][field] = value;
      localStorage.setItem("favorite", JSON.stringify(this.dataSource1));
    },

    handleAdd(type) {
      let newData = {};
      newData = {
        key: this.dataSource1.length + 1,
        age: "",
      };
      this.dataSource1.push(newData);
      localStorage.setItem("favorite", JSON.stringify(this.dataSource1));
    },
    clean() {
      this.tinymceHtml = "";
    },
    favorite() {
      this.showFavorite = !this.showFavorite;
    },
    copyClip(key, message) {
      var content = this.dataSource1[key - 1].age;
      var aux = document.createElement("input");
      aux.setAttribute("value", content);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      if (message == null) {
        // alert("复制成功");
        this.$message.success("复制成功");
      } else {
        this.$message.error(`复制失败`);

        // alert(message);
      }
    },
    onDelete(key) {
      var dataTemp = this.dataSource1;
      for (let i = dataTemp.length; i > key; i--) {
        dataTemp[i - 1].key = i - 1;
      }
      dataTemp.splice(key - 1, 1);
      const data = [...dataTemp];
      this.dataSource1 = [];
      setTimeout(() => {
        this.dataSource1 = data;
        localStorage.setItem("agent", JSON.stringify(this.dataSource1));
      }, 1);
    },
    copyToClip(content, message) {
      content = this.tinymceHtml;
      var aux = document.createElement("input");
      aux.setAttribute("value", content);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      if (message == null) {
        // alert("复制成功");
        this.$message.success("复制成功");
      } else {
        this.$message.error(`复制失败`);

        // alert(message);
      }
    },
    // 图片上传
    // handleImgUpload (blobInfo, success, failure) {
    //   this.baseUrl = process.env.VUE_APP_BASE_URL
    //   const imgBase64 = `data:${blobInfo.blob().type};base64,${blobInfo.base64()}`
    //   const data = { img: [imgBase64] }
    //   uploadImgage (data).then(res => {
    //     // 传入success回调里的数据就是富文本编辑器里插入图片的src的值
    //     success(`${this.baseUrl}/${res.data[0]}`)
    //   }).catch(() => { failure('error') })
    // }
  },
};
</script>

<style lang="scss">
.tiny-container {
  width: 100%;

  .TinyMCE {
    width: 100%;
    margin: 0 auto;
    .line {
      position: relative;
      top: -17px;
      width: calc(100% + 20px);
      border-bottom: 1px solid #ddd;
      left: -20px;
    }
    .preview {
      min-height: 200px;
      max-height: 400px;
      overflow-y: auto;
      margin: 25px auto;
      border: 1px solid #ccc;
      padding: 8px;
      word-wrap: break-word;
    }
    .copy-btn {
      margin-top: 28.5px;
      margin-right: 8px;
    }
    .clean-btn {
      margin-top: 28.5px;
    }
    .favorite-btn {
      margin-top: 28.5px;
      float: right;
    }
  }
  .add-input {
    width: 100%;
    .line {
      position: relative;
      top: -17px;
      width: calc(100% + 20px);
      border-bottom: 1px solid #ddd;
      left: -20px;
    }
    
    .ant-table-row-cell-break-word {
      text-align: center;
    }
    .add-btn {
      float: right;
      right: 136px;
    }
    .favorite-btn {
      float: right;
    }
  }
}
</style>
