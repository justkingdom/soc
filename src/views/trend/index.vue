<template>
  <List :datas="list" :is-loading="isLoading" :total="total" />
</template>

<script setup lang="ts">
import { useGetListNotLogin } from "../../hooks/useGetList";
import List from "../../components/List.vue";

const { isLoading, list, total } = useGetListNotLogin();
</script>
