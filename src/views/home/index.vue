<template>
  <article>
    <el-skeleton :rows="20" animated v-if="isLoading" />
    <el-table stripe :data="list" style="width: 100%" v-else>
      <el-table-column label="标题" width="400">
        <template #default="props">
          <a
            :href="`https://app.socrates.com/answer-detail?qID=${props.row.qID}`"
            target="_blank"
          >
            {{ props.row.title }}
          </a>
          <p>{{ props.row.qID }}</p>
        </template>
      </el-table-column>
      <el-table-column width="320" label="选项">
        <template #default="props">
          <div class="space-y-2">
            <div v-for="item in props.row.ops">
              <p class="flex space-x-2">
                <span>{{ item.k }}</span>
                <span>{{ item.v }}</span>
                <span>{{ item.opsVoteTotal }}</span>
                <el-tag type="info" v-if="isPositive(item.opsVoteTotal)">{{
                  item.opsVoteTotal
                }}</el-tag>
              </p>
            </div>
          </div>
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
      <el-table-column label="创建时间" width="200" align="right" >
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
  </article>
</template>

<script setup lang="ts">
import { useGetListHot } from "../../hooks/useGetList";
import Countdown from "vue3-countdown";
import { formatMoment, isPositive } from "../../utils";
import { watchEffect } from "vue";

const { isLoading, list } = useGetListHot();

watchEffect(() => {
  console.log("isLoading: ", isLoading.value);
});
</script>
