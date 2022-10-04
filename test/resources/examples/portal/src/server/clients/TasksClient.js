//
// GENERATED SOURCE - DO NOT EDIT
//
const RestClient = require("@blockware/sdk-rest-client");

class TasksClient {
    constructor() {
        this._client = new RestClient("tasks");
    }

    /**
     * Add task for user
     * HTTP: POST /tasks/{userId}/{id}
     *
     * @param {string} userId
     * @param {string} id
     * @param {Task} task
     * @return {Promise<void>}
     */
    addTask(userId, id, task) {
        return this._client.execute("POST", "/tasks/{userId}/{id}", [
            { name: "userId", value: userId, transport: "path" },
            { name: "id", value: id, transport: "path" },
            { name: "task", value: task, transport: "body" },
        ]);
    }

    /**
     * Mark task as done
     * HTTP: POST /tasks/{id}/done
     *
     * @param {string} id
     * @return {Promise<void>}
     */
    markAsDone(id) {
        return this._client.execute("POST", "/tasks/{id}/done", [
            { name: "id", value: id, transport: "path" },
        ]);
    }

    /**
     * Delete task
     * HTTP: DELETE /tasks/{id}
     *
     * @param {string} id
     * @return {Promise<void>}
     */
    removeTask(id) {
        return this._client.execute("DELETE", "/tasks/{id}", [
            { name: "id", value: id, transport: "path" },
        ]);
    }
}

module.exports = new TasksClient();
