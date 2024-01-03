<template>
  <aside class="flex justify-between">
    <div>
      <el-descriptions v-if="myId">
        <el-descriptions-item label="用户ID:">
          <span class="text-lg">{{ myId }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="近7天投票:">
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
import { computed } from "vue";
import { useUrlSearchParams, useIntervalFn } from "@vueuse/core";
import { useGetAnswerList } from "../../hooks/useGetAnswerList";
import { watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useGetListHot } from "../../hooks/useGetList";
import List from "../../components/List.vue";
import { useUserStore } from "../../store/user";
import { ONE_MINUTE } from "../../constants";

const params = useUrlSearchParams("history");

const computedUser = computed(() => {
  if (params.user) {
    return params.user as string;
  }
  return "";
});

const { list: answerList, refetch: refetchAnswerList } =
  useGetAnswerList(computedUser);

const userStore = useUserStore();

watchEffect(() => {
  if (answerList.value) {
    userStore.myList = answerList.value;
  }
});

watchEffect(() => {
  if (computedUser.value) {
    userStore.myId = computedUser.value;
  }
});

useIntervalFn(() => {
  if (computedUser.value) {
    refetchAnswerList();
  }
}, ONE_MINUTE);

const { myTotal, myId } = storeToRefs(userStore);

const { isLoading, list, total } = useGetListHot();
</script>
