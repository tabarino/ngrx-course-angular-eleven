import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CourseActions } from '../actions';
import { compareCourses, Course } from '../model/course';

export interface CourseState extends EntityState<Course> { }

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses
    // selectId: course => course.courseId => If you use the id as id you do not need this option
});

export const initialCourseState = adapter.getInitialState();

export const coursesReducer = createReducer(
    initialCourseState,
    on(CourseActions.allCoursesLoaded, (state, action) => {
        return adapter.setAll(action.courses, state);
    })
);

export const { selectAll } = adapter.getSelectors();
