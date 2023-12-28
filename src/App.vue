<template>
  <el-menu
    :default-active="activeIndex"
    class="px-4"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="onHandleSelect"
  >
    <el-menu-item index="1" class="text-lg font-bold">热门</el-menu-item>
    <el-menu-item index="2" class="text-lg">趋势</el-menu-item>
  </el-menu>
  <article class="p-4">
    <router-view />
  </article>
</template>

<script setup lang="ts">
import { ref } from "vue";

// console.log('查看全局环境', import.meta.env);
const activeIndex = ref("1");

const onHandleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
