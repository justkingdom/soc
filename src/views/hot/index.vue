<template>
  <aside class="flex justify-between">
    <div>
      <el-descriptions v-if="myId">
        <el-descriptions-item label="用户ID:">
          <span class="text-lg">{{ myId }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="近三天投票:">
          <span class="text-lg">{{ myTotal }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <el-descriptions>
      <el-descriptions-item label="总数:">
        <span class="text-lg">{{ total }}</span>
      </el-descriptions-item>
    </el-descriptions>
  </aside>
  <List :datas="list" :is-loading="isLoading" :total="total" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGetListHot } from "../../hooks/useGetList";
import List from "../../components/List.vue";
import { useUserStore } from "../../store/user";

const userStore = useUserStore();
const { myTotal, myId } = storeToRefs(userStore);

const { isLoading, list, total } = useGetListHot();
</script>
