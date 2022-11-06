import { ACTION_TYPE } from "../enums/enum.action";

export interface InitialState {
  trigger: boolean,
}

export interface ActionReducer {
  type: ACTION_TYPE,
  payload: InitialState
}

import { Dispatch } from 'react';

export interface ActionCatalog {
  actionSetTriggerViewCatalog: (
    trigger: boolean
  ) => (dispatch: Dispatch<ActionReducer>) => void;
}
