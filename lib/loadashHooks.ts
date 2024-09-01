// hooks/useDebouncedCallback.js
import { useCallback } from 'react';
import { debounce } from 'lodash';

type DebounceProps = {
    callback: (prop: any) => Promise<void>
    delay: number
}

const useDebouncedCallback = ({callback, delay} : DebounceProps) => {
  return useCallback(debounce(callback, delay), [delay]);
};

export default useDebouncedCallback;
