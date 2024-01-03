<template>
  <el-drawer
    v-model="isVisible"
    :title="account?.nickname"
    direction="btt"
    size="90%"
    :before-close="onHandleClose"
  >
    <article>
      <el-skeleton :rows="20" animated v-if="isLoading" />
      <div v-else class="space-y-2">
        <el-tabs v-model="activeName">
          <el-tab-pane
            :label="`进行中(${list?.length})`"
            :name="QuestionStatus.Doing"
          >
            <aside class="flex justify-end mb-2">
              <el-descriptions :column="6" size="small" border>
                <el-descriptions-item label="总问题数量">
                  <span class="text-lg">{{ list?.length }}</span>
                </el-descriptions-item>
                <el-descriptions-item label="总问题积分">
                  <span class="text-lg">{{ doingCostPoints }}</span>
                </el-descriptions-item>
              </el-descriptions>
            </aside>
            <el-table stripe :data="list">
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
                  <p class="space-x-1">
                    <span>QID:</span>
                    <span>{{ props.row.qID }}</span>
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
                        <el-tag
                          type="info"
                          v-if="isPositive(item.opsVoteTotal)"
                          >{{ item.opsVoteTotal }}</el-tag
                        >
                      </p>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="作者答案" min-width="12%" align="center">
                <template #default="props">
                  <p>{{ props.row.opsKey }}</p>
                </template>
              </el-table-column>
              <el-table-column label="作者" min-width="12%">
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
                min-width="10%"
                align="right"
              />
              <el-table-column
                prop="voters"
                label="投票人数"
                min-width="10%"
                align="right"
              />
              <el-table-column
                prop="votes"
                label="总票数"
                min-width="10%"
                align="right"
              />
              <el-table-column
                prop="questionPrizePool"
                label="奖池"
                min-width="10%"
                align="right"
              />
              <el-table-column label="倒计时" min-width="16%" align="right">
                <template #default="props">
                  <p v-if="isPositive(props.row.endCountdown)">
                    <vue-countdown
                      :time="props.row.endCountdown"
                      :transform="transformCountDown"
                      v-slot="{ days, hours, minutes, seconds }"
                    >
                      {{ `${days}:${hours}:${minutes}:${seconds}` }}
                    </vue-countdown>
                  </p>
                  <p v-else>已结束</p>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane
            :label="`已结束(${finishedList?.length})`"
            :name="QuestionStatus.Finished"
          >
            <article class="flex justify-between space-x-4">
              <aside class="flex mb-2">
                <el-descriptions :column="6" size="small" border>
                  <el-descriptions-item label="正确问题数量">
                    <span class="text-lg">{{ finishedTotalCorrect }}</span>
                  </el-descriptions-item>
                  <el-descriptions-item label="错误问题数量">
                    <span class="text-lg">{{ finishedTotalError }}</span>
                  </el-descriptions-item>
                  <el-descriptions-item label="正确率">
                    <span class="text-lg">{{
                      toPercent(finishedCorrectRate)
                    }}</span>
                  </el-descriptions-item>
                </el-descriptions>
              </aside>
              <aside class="flex mb-2">
                <el-descriptions :column="6" size="small" border>
                  <el-descriptions-item label="总投入积分">
                    <span class="text-lg">{{ finishedTotalCostPoints }}</span>
                  </el-descriptions-item>
                  <el-descriptions-item label="总积分回收">
                    <span class="text-lg">{{ finishedCorrectCostPoints }}</span>
                  </el-descriptions-item>
                  <el-descriptions-item label="净积分收益">
                    <span class="text-lg">{{
                      finishedTotalCorrectIncome
                    }}</span>
                  </el-descriptions-item>
                  <el-descriptions-item label="总积分损失">
                    <span class="text-lg">{{ finishedErrorCostPoints }}</span>
                  </el-descriptions-item>
                  <el-descriptions-item label="回报率">
                    <span class="text-lg">{{
                      toPercent(finishedIncomeRate)
                    }}</span>
                  </el-descriptions-item>
                </el-descriptions>
              </aside>
            </article>

            <el-table stripe :data="finishedList">
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
                  <p class="space-x-1">
                    <span>QID:</span>
                    <span>{{ props.row.qID }}</span>
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
                        <el-tag
                          type="info"
                          v-if="isPositive(item.opsVoteTotal)"
                          >{{ item.opsVoteTotal }}</el-tag
                        >
                      </p>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="作者答案" min-width="8%" align="center">
                <template #default="props">
                  <p>{{ props.row.opsKey }}</p>
                </template>
              </el-table-column>
              <el-table-column label="总收益" min-width="8%" align="right">
                <template #default="props">
                  <el-text
                    :type="
                      isPositive(props.row.totalRewards) ? 'success' : 'danger'
                    "
                    >{{ formatNumber(props.row.totalRewards, 4) }}</el-text
                  >
                </template>
              </el-table-column>
              <el-table-column label="提问收益" min-width="8%" align="right">
                <template #default="props">
                  <el-text
                    :type="
                      isPositive(props.row.personIncome.askShareReward)
                        ? 'success'
                        : ''
                    "
                    >{{
                      formatNumber(props.row.personIncome.askShareReward, 4)
                    }}</el-text
                  >
                </template>
              </el-table-column>
              <el-table-column label="收益率" min-width="8%" align="right">
                <template #default="props">
                  <el-text
                    :type="
                      isGreaterThan(props.row.personIncome.incomeRate, 1)
                        ? 'success'
                        : 'danger'
                    "
                    >{{ toPercent(props.row.personIncome.incomeRate) }}</el-text
                  >
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
                </template>
              </el-table-column>
              <el-table-column
                prop="spendPoint"
                label="积分消耗"
                min-width="8%"
                align="right"
              />
              <el-table-column
                prop="voters"
                label="投票人数"
                min-width="8%"
                align="right"
              />
              <el-table-column
                prop="votes"
                label="总票数"
                min-width="8%"
                align="right"
              />
              <el-table-column
                prop="questionPrizePool"
                label="奖池"
                min-width="8%"
                align="right"
              />
              <el-table-column label="结束时间" min-width="12%" align="right">
                <template #default="props">
                  <p>{{ formatMoment(props.row.finishTime) }}</p>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </article>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import classNames from "classnames";
import { useGetListByAccount } from "../hooks/useGetList";
import {
  isPositive,
  toPercent,
  formatMoment,
  isGreaterThan,
  formatNumber,
} from "../utils";
import { Phase, QuestionStatus } from "../constants";
import { IAccount } from "../apis/list";
import { transformCountDown } from "../utils";

const props = defineProps<{
  account: IAccount | null;
  onClose: Function;
}>();

const isVisible = ref(false);
const activeName = ref(QuestionStatus.Doing);

const computedAccount = computed(() => {
  return props.account;
});

const {
  isLoading,
  list,
  finishedList,
  doingCostPoints,
  finishedTotalCorrect,
  finishedTotalError,
  finishedCorrectRate,
  finishedIncomeRate,
  finishedTotalCostPoints,
  finishedTotalCorrectIncome,
  finishedErrorCostPoints,
  finishedCorrectCostPoints,
} = useGetListByAccount(computedAccount);

watchEffect(() => {
  if (computedAccount.value) {
    isVisible.value = true;
  }
});

function onHandleClose() {
  isVisible.value = false;
  props.onClose();
}

// function onHandleChangeTab(tab: TabsPaneContext, event: Event) {
//   console.log(tab, event);
//   activeName.value = tab.paneName as QuestionStatus;
// }
</script>

<style lang="scss">
.el-drawer__header {
  margin-bottom: 0;
}
</style>
