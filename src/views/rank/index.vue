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
      <el-table stripe :data="list" style="width: 100%" :height="height">
        <el-table-column label="序号" prop="order" width="120" />
        <el-table-column label="账户" width="400">
          <template #default="props">
            <div class="flex items-center space-x-2">
              <a
                class="flex items-center space-x-2"
                :href="`https://app.socrates.com/profile?account=${props.row.account}`"
                target="_blank"
              >
                <el-avatar shape="square" :size="32" :src="props.row.photo" />
                <span>
                  {{ props.row.nickname }}
                </span>
              </a>
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
</template>

<script setup lang="ts">
import { useGetRankList } from "../../hooks/useGetRankList";
import { toPercent, formatNumber } from "../../utils";
import { HEIGHT_CONTAINER } from "../../constants";
import { computed } from "vue";

const { isLoading, list, total } = useGetRankList();

const height = computed(() => {
  return window.innerHeight - HEIGHT_CONTAINER;
});
</script>
