//
// GENERATED SOURCE - DO NOT EDIT
//
import { TaskState } from "./TaskState";
import { Tags } from "./Tags";

export interface Task {
    id: string;
    state: TaskState;
    created: number;
    views: number;
    stars: number;
    numberList: number[];
    age: number;
    metadata: Map<string, string>;
    tags: Set<Tags>;
}
