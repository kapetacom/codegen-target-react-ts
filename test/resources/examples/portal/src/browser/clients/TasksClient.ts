//
// GENERATED SOURCE - DO NOT EDIT
//

import RESTClient from "@blockware/sdk-web-rest-client";
import { Task } from "../entities/Task";

export class TasksClient {
    client: RESTClient;

    constructor() {
        this.client = new RESTClient("/api/");
    }

    /**
     * Add task for user
     * HTTP: POST /api/tasks/{userId}/{id}
     *
     * @param {string} userId
     * @param {string} id
     * @param {Task} task
     * @return {Promise<void>}
     */
    addTask(userId: string, id: string, task: Task): Promise<void> {
        return this.client.execute("POST", "/tasks/{userId}/{id}", [
            { name: "userId", value: userId, transport: "path" },
            { name: "id", value: id, transport: "path" },
            { name: "task", value: task, transport: "body" },
        ]);
    }

    /**
     * Mark task as done
     * HTTP: POST /api/tasks/{id}/done
     *
     * @param {string} id
     * @return {Promise<void>}
     */
    markAsDone(id: string): Promise<void> {
        return this.client.execute("POST", "/tasks/{id}/done", [
            { name: "id", value: id, transport: "path" },
        ]);
    }

    /**
     * Delete task
     * HTTP: DELETE /api/tasks/{id}
     *
     * @param {string} id
     * @return {Promise<void>}
     */
    removeTask(id: string): Promise<void> {
        return this.client.execute("DELETE", "/tasks/{id}", [
            { name: "id", value: id, transport: "path" },
        ]);
    }
}
