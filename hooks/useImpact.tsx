const DEFAULT_STATE: Array<Object> = [];

const impactReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_IMPACT':
      return [...state, action.value];
    case 'REMOVE_IMPACT':
      const newImpacts = state.filter((item) => item.id != action.value);
      return newImpacts;
    case 'CLEAR_IMPACTS':
      return DEFAULT_STATE;
    default:
      return { ...state };
  }
}

export { DEFAULT_STATE, impactReducer }