//AI-TYPE:dto

//
// GENERATED SOURCE - DO NOT EDIT
//

import { TaskState } from './TaskState';
import { Tags } from './Tags';
export interface Task {
    id: string;
    state: TaskState;
    created?: number;
    views?: number;
    stars?: number;
    numberList: number[];
    /**
     * Age of the task
     */
    age: number;
    metadata: { [key: string]: string };
    tags: Tags[];
}
