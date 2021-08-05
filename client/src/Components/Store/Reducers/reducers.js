export default function reducers(...reducers) {
  return (state, action) => {
    let newState, i = 0, len = reducers.length;
    while (i < len && !newState) {
      const reducerState = reducers[i](state, action);
      if (reducerState) return reducerState;
      i++;
    }
    return state;
  };
}
