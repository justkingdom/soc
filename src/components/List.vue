<template>
  <article>
    <el-skeleton :rows="20" animated v-if="isLoading" />
    <div v-else>
      <el-table stripe :data="datas" :height="height">
        <el-table-column type="index" min-width="4%" />
        <el-table-column label="标题" min-width="20%">
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
            <p class="flex space-x-1">
              <span>QID:</span>
              <span>{{ props.row.qID }}</span>
              <a
                class="underline cursor-pointer"
                target="_blank"
                :href="`/detail?page=${props.row.index}`"
                v-if="props.row.index !== undefined"
              >
                (Page: {{ props.row.index }})
              </a>
            </p>
          </template>
        </el-table-column>
        <el-table-column min-width="24%" label="选项">
          <template #default="props">
            <div class="space-y-2">
              <div v-for="item in props.row.ops">
                <div
                  class="flex items-center space-x-1"
                  v-if="props.row.phase === Phase.StepN"
                >
                  <el-progress
                    class="flex-1"
                    :text-inside="true"
                    :stroke-width="22"
                    :percentage="item.percent"
                  >
                    <div
                      :class="
                        classNames(
                          'flex justify-between w-full h-full',
                          item.color
                        )
                      "
                    >
                      <p class="flex justify-between space-x-2 h-full">
                        <span class="space-x-2">
                          <span>{{ item.k }}</span>
                          <span>{{ item.v }}</span>
                        </span>
                        <el-text class="font-semibold">{{
                          toPercent(item.percent, 2, false)
                        }}</el-text>
                      </p>
                    </div>
                  </el-progress>
                  <el-text v-if="isPositive(item.opsVoteTotal)">{{
                    item.opsVoteTotal
                  }}</el-text>
                </div>
                <p class="flex space-x-2" v-else>
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
        <el-table-column label="作者" min-width="8%">
          <template #default="props">
            <a
              v-if="props.row.auth === 'all'"
              :href="`https://app.socrates.com/profile?account=${props.row.account.account}`"
              target="_blank"
            >
              {{ props.row.account.nickname }}
            </a>
            <el-text
              class="underline cursor-pointer text-gray-500"
              :onClick="() => onShowAccount(props.row.account)"
              >账户详情</el-text
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="spendPoint"
          label="积分消耗"
          min-width="8%"
          align="right"
          sortable
        />
        <el-table-column
          prop="voters"
          label="投票人数"
          min-width="8%"
          align="right"
          sortable
        />
        <el-table-column
          prop="votes"
          label="总票数"
          min-width="6%"
          align="right"
          sortable
        />
        <el-table-column
          prop="questionPrizePool"
          label="奖池"
          min-width="6%"
          align="right"
          sortable
        />
        <!-- <el-table-column
          prop="injectPoint"
          label="注入积分"
          min-width="8%"
          align="right"
          sortable
        /> -->
        <!-- <el-table-column label="阶段" min-width="6%" align="right">
          <template #default="props">
            <el-tag v-if="isLessThan(props.row.voters, 20)" type="warning"
              >辩论</el-tag
            >
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="创建时间" min-width="200" align="right">
          <template #default="props">
            <p>{{ formatMoment(props.row.createTime) }}</p>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="周期" min-width="200" align="right">
          <template #default="props">
            <p>{{ formatMoment(props.row.createTime) }}</p>
            <p>{{ formatMoment(props.row.finishTime) }}</p>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="周期" min-width="8%" align="right">
          <template #default="props">
            <p>{{ props.row.duration }}</p>
          </template>
        </el-table-column> -->
        <el-table-column label="倒计时" min-width="12%" align="right">
          <template #default="props">
            <p v-if="isPositive(props.row.endCountdown)">
              <!-- <countdown :time="props.row.endCountdown" /> -->
              <vue-countdown
                :time="props.row.endCountdown"
                :transform="transformCountDown"
                v-slot="{ days, hours, minutes, seconds }"
              >
                {{ `${days}天 ${hours}:${minutes}:${seconds}` }}
              </vue-countdown>
            </p>
            <el-text type="danger" v-else>已结束</el-text>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </article>
  <el-backtop :right="100" :bottom="100" />
  <account :account="currentAccount" :on-close="onHideAccount" />
</template>

<script setup lang="ts">
import classNames from "classnames";
import {
  isPositive,
  toPercent,
  transformCountDown,
} from "../utils";
import { computed, reactive, ref, watch } from "vue";
import { HEIGHT_CONTAINER, Phase } from "../constants";
import Account from "./Account.vue";
import { IListItem, IAccount } from "../apis/list";

const props = defineProps<{
  datas: Array<IListItem> | null;
  isLoading: boolean;
  total: number;
}>();

const height = computed(() => {
  return window.innerHeight - HEIGHT_CONTAINER;
});

const visibleAccount = ref(false);
const currentAccount = ref(null as IAccount | null);
const reactiveObject = reactive({ count: 0 });

const forceUpdate = () => {
  reactiveObject.count = Math.random();
};

watch(
  () => props.datas,
  () => {
    forceUpdate();
  }
);

function onHideAccount() {
  currentAccount.value = null;
  visibleAccount.value = false;
}

function onShowAccount(account: IAccount) {
  currentAccount.value = account;
  visibleAccount.value = true;
}
</script>

<style lang="scss">
.el-progress {
  .el-progress-bar__innerText {
    width: 100%;
    color: var(--el-table-text-color);
    margin: 0;
    height: 100%;
    line-height: 22px;
  }
}
</style>
