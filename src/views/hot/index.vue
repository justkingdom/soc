<template>
  <aside class="flex justify-end">
    <el-descriptions>
      <el-descriptions-item label="总数:">
        <span class="text-lg">{{ total }}</span>
      </el-descriptions-item>
    </el-descriptions>
  </aside>
  <List :datas="list" :is-loading="isLoading" :total="total" />
</template>

<script setup lang="ts">
import { useGetListHot } from "../../hooks/useGetList";
import List from "../../components/List.vue";

const { isLoading, list, total } = useGetListHot();
</script>
