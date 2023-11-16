//
// GENERATED SOURCE - DO NOT EDIT
//

import { RestClient } from "@kapeta/sdk-web-rest-client";
import { Task } from "../../entities/Task";
import { Tags } from "../../entities/Tags";

export class TasksClient {
    private client: RestClient;

    constructor() {
        this.client = new RestClient("api/rest/tasks");
    }

    /**
     * Add task for user
     * HTTP: POST /api/rest/tasks/tasks/{userId}/{id}
     */
    async addTask(
        userId: string,
        id: string,
        task: Task
    ): Promise<Task | null> {
        const result = await this.client.execute(
            "POST",
            "/tasks/{userId}/{id}",
            [
                { name: "userId", value: userId, transport: "path" },
                { name: "id", value: id, transport: "path" },
                { name: "task", value: task, transport: "body" },
            ]
        );

        if (result === null) {
            return null;
        }
        return result as Task;
    }

    /**
     * Mark task as done
     * HTTP: POST /api/rest/tasks/tasks/{id}/done
     */
    async markAsDone(
        id: string,
        headers: Any,
        metadata: Map<string, string>,
        tags: Set<Tags>
    ): Promise<void> {
        await this.client.execute("POST", "/tasks/{id}/done", [
            { name: "id", value: id, transport: "path" },
            { name: "headers", value: headers, transport: "header" },
            { name: "metadata", value: metadata, transport: "body" },
            { name: "tags", value: tags, transport: "query" },
        ]);
    }

    /**
     * Delete task
     * HTTP: DELETE /api/rest/tasks/tasks/{id}
     */
    async removeTask(id: string): Promise<void> {
        await this.client.execute("DELETE", "/tasks/{id}", [
            { name: "id", value: id, transport: "path" },
        ]);
    }
}
