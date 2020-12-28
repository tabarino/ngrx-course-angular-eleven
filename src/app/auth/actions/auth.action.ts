import { createAction, props } from '@ngrx/store';
import { User } from '../model/user.model';

export const login = createAction(
    '[Login] User Login',
    props<{ user: User }>()
);

export const logout = createAction(
    '[Menu] User Logout'
);
