import { sortHandlersByPathSpecificity } from './sortHandlers';
import { Users_addUserHandler } from '../handlers/users/addUserHandler';
import { Users_removeUserHandler } from '../handlers/users/removeUserHandler';
import { UsersGroups_addGroupHandler } from '../handlers/users-groups/addGroupHandler';
import { UsersGroups_removeGroupHandler } from '../handlers/users-groups/removeGroupHandler';
import { TasksLists_addListHandler } from '../handlers/tasks-lists/addListHandler';
import { TasksLists_removeListHandler } from '../handlers/tasks-lists/removeListHandler';
import { Tasks_addTaskHandler } from '../handlers/tasks/addTaskHandler';
import { Tasks_markAsDoneHandler } from '../handlers/tasks/markAsDoneHandler';
import { Tasks_removeTaskHandler } from '../handlers/tasks/removeTaskHandler';

export const handlers = sortHandlersByPathSpecificity([
    Users_addUserHandler,
    Users_removeUserHandler,

    UsersGroups_addGroupHandler,
    UsersGroups_removeGroupHandler,

    TasksLists_addListHandler,
    TasksLists_removeListHandler,

    Tasks_addTaskHandler,
    Tasks_markAsDoneHandler,
    Tasks_removeTaskHandler,
]);
