<template>
  <article>
    <el-skeleton :rows="20" animated v-if="isLoading" />
    <div class="max-w-screen-lg mx-auto" v-else>
      <aside class="flex justify-end">
        <el-descriptions>
          <el-descriptions-item label="总数:">
            <span class="text-lg">{{ total }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </aside>
      <el-table stripe :data="list">
        <el-table-column label="序号" prop="order" min-width="12%" />
        <el-table-column label="账户" min-width="28%">
          <template #default="props">
            <div class="flex items-center space-x-2">
              <el-avatar shape="square" :size="32" :src="props.row.photo" />
              <div>
                <a
                  class="flex items-center space-x-2"
                  :href="`https://app.socrates.com/profile?account=${props.row.account}`"
                  target="_blank"
                >
                  <span>
                    {{ props.row.nickname }}
                  </span>
                </a>
                <!-- <el-text
                  class="underline cursor-pointer text-gray-500"
                  :onClick="() => onShowAccount(props.row)"
                  >账户详情</el-text
                > -->
                <a
                  class="underline cursor-pointer"
                  target="_blank"
                  :href="`/account?id=${props.row.account}&nickname=${props.row.nickname}`"
                >
                  账户详情
                </a>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalIncome"
          label="总积分"
          min-width="20%"
          align="right"
          sortable
        >
          <template #default="props">
            {{ formatNumber(props.row.totalIncome) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="percent"
          label="占比"
          min-width="20%"
          align="right"
        >
          <template #default="props">
            {{ toPercent(props.row.percent) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="votes"
          label="奖励"
          min-width="20%"
          align="right"
          sortable
        >
          <template #default="props">
            {{ formatNumber(props.row.airdrop) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </article>
  <account :account="currentAccount" :on-close="onHideAccount" />
  <el-backtop :right="100" :bottom="100" />
</template>

<script setup lang="ts">
import { useGetRankList } from "../hooks/useGetRankList";
import { toPercent, formatNumber } from "../utils";
import { IAccount } from "../apis/list";
import { ref } from "vue";

const visibleAccount = ref(false);
const currentAccount = ref(null as IAccount | null);

const { isLoading, list, total } = useGetRankList();

function onHideAccount() {
  currentAccount.value = null;
  visibleAccount.value = false;
}
</script>
