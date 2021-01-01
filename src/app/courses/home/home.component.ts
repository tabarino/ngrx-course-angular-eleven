import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { CoursesSelectors } from '../selectors';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    promoTotal$: Observable<number>;
    loading$: Observable<boolean>;
    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor(
        private dialog: MatDialog,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.reload();
    }

    reload() {
        this.beginnerCourses$ = this.store.pipe(select(CoursesSelectors.selectBeginnerCourses));
        this.advancedCourses$ = this.store.pipe(select(CoursesSelectors.selectAdavancedCourses));
        this.promoTotal$ = this.store.pipe(select(CoursesSelectors.selectPromoTotal));
    }

    onAddCourse() {
        const dialogConfig = defaultDialogConfig();

        dialogConfig.data = {
            dialogTitle: 'Create Course',
            mode: 'create'
        };

        this.dialog.open(EditCourseDialogComponent, dialogConfig);
    }
}
