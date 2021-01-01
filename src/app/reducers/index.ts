import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { environment } from '../../environments/environment';

export interface AppState {
    router: RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        // console.log('state before: ', state);
        // console.log('current action: ', action);

        return reducer(state, action);
    };
}

/**
 * MetaReducers are called before the reducers
 */
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];
