<template>
  <List :datas="list" :is-loading="isLoading" :total="total" />
</template>

<script setup lang="ts">
import { useGetListHot } from "../hooks/useGetList";
import List from "../components/List.vue";

const { isLoading, list, total } = useGetListHot();
</script>
