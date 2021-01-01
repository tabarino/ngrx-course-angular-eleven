import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CourseActions } from '../actions';
import { Course } from '../model/course';

export interface CourseState extends EntityState<Course> { }

export const adapter = createEntityAdapter<Course>();

export const initialCourseState = adapter.getInitialState();

export const coursesReducer = createReducer(
    initialCourseState,
    on(CourseActions.allCoursesLoaded, (state, action) => {
        return adapter.setAll(action.courses, state);
    })
);
