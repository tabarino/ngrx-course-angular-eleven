import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from './reducers';
import { AuthActions } from './auth/actions';
import { AuthSelectors } from './auth/selectors';
import { login } from './auth/actions/auth.action';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    loading = true;
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(
        private router: Router,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        const userProfile = localStorage.getItem('user');

        if (userProfile) {
            this.store.dispatch(login({ user: JSON.parse(userProfile) }));
        }

        this.router.events.subscribe(event => {
            switch (true) {
                case event instanceof NavigationStart: {
                    this.loading = true;
                    break;
                }

                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError: {
                    this.loading = false;
                    break;
                }

                default: {
                    break;
                }
            }
        });

        this.isLoggedIn$ = this.store.pipe(
            select(AuthSelectors.isLoggedIn)
        );

        this.isLoggedOut$ = this.store.pipe(
            select(AuthSelectors.isLoggedOut)
        );
    }

    logout() {
        this.store.dispatch(AuthActions.logout());
    }
}
