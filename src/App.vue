<script setup>
import { onMounted, reactive, ref } from "@vue/runtime-core";
import { a } from "./svgoi.js";

let data = reactive({
  resultArr: []
});
function changeFile(e) {
  for (let i = 0; i < e.target.files.length; i++) {
    let resultObj = {}
    let file = e.target.files[i];
    resultObj.downloadName = file.name;
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (evt) {
      let result = a(evt.target.result);
      resultObj.content = result;
      resultObj.href = URL.createObjectURL(
        new Blob([result], { type: "image/svg+xml" })
      );
      data.resultArr.push(resultObj);
    };
  }
}
function delItem(index) {
  data.resultArr.splice(index, 1);
}
function downloadAll() {
  for(let i = 0; i < data.resultArr.length; i++){
    let downLink = document.createElement('a')
    downLink.download = data.resultArr[i].downloadName
    downLink.href = data.resultArr[i].href
    // 链接插入到页面
    document.body.appendChild(downLink)
    downLink.click()
    // 移除下载链接
    document.body.removeChild(downLink)
  }
}
function copy(index) {
  let tag = document.createElement('input')
  tag.setAttribute('id', 'tag')
  tag.value = data.resultArr[index].content
  document.body.appendChild(tag)
  document.getElementById('tag').select()
  document.execCommand('copy')
  document.body.removeChild(tag)
}
function download(index) {
  let downLink = document.createElement('a')
  downLink.download = data.resultArr[index].downloadName
  downLink.href = data.resultArr[index].href
  // 链接插入到页面
  document.body.appendChild(downLink)
  downLink.click()
  // 移除下载链接
  document.body.removeChild(downLink)
}
</script>

<template>
  <input
    type="file"
    name="svg"
    id="svgsetting"
    accept="image/svg+xml"
    @change="changeFile($event)"
    multiple
  />
  <button @click="downloadAll">下载全部内容</button>
  <ul class="ul">
    <li v-for="(item, index) in data.resultArr" :key="index" class="li">
      <div class="item">
        <span>{{ item.downloadName }}</span>
        <div class="content">
          <code>{{ item.content }}</code>
        </div>
        <div class="footer">
          <button @click="delItem(index)" class="button">删除</button>
          <a href="javascript:" class="copy" title="复制" @click="copy(index)"><svg width="20" height="20"><use xlink:href="#icon-copy"></use></svg></a>
          <a href="javascript:" class="download" title="下载" @click="download(index)"><svg width="20" height="20"><use xlink:href="#icon-file-download"></use></svg></a>
        </div>
      </div>
    </li>
  </ul>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px 0;
}
#svgsetting {
  width: 200px;
}
.ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  .li {
    list-style-type: none;
    margin-top: 10px;
    width: 50%;
    .item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .content {
        width: 100%;
        border: 1px solid;
        height: 100px;
        overflow: auto;
        text-align: left;
        padding: 5px;
        margin: 5px 0;
      }
      .footer {
        display: flex;
        align-items: center;
        .copy, .download{
          display: inline-block;
          height: 20px;
          margin-left: 10px;
          fill: #2486ff;
        }
        .button {
          width: 50px;
        }
        .link {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
