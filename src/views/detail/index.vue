<template>
  <aside>
    <div>
      <el-descriptions v-if="myId">
        <el-descriptions-item label="用户ID:">
          <span class="text-lg">{{ myId }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </aside>
  <List :datas="list" :is-loading="isLoading" :total="total" />
</template>

<script setup lang="ts">
import { useUrlSearchParams, useIntervalFn } from "@vueuse/core";
import { useGetDetailList } from "../../hooks/useGetList";
import List from "../../components/List.vue";
import { useRoute } from "vue-router";
import { computed, watchEffect } from "vue";
import { useUserStore } from "../../store/user";
import { storeToRefs } from "pinia";
import { useGetAnswerList2 } from "../../hooks/useGetAnswerList";
import { isEmpty } from "lodash";

const params = useUrlSearchParams("history");
const { query } = useRoute();
const userStore = useUserStore();
const { myId } = storeToRefs(userStore);

const computedUser = computed(() => {
  if (params.user) {
    return params.user as string;
  }
  return "";
});

const { list: answerList, refetch: refetchAnswerList, isHidden } =
  useGetAnswerList2(computedUser);

watchEffect(() => {
  if (answerList.value && !isEmpty(answerList.value)) {
    userStore.myList = answerList.value;
  }
});

useIntervalFn(() => {
  if (computedUser.value && !isHidden.value) {
    refetchAnswerList();
  }
}, 1000);

const computedPage = computed(() => {
  if (query.page) {
    return +query.page;
  }
  return 0;
});

const { isLoading, list, total } = useGetDetailList(computedPage);
</script>
