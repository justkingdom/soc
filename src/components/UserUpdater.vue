<script setup lang="ts">
import { useUserStore } from "../store/user";
import { computed } from "vue";
import { onMounted } from "vue";
import { useUrlSearchParams, useIntervalFn } from "@vueuse/core";

const params = useUrlSearchParams("history");

const computedUser = computed(() => {
  if (params.user) {
    return params.user as string;
  }
  return "";
});

const userStore = useUserStore();

onMounted(() => {
  if (computedUser.value) {
    userStore.fetchMyList(computedUser.value);
  }
});

useIntervalFn(() => {
  if (computedUser.value) {
    userStore.fetchMyList(computedUser.value);
  }
}, 30000);
</script>

<template></template>
