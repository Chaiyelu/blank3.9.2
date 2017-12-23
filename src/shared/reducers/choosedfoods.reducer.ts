import * as ChooseFoodsActions from "../actions/choosedfoods.actions";

export type Action = ChooseFoodsActions.All;

export const choosedFoodsReducer = (state = [], action: Action) => {
  switch (action.type) {
    case ChooseFoodsActions.UPDATE:
      console.log(action);
      return action.payload;
    case ChooseFoodsActions.EMPTY:
      state.forEach((state)=>{
        state.count = 0;
      })
      return state;
    default:
      return state;
  }
}
