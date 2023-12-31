<!-- <template>
  <div class="flex space-x-2">
    <el-input-number
      v-model="page"
      :min="1"
      :max="50"
      controls-position="right"
      size="large"
    />
    <el-button size="large" @click="onSubmit">提交</el-button>
  </div>
  <List :datas="list" :is-loading="isLoading" :total="total" />
</template>

<script setup lang="ts">
import { useGetIndexList } from "../hooks/useGetList";
import List from "../components/List.vue";
import { ref } from "vue";

const page = ref(0);
const summittedPage = ref(0);

const { isLoading, list, total, fetchData } = useGetIndexList(summittedPage);

const onSubmit = () => {
  summittedPage.value = page.value;
  fetchData();
};
</script> -->

<template>
  <List :datas="list" :is-loading="isLoading" :total="total" />
</template>

<script setup lang="ts">
import { useGetIndexList } from "../hooks/useGetList";
import List from "../components/List.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const { query } = useRoute();

const computedPage = computed(() => {
  if (query.page) {
    return +query.page;
  }
  return 0;
});

const { isLoading, list, total } = useGetIndexList(computedPage);
</script>

