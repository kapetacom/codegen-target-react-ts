import React from "react";
import {useAutoUpdater} from "../hooks/autoUpdaterHook";

export const Main = () => {

    useAutoUpdater()

    return (
        <div>
            <h1>{{desktopName}}</h1>
            <p>
                {{desktopDescription}}
            </p>

            <button onClick={() => {
                window.electron.ipcRenderer.invoke('example-method').then((result:any) => {
                    alert("Got result: " + JSON.stringify(result, null, 2));
                }).catch((err:any) => {
                    alert("Got error: " + JSON.stringify(err, null, 2));
                })
            }}>Call the main process</button>
        </div>
    )
}