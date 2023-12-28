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
        <el-table-column label="标题" width="400">
          <template #default="props">
            <div>
              <a
                v-if="props.row.auth === 'all'"
                :href="`https://app.socrates.com/answer-detail?qID=${props.row.qID}`"
                target="_blank"
              >
                {{ props.row.title }}
              </a>
              <p class="text-gray-400 line-through" v-else>
                {{ props.row.title }}
              </p>
            </div>
            <p class="space-x-1">
              <span>QID:</span>
              <span>{{ props.row.qID }}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column width="320" label="选项">
          <template #default="props">
            <div class="space-y-2">
              <div v-for="item in props.row.ops">
                <p class="flex space-x-2">
                  <span>{{ item.k }}</span>
                  <span>{{ item.v }}</span>
                  <el-tag type="info" v-if="isPositive(item.opsVoteTotal)">{{
                    item.opsVoteTotal
                  }}</el-tag>
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="作者" width="120">
          <template #default="props">
            <a
              v-if="props.row.auth === 'all'"
              :href="`https://app.socrates.com/profile?account=${props.row.account.account}`"
              target="_blank"
            >
              {{ props.row.account.nickname }}
            </a>
          </template>
        </el-table-column>
        <el-table-column
          prop="spendPoint"
          label="积分消耗"
          width="120"
          align="right"
          sortable
        />
        <el-table-column
          prop="voters"
          label="投票人数"
          width="120"
          align="right"
          sortable
        />
        <el-table-column
          prop="votes"
          label="总票数"
          width="100"
          align="right"
          sortable
        />
        <el-table-column
          prop="questionPrizePool"
          label="奖池"
          width="100"
          align="right"
          sortable
        />
        <el-table-column
          prop="injectPoint"
          label="注入积分"
          width="120"
          align="right"
          sortable
        />
        <el-table-column label="阶段" width="100" align="right">
          <template #default="props">
            <el-tag v-if="isLessThan(props.row.voters, 20)" type="warning"
              >辩论</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="200" align="right">
          <template #default="props">
            <p>{{ formatMoment(props.row.createTime) }}</p>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" width="200" align="right">
          <template #default="props">
            <p>{{ formatMoment(props.row.finishTime) }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="endCountdown"
          label="倒计时"
          width="120"
          align="right"
        >
          <template #default="props">
            <p><countdown :time="props.row.endCountdown" /></p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useGetListNotLogin } from "../../hooks/useGetList";
import Countdown from "vue3-countdown";
import { formatMoment, isPositive, isLessThan } from "../../utils";
import { HEIGHT_CONTAINER } from "../../constants";
import { computed } from "vue";

const { isLoading, list, total } = useGetListNotLogin();

const height = computed(() => {
  return window.innerHeight - HEIGHT_CONTAINER;
});
</script>
