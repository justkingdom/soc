<template>
  <List :datas="list" :is-loading="isLoading" :total="total" />
</template>

<script setup lang="ts">
import { useGetIndexList } from "../../hooks/useGetList";
import List from "../../components/List.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const { query } = useRoute();

const computedPage = computed(() => {
  if (query.page) {
    return +query.page;
  }
  return 0;
});

const { isLoading, list, total, fetchData } = useGetIndexList(computedPage);
</script>
