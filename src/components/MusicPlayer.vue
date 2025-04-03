<template>
  <view class="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
    <view
      class="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-lg rounded-lg border bg-card p-6 shadow-lg"
    >
      <view class="flex flex-col gap-4">
        <view class="flex items-center justify-between">
          <text class="text-lg font-semibold">音乐播放器</text>
          <button
            @tap="$emit('close')"
            class="rounded-full p-1.5 hover:bg-accent"
          >
            <image :src="CLOSE_ICON" class="w-4 h-4" mode="aspectFit" />
          </button>
        </view>

        <view class="space-y-4">
          <view class="flex items-center justify-center">
            <image
              :src="currentSong.cover || '/static/images/default-cover.jpg'"
              class="w-32 h-32 rounded-lg"
              mode="aspectFill"
            />
          </view>

          <view class="text-center">
            <text class="text-lg font-medium">{{
              currentSong.name || "未知歌曲"
            }}</text>
            <text class="block text-sm text-muted-foreground">{{
              currentSong.artist || "未知艺术家"
            }}</text>
          </view>

          <view class="flex items-center justify-center gap-4">
            <button @tap="playPrev" class="p-2 hover:bg-accent rounded-full">
              <image :src="SKIP_BACK_ICON" class="w-6 h-6" mode="aspectFit" />
            </button>

            <button @tap="togglePlay" class="p-3 hover:bg-accent rounded-full">
              <image
                :src="
                  isPlaying
                    ? '/static/icons/pause.svg'
                    : '/static/icons/play.svg'
                "
                class="w-8 h-8"
                mode="aspectFit"
              />
            </button>

            <button @tap="playNext" class="p-2 hover:bg-accent rounded-full">
              <image
                :src="SKIP_FORWARD_ICON"
                class="w-6 h-6"
                mode="aspectFit"
              />
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: "MusicPlayer",
};
</script>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface Song {
  id: string;
  name: string;
  artist: string;
  cover: string;
  url: string;
}

const isPlaying = ref(false);
const currentSong = ref<Song>({
  id: "1",
  name: "示例歌曲",
  artist: "示例艺术家",
  cover: "",
  url: "",
});

// 在小程序中使用背景音频
const backgroundAudioManager = uni.getBackgroundAudioManager();

const CLOSE_ICON = "/static/icons/close.svg";
const SKIP_BACK_ICON = "/static/icons/skip-back.svg";
const SKIP_FORWARD_ICON = "/static/icons/skip-forward.svg";

const togglePlay = () => {
  if (isPlaying.value) {
    backgroundAudioManager.pause();
  } else {
    backgroundAudioManager.title = currentSong.value.name;
    backgroundAudioManager.singer = currentSong.value.artist;
    backgroundAudioManager.coverImgUrl = currentSong.value.cover;
    backgroundAudioManager.src = currentSong.value.url;
  }
  isPlaying.value = !isPlaying.value;
};

const playNext = () => {
  // 实现下一曲逻辑
  console.log("播放下一曲");
};

const playPrev = () => {
  // 实现上一曲逻辑
  console.log("播放上一曲");
};

onMounted(() => {
  // 监听背景音频事件
  backgroundAudioManager.onPlay(() => {
    isPlaying.value = true;
  });

  backgroundAudioManager.onPause(() => {
    isPlaying.value = false;
  });

  backgroundAudioManager.onEnded(() => {
    isPlaying.value = false;
    playNext();
  });
});

onUnmounted(() => {
  // 组件卸载时停止播放
  backgroundAudioManager.stop();
});
</script>
