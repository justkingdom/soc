<template>
  <article>
    <el-skeleton :rows="20" animated v-if="isLoading" />
    <div class="mx-auto w-fit" v-else>
      <aside class="flex justify-end">
        <el-descriptions>
          <el-descriptions-item label="总数:">
            <span class="text-lg">{{ total }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </aside>
      <el-table stripe :data="list">
        <el-table-column label="序号" prop="order" width="120" />
        <el-table-column label="账户" width="400">
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
                <el-text
                  class="underline cursor-pointer text-gray-500"
                  :onClick="() => onShowAccount(props.row)"
                  >账户详情</el-text
                >
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalIncome"
          label="总积分"
          width="120"
          align="right"
          sortable
        >
          <template #default="props">
            {{ formatNumber(props.row.totalIncome) }}
          </template>
        </el-table-column>
        <el-table-column prop="percent" label="占比" width="160" align="right">
          <template #default="props">
            {{ toPercent(props.row.percent) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="votes"
          label="奖励"
          width="200"
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
import { useGetRankList } from "../../hooks/useGetRankList";
import { toPercent, formatNumber } from "../../utils";
import { IAccount } from "../../apis/list";
import { ref } from "vue";

const visibleAccount = ref(false);
const currentAccount = ref(null as IAccount | null);

const { isLoading, list, total } = useGetRankList();

function onHideAccount() {
  currentAccount.value = null;
  visibleAccount.value = false;
}

function onShowAccount(account: IAccount) {
  currentAccount.value = account;
  visibleAccount.value = true;
}
</script>
