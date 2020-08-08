import { useRef, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

export const useShallowSelector = (selector: (state: object) => object): object => {
  return useSelector(selector, shallowEqual);
};

export const useDidUpdateEffect = (func: () => void, deps: any[]): void => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export const usePrevious = <T extends any>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
