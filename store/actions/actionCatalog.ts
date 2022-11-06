import { ACTION_TYPE } from '../../interfaces/enums/enum.action';
import { ActionCatalog } from '../../interfaces/interface/interface.initialState';

const actionCatalog: ActionCatalog = {

    actionSetTriggerViewCatalog: (triggered) => (dispatch) => {
        dispatch({
            type: ACTION_TYPE.SET_TRIGGER_VIEW_CATALOG,
            payload: { trigger: triggered },
        });
    },
};

export default actionCatalog;