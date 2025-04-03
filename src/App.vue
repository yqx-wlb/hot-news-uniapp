<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { ref } from "vue";

const theme = ref<"light" | "dark">("dark");

onLaunch(() => {
  console.log("App Launch");
  // 获取本地存储的主题
  const savedTheme = uni.getStorageSync("theme");
  theme.value = (savedTheme as "light" | "dark") || "dark";
});

onShow(() => {
  console.log("App Show");
});

onHide(() => {
  console.log("App Hide");
});
</script>

<style lang="scss">
@import "./uni.scss";

/* 全局样式 */
page,
view,
text,
image,
button,
input,
textarea {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

page {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
