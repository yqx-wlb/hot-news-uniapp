<template>
  <view class="webview-container">
    <web-view v-if="url" :src="url" @error="handleError"></web-view>
    <view v-else class="error-message">
      <text>{{ errorMessage }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const url = ref("");
const errorMessage = ref("");

const handleError = (err: any) => {
  console.error("Webview error:", err);
  errorMessage.value = "页面加载失败，请稍后重试";
  uni.showToast({
    title: "页面加载失败",
    icon: "error",
  });
};

// 处理 URL 参数
const processUrl = (rawUrl: string): string => {
  try {
    const decodedUrl = decodeURIComponent(rawUrl);
    // 移除 URL 中的多余 amp; 标记
    return decodedUrl.replace(/&amp;/g, "&");
  } catch (error) {
    console.error("URL processing error:", error);
    return rawUrl;
  }
};

onMounted(() => {
  try {
    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
    const options = (page as any)?.options || {};

    if (!options.url) {
      errorMessage.value = "未找到有效链接";
      return;
    }

    const processedUrl = processUrl(options.url);

    // 验证 URL 格式
    if (
      !processedUrl.startsWith("http://") &&
      !processedUrl.startsWith("https://")
    ) {
      errorMessage.value = "无效的链接格式";
      return;
    }

    url.value = processedUrl;
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
}

.error-message {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  color: #666666;
  font-size: 14px;
}
</style>
