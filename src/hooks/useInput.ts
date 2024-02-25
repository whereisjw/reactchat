import { ChangeEvent, useCallback, useState } from 'react';

export const useInput = <T = any>(initalData: T) => {
  const [value, setValue] = useState(initalData);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  }, []);

  return [value, setValue, handler];
};
