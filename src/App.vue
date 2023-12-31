<template>
  <el-menu
    :default-active="activeIndex"
    class="px-4 flex justify-center"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <router-link to="/"
      ><el-menu-item index="/" class="text-lg font-bold"
        >首页</el-menu-item
      ></router-link
    >
    <router-link to="/hot"
      ><el-menu-item index="/hot" class="text-lg font-bold"
        >热门</el-menu-item
      ></router-link
    >
    <router-link to="/trend">
      <el-menu-item index="/trend" class="text-lg">趋势</el-menu-item>
    </router-link>
    <router-link to="/rank">
      <el-menu-item index="/rank" class="text-lg">排行</el-menu-item>
    </router-link>
  </el-menu>
  <article class="p-4">
    <router-view />
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";

const activeIndex = computed(() => {
  return window.location.pathname;
});
</script>
