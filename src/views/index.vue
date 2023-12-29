<template>
  <List :datas="list" :is-loading="isLoading" :total="total" />
</template>

<script setup lang="ts">
import { useGetListHome } from "../hooks/useGetList";
import List from "../components/List.vue";
import { onMounted } from "vue";
import { fetchMock } from "../apis/user";

const { isLoading, list, total } = useGetListHome();

onMounted(async() => {
  const data = await fetchMock();
  console.log('data: ', data);
});
</script>
