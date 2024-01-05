import { users_addUserHandler } from '../handlers/users/addUserHandler';
import { users_removeUserHandler } from '../handlers/users/removeUserHandler';
import { tasks_addTaskHandler } from '../handlers/tasks/addTaskHandler';
import { tasks_markAsDoneHandler } from '../handlers/tasks/markAsDoneHandler';
import { tasks_removeTaskHandler } from '../handlers/tasks/removeTaskHandler';
export const handlers = [
    users_addUserHandler,
    users_removeUserHandler,

    tasks_addTaskHandler,
    tasks_markAsDoneHandler,
    tasks_removeTaskHandler,
];
