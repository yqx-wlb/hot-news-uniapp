<template>
  <view class="yiyan-container">
    <text class="yiyan-text">{{ content || defaultContent }}</text>
  </view>
</template>

<script lang="ts">
export default {
  name: "YiYan",
};
</script>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface YiYanResponse {
  success: boolean;
  type: string;
  data: {
    id: number;
    content: string;
    form: string;
    creator: string;
  };
}

const content = ref("");
const defaultContent = "生活明朗，万物可爱";
let timer: number;

const fetchYiYan = async () => {
  try {
    const response = await uni.request({
      url: "https://api.vvhan.com/api/ian/rand?type=json",
      method: "GET",
    });

    const data = response.data as YiYanResponse;
    if (data.success) {
      content.value = data.data.content;
    }
  } catch (error) {
    console.error("获取一言失败:", error);
    content.value = defaultContent;
  }
};

onMounted(() => {
  fetchYiYan();
  // 每小时更新一次
  timer = setInterval(fetchYiYan, 60 * 60 * 1000) as unknown as number;
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style lang="scss" scoped>
.yiyan-container {
  padding: 4px 2px;
}

.yiyan-text {
  font-size: 13px;
  color: #666666;
  line-height: 1.6;
  font-weight: 400;
  letter-spacing: 0.3px;
}

:deep(:not(.dark)) {
  .yiyan-text {
    color: rgba(0, 0, 0, 0.6);
  }
}

:deep(.dark) {
  .yiyan-text {
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>
