import { ActionReducer, InitialState } from "../../interfaces/interface/interface.initialState"

const reducer = (state: InitialState, action: ActionReducer): InitialState => {
    console.log(action.payload, 'trigger')
    if (Object.prototype.hasOwnProperty.call(state, action.type)) {
        return { ...state, [action.type]: action.payload[action.type] };
    } else {
        return state;
    }
};

export default reducer;
