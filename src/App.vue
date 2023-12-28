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
      ><el-menu-item index="1" class="text-lg font-bold"
        >热门</el-menu-item
      ></router-link
    >
    <router-link to="/trend">
      <el-menu-item index="2" class="text-lg"> 趋势 </el-menu-item>
    </router-link>
  </el-menu>
  <article class="p-4">
    <router-view />
  </article>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeIndex = ref("1");
</script>
