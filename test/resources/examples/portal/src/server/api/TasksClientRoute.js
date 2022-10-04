//
// GENERATED SOURCE - DO NOT EDIT
//
const RESTRoute = require("@blockware/sdk-rest-route");
const client = require("../clients/TasksClient");

class TasksClientRoute extends RESTRoute {
    constructor() {
        super();
        this._initRoutes();
    }

    _initRoutes() {
        //addTask: Verify the method is available
        if (!client.addTask) {
            throw new Error(
                'REST resource client for "Tasks" is missing method: "addTask"'
            );
        }

        //addTask: Verify the method is implemented correctly
        this.validateMethod(client.addTask, "addTask", [
            "userId",
            "id",
            "task",
        ]);

        //addTask: Add route to server
        this.addEndpoint({
            method: "POST",
            path: "/api/tasks/{userId}/{id}",
            description: "Add task for user",
            arguments: [
                { name: "userId", transport: "path" },
                { name: "id", transport: "path" },
                { name: "task", transport: "body" },
            ],
            handler: client.addTask.bind(client),
        });

        //markAsDone: Verify the method is available
        if (!client.markAsDone) {
            throw new Error(
                'REST resource client for "Tasks" is missing method: "markAsDone"'
            );
        }

        //markAsDone: Verify the method is implemented correctly
        this.validateMethod(client.markAsDone, "markAsDone", ["id"]);

        //markAsDone: Add route to server
        this.addEndpoint({
            method: "POST",
            path: "/api/tasks/{id}/done",
            description: "Mark task as done",
            arguments: [{ name: "id", transport: "path" }],
            handler: client.markAsDone.bind(client),
        });

        //removeTask: Verify the method is available
        if (!client.removeTask) {
            throw new Error(
                'REST resource client for "Tasks" is missing method: "removeTask"'
            );
        }

        //removeTask: Verify the method is implemented correctly
        this.validateMethod(client.removeTask, "removeTask", ["id"]);

        //removeTask: Add route to server
        this.addEndpoint({
            method: "DELETE",
            path: "/api/tasks/{id}",
            description: "Delete task",
            arguments: [{ name: "id", transport: "path" }],
            handler: client.removeTask.bind(client),
        });
    }
}

module.exports = TasksClientRoute;
