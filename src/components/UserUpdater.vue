<script setup lang="ts">
import { useUserStore } from "../store/user";
import { computed } from "vue";
import { useUrlSearchParams } from "@vueuse/core";
import { useGetAnswerList } from "../hooks/useGetAnswerList";
import { watchEffect } from "vue";

const params = useUrlSearchParams("history");

const computedUser = computed(() => {
  if (params.user) {
    return params.user as string;
  }
  return "";
});

const { list } = useGetAnswerList(computedUser);

const userStore = useUserStore();

watchEffect(() => {
  if (list.value) {
    userStore.myList = list.value;
  }
});

watchEffect(() => {
  if (computedUser.value) {
    userStore.myId = computedUser.value;
  }
});

// onMounted(() => {
//   if (computedUser.value) {
//     userStore.fetchMyList(computedUser.value);
//   }
// });

// useIntervalFn(() => {
//   if (computedUser.value) {
//     userStore.fetchMyList(computedUser.value);
//   }
// }, 30000);
</script>

<template></template>
