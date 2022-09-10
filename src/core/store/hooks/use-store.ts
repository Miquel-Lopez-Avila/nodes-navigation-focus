import { useCallback, useSyncExternalStore } from 'react';

const useStore = (store: any, selector: any) => {
  return useSyncExternalStore(
      store.subscribe,
      useCallback(() => selector(store.getState(), [store, selector]))
  )
}

export default useStore
