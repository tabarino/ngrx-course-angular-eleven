import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CourseActions } from '../actions';
import { compareCourses, Course } from '../model/course';

export interface CourseState extends EntityState<Course> {
    allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses
    // selectId: course => course.courseId => If you use the id as id you do not need this option
});

export const initialCourseState = adapter.getInitialState({
    allCoursesLoaded: false
});

export const coursesReducer = createReducer(
    initialCourseState,
    on(CourseActions.allCoursesLoaded, (state, action) => {
        return adapter.setAll(
            action.courses,
            { ...state, allCoursesLoaded: true }
        );
    }),
    on(CourseActions.courseUpdated, (state, action) => {
        return adapter.updateOne(action.update, state);
    })
);

export const { selectAll } = adapter.getSelectors();
