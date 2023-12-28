<template>
  <el-skeleton :rows="20" animated />
</template>

<script setup lang="ts">
import { useGetListHot } from "../../hooks/useGetList";
import Countdown from "vue3-countdown";
import { formatMoment, isPositive, isLessThan } from "../../utils";
import { watchEffect } from "vue";
// import { watchEffect } from "vue";

const { isLoading, list } = useGetListHot();

watchEffect(() => {
  console.log("isLoading: ", isLoading.value);
});
</script>
