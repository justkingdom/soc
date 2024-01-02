import { acceptHMRUpdate, defineStore } from 'pinia';
import { IListItem } from '../apis/list';
import { arrayToMap } from '../utils';
import { IPeronsal, fetchPersonal } from '../apis/user';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      myId: '' as string,
      myUser: null as IPeronsal | null,
      myList: null as null | Array<IListItem>
    };
  },
  getters: {
    myTotal(): number {
      if (!this.myList) {
        return 0;
      }
      return this.myList.length;
    },
    myMaps(): Map<string, IListItem> {
      if (!this.myList) {
        return new Map();
      }
      console.log('myMaps: ', this.myList.length);
      return arrayToMap(this.myList, 'qID');
    },
  },
  actions: {
    async fetchPersonal(accountId: string) {
      if (accountId) {
        const { data } = await fetchPersonal(accountId);
        this.myUser = data;
      }
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
