import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions) {
        this.actions$.subscribe(action => {
            if (action.type === '[Login] User Login') {
                localStorage.setItem('user', JSON.stringify(action['user']));
            }
        });
    }
}
