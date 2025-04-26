const initData = {
  type: 'mastercard',
  holder: 'YUE HUA',
  number: '5353291888041513',
  expiry: '08/23'
};

export const initState = initData;

export const enum ReducerActionTypes {
  SetType,
  SetHolder,
  SetNumber,
  SetExpiry,
  FormReset,
  FormSubmit
}

type ReducerAction = {
  type: ReducerActionTypes;
  payload?: string;
};

export function reducer(state: typeof initState, action: ReducerAction) {
  switch (action.type) {
    case ReducerActionTypes.SetType:
      return { ...state, type: action.payload ?? '' };
    case ReducerActionTypes.SetHolder:
      return { ...state, holder: action.payload ?? '' };
    case ReducerActionTypes.SetNumber:
      return { ...state, number: action.payload ?? '' };
    case ReducerActionTypes.SetExpiry:
      return { ...state, expiry: action.payload ?? '' };
    case ReducerActionTypes.FormReset:
      return initState;
    case ReducerActionTypes.FormSubmit:
      return state;
    default:
      return state;
  }
}
