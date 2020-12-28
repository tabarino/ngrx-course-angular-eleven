import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from '../../reducers';
import { AuthSelectors } from '../selectors';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<AppState>
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(AuthSelectors.isLoggedIn),
            tap(loggedIn => {
                if (!loggedIn) {
                    this.router.navigateByUrl('/login');
                }
            })
        );
    }
}
