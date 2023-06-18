//
// GENERATED SOURCE - DO NOT EDIT
//

import { RestClient } from "@kapeta/sdk-web-rest-client";
import { Task } from "../../entities/Task";

export class TasksClient {
    client: RestClient;

    constructor() {
        this.client = new RestClient("/api/rest/tasks");
    }

    /**
     * Add task for user
     * HTTP: POST /api/tasks/{userId}/{id}
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
     */
    markAsDone(id: string): Promise<void> {
        return this.client.execute("POST", "/tasks/{id}/done", [
            { name: "id", value: id, transport: "path" },
        ]);
    }

    /**
     * Delete task
     * HTTP: DELETE /api/tasks/{id}
     */
    removeTask(id: string): Promise<void> {
        return this.client.execute("DELETE", "/tasks/{id}", [
            { name: "id", value: id, transport: "path" },
        ]);
    }
}
