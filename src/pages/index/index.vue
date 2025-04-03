<template>
  <view class="page-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="nav-content">
        <view class="title-group">
          <text class="nav-title">热搜聚合</text>
          <text class="nav-subtitle">/ 实时热点资讯</text>
        </view>
      </view>
      <yi-yan />
    </view>

    <!-- 内容区域 -->
    <scroll-view
      scroll-y
      class="content-container"
      refresher-enabled
      :refresher-triggered="isRefreshing"
      @refresherrefresh="handleRefresh"
      @scrolltolower="handleLoadMore"
    >
      <view v-if="isLoading" class="loading-container">
        <text class="loading-text">{{ LOADING_TEXT }}</text>
      </view>
      <view v-else class="sections-container">
        <view
          v-for="(section, index) in sections"
          :key="index"
          class="section-card"
        >
          <news-section :section="section" />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
// 组件导入
import YiYan from "../../components/YiYan.vue";
import NewsSection from "../../components/NewsSection.vue";
import MusicPlayer from "../../components/MusicPlayer.vue";

defineOptions({
  name: "Index",
});

// 类型定义
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

type Theme = "light" | "dark";

interface ApiResponse {
  success: boolean;
  data: NewsSection[];
}

// 常量定义
const APP_NAME = "摸鱼时刻";
const APP_DESCRIPTION = "/ 打工人的快乐源泉";
const LOADING_TEXT = "加载热搜中...";
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5分钟
const API_URL = "https://api.vvhan.com/api/hotlist/all";
const MOON_ICON = "../../static/icons/moon.svg";
const SUN_ICON = "../../static/icons/sun.svg";
const MUSIC_ICON = "../../static/icons/music.svg";

// 状态管理
const sections = ref<NewsSection[]>([]);
const theme = ref<Theme>(uni.getStorageSync("theme") || "dark");
const isLoading = ref(true);
const isRefreshing = ref(false);
const error = ref<string | null>(null);
const showMusicPlayer = ref(false);
let timer: number;

// 主题切换
const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  uni.setStorageSync("theme", theme.value);

  const themeConfig: Record<Theme, NavigationBarConfig> = {
    dark: {
      frontColor: "#ffffff",
      backgroundColor: "#1a1a1a",
    },
    light: {
      frontColor: "#000000",
      backgroundColor: "#ffffff",
    },
  };

  uni.setNavigationBarColor(themeConfig[theme.value]);
};

// 数据获取
const fetchNews = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const response = await uni.request({
      url: API_URL,
      method: "GET",
    });

    const data = response.data as ApiResponse;
    if (!data.success) throw new Error("获取数据失败");

    sections.value = data.data.filter(
      (section) => section.data && section.data.length > 0
    );
  } catch (err) {
    console.error("Error fetching news:", err);
    error.value = "获取数据失败，请稍后重试";
  } finally {
    isLoading.value = false;
    isRefreshing.value = false;
  }
};

// 下拉刷新
const handleRefresh = () => {
  isRefreshing.value = true;
  fetchNews();
};

// 加载更多
const handleLoadMore = () => {
  // 暂不实现
};

// 生命周期
onMounted(() => {
  fetchNews();
  timer = setInterval(fetchNews, REFRESH_INTERVAL) as unknown as number;
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

interface NavigationBarConfig {
  frontColor: string;
  backgroundColor: string;
}
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f7f8fa;
}

.nav-bar {
  padding: calc(var(--status-bar-height) + 12px) 16px 16px;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.title-group {
  flex: 1;
}

.nav-title {
  font-size: 20px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 4px;
  letter-spacing: 0.3px;
}

.nav-subtitle {
  font-size: 12px;
  color: #999999;
  letter-spacing: 0.2px;
}

.content-container {
  flex: 1;
  margin-top: calc(var(--status-bar-height) + 90px);
}

.sections-container {
  padding: 4px 0 20px;
}

.section-card {
  margin: 12px 16px;
  padding: 16px 0;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.loading-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 32px;
}

.loading-text {
  font-size: 14px;
  color: #999999;
}
</style>
