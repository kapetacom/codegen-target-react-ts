//
// GENERATED SOURCE - DO NOT EDIT
//
import { RestClient } from "@kapeta/sdk-rest-client";
import { Task } from "../../entities/Task";
import { Tags } from "../../entities/Tags";

class TasksClient {
    private readonly client: RestClient;

    constructor() {
        this.client = new RestClient("tasks");
    }

    /**
     * Add task for user
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
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
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
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
     *
     * Throws if service responds with a status code higher than 399 and not 404.
     * For 404 responses, null is returned.
     *
     * HTTP: DELETE /api/rest/tasks/tasks/{id}
     */
    async removeTask(id: string): Promise<void> {
        await this.client.execute("DELETE", "/tasks/{id}", [
            { name: "id", value: id, transport: "path" },
        ]);
    }
}

export default new TasksClient();
