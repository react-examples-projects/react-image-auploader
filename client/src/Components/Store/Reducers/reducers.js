/**
 * Combine the `functions` in just one object state
 * @param  {Array.<Function>} reducers The reducers functions
 * @returns The object state combined
 */
export default function reducers(...reducers) {
  return (state, action) => {
    let newState,
      i = 0,
      len = reducers.length;
    while (i < len && !newState) {
      const reducerState = reducers[i](state, action);
      if (reducerState) return reducerState;
      i++;
    }
    return state;
  };
}
