import { ActionCreator } from '../../interfaces/types/action.creator';

import actionCatalog from './actionCatalog';

const actionCreator: ActionCreator = {
    ...actionCatalog,
};

export default actionCreator;
