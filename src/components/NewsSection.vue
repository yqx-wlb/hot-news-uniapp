<template>
  <view class="section-container">
    <view class="section-header">
      <text class="section-title">{{ section.name }}</text>
      <view class="header-right">
        <text class="section-subtitle">{{ section.subtitle }}</text>
        <text class="update-time">{{ section.update_time }}</text>
      </view>
    </view>
    <scroll-view scroll-y class="news-list">
      <view
        v-for="(item, index) in section.data"
        :key="index"
        class="news-item"
        :class="{ 'no-border': index === section.data.length - 1 }"
        @tap="openUrl(item.mobil_url || item.url)"
      >
        <view class="news-content">
          <text class="news-index">{{
            String(index + 1).padStart(2, "0")
          }}</text>
          <text class="news-title">{{ item.title }}</text>
          <text class="hot-count">{{ item.hot }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
export default {
  name: "NewsSection",
};
</script>

<script setup lang="ts">
interface NewsItem {
  type: string;
  title: string;
  hot: string;
  url: string;
  mobil_url?: string;
  index: number;
}

interface NewsSection {
  name: string;
  subtitle: string;
  update_time: string;
  data: NewsItem[];
}

defineProps<{
  section: NewsSection;
}>();

const openUrl = (url: string) => {
  // 检查 URL 是否有效
  if (!url || (!url.startsWith("http://") && !url.startsWith("https://"))) {
    uni.showToast({
      title: "无效的链接",
      icon: "error",
    });
    return;
  }

  // 使用 webview 打开链接
  uni.navigateTo({
    url: `/pages/webview/webview?url=${encodeURIComponent(url)}`,
    fail: () => {
      uni.showToast({
        title: "打开链接失败",
        icon: "error",
      });
    },
  });
};
</script>

<style lang="scss" scoped>
.section-container {
  padding: 0 12px;
}

.section-header {
  margin-bottom: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 2px;
  letter-spacing: 0.3px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-subtitle {
  font-size: 11px;
  color: #999999;
  letter-spacing: 0.2px;
}

.update-time {
  font-size: 11px;
  color: #999999;
  letter-spacing: 0.2px;
  &::before {
    content: "·";
    margin: 0 4px;
  }
}

.news-list {
  padding: 0 2px;
}

.news-item {
  display: flex;
  align-items: flex-start;
  padding: 10px 0;
  cursor: pointer;

  &:active {
    background-color: rgba(0, 0, 0, 0.02);
  }
}

.news-index {
  min-width: 16px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.3);
  font-family: "Roboto Mono", monospace;
  margin-right: 2px;
  padding-top: 1px;
}

.news-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.news-title {
  flex: 1;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.85);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.hot-count {
  min-width: 48px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  text-align: right;
  padding-top: 2px;
}

:deep(:not(.dark)) {
  .section-title {
    color: rgba(0, 0, 0, 0.85);
  }

  .section-subtitle {
    color: rgba(0, 0, 0, 0.45);
  }

  .news-item {
    &:active {
      background-color: rgba(0, 0, 0, 0.02);
    }
  }

  .news-index {
    color: rgba(0, 0, 0, 0.45);
  }

  .news-title {
    color: rgba(0, 0, 0, 0.85);
  }

  .hot-count {
    color: rgba(0, 0, 0, 0.6);
  }
}

:deep(.dark) {
  .section-title {
    color: #ffffff;
  }

  .section-subtitle {
    color: rgba(255, 255, 255, 0.5);
  }

  .news-item {
    &:active {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }

  .news-title {
    color: #ffffff;
  }

  .hot-count {
    color: rgba(255, 255, 255, 0.6);
  }

  .news-index {
    color: rgba(255, 255, 255, 0.45);
  }
}
</style>
