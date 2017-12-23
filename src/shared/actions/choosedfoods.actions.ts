import { Action } from "@ngrx/store";

export const UPDATE = '[ChoosedFood] Update';
export const EMPTY = '[ChoosedFood] Empty';

export class Update implements Action {
    readonly type = UPDATE;

    constructor(public payload: any){}
}

export class Empty implements Action {
    readonly type = EMPTY;
}

export type All
    = Update
    | Empty;