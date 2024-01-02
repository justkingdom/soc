import { acceptHMRUpdate, defineStore } from 'pinia';
import { IListItem, fetchListAccount } from '../apis/list';
import { arrayToMap } from '../utils';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      myList: null as null | Array<IListItem>
    };
  },
  getters: {
    myMaps(): Map<string, IListItem> {
      if (!this.myList) {
        return new Map();
      }
      return arrayToMap(this.myList, 'qID');
    },
  },
  actions: {
    async fetchMyList(accountId: string) {
      const { data } = await fetchListAccount({
        mark: 0,
        pageSize: 20,
        account: accountId,
      });
      const records = data.records;
      this.myList = records;
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
