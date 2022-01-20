import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreT } from '../store/slices';

import {
  increment as incrementAction,
  decrement as decrementAction,
  reset as resetAction,
} from '../store/slices/counter';

const useCounterRedux = () => {
  const dispatch = useDispatch<AppDispatch>();

  const increment = () => dispatch(incrementAction());
  const decrement = () => dispatch(decrementAction());
  const reset = () => dispatch(resetAction());

  const count = useSelector<StoreT, number>((state) => state.count);

  return { count, increment, decrement, reset };
};

export default useCounterRedux;
