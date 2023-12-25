import { addTaskHandler } from '../handlers/tasks/addTaskHandler';
import { markAsDoneHandler } from '../handlers/tasks/markAsDoneHandler';
import { removeTaskHandler } from '../handlers/tasks/removeTaskHandler';

export const handlers = [addTaskHandler, markAsDoneHandler, removeTaskHandler];
