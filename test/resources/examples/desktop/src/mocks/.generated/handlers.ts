import { sortHandlersByPathSpecificity } from './sortHandlers';
import { TasksLists_addListHandler } from '../handlers/tasks-lists/addListHandler';
import { TasksLists_removeListHandler } from '../handlers/tasks-lists/removeListHandler';
import { Tasks_addTaskHandler } from '../handlers/tasks/addTaskHandler';
import { Tasks_markAsDoneHandler } from '../handlers/tasks/markAsDoneHandler';
import { Tasks_removeTaskHandler } from '../handlers/tasks/removeTaskHandler';
import { Backend_getEntityHandler } from '../handlers/backend/getEntityHandler';

export const handlers = sortHandlersByPathSpecificity([
    TasksLists_addListHandler,
    TasksLists_removeListHandler,

    Tasks_addTaskHandler,
    Tasks_markAsDoneHandler,
    Tasks_removeTaskHandler,

    Backend_getEntityHandler,
]);
