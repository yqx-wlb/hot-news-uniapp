<template>
  <view class="webview-container">
    <web-view v-if="url" :src="url" @error="handleError"></web-view>
    <view v-else class="error-message">
      <text>{{ url + "11" }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface PageOptions {
  url?: string;
}

interface UniPage {
  $page: {
    options: PageOptions;
  };
}

const url = ref("");
const errorMessage = ref("");

const handleError = () => {
  errorMessage.value = "页面加载失败，请稍后重试";
};

onMounted(() => {
  try {
    const pages = getCurrentPages();
    console.log("aaaa");
    const page = pages[pages.length - 1] as UniPage;
    console.log("bbbb");
    const options = (page as any).options;
    console.log("cccc",page, options);

    if (!options.url) {
      errorMessage.value = "未找到有效链接";
      return;
    }

    const decodedUrl = decodeURIComponent(options.url);

    if (
      !decodedUrl.startsWith("http://") &&
      !decodedUrl.startsWith("https://")
    ) {
      errorMessage.value = "无效的链接格式";
      return;
    }

    url.value = decodedUrl;
  } catch (error) {
    console.error("Error loading webview:", error);
    errorMessage.value = "加载页面时出错";
  }
});
</script>

<style lang="scss" scoped>
.webview-container {
  width: 100%;
  height: 100vh;
  background-color: #ffffff;

  .error-message {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    text-align: center;
    color: #666;
    font-size: 28rpx;
  }
}
</style>
