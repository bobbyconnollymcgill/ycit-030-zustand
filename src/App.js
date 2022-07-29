import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from "@mui/material"

import { useAppStore, useDialogStore } from "./store"

// At the end of the day, we created ourselves a DX (developer experience)
// in order to be able to write code like so:

// const result = await msgBoxYN("Are you hungry?")
// console.log(result)

export const App = () => {
    const { dialogState, open, close, getResult } = useDialogStore()

    const { role, promoteToAdmin } = useAppStore()

    return (
        <div>
            <Typography>{`Your current role is ${role}`}</Typography>

            <Button
                // onClick={() => { // On second thought, opening a dialog is async because we need to WAIT for the user to respond
                //     open()
                // }}
                onClick={async () => {
                    open()

                    const dialogPromise = new Promise((resolve) => {
                        setInterval(() => {
                            const result = getResult()
                            if (result !== null) {
                                resolve(result)
                            }
                        }, 50) // Polling strategy
                    })

                    const dialogResult = await dialogPromise

                    if (dialogResult === "yes") {
                        promoteToAdmin()
                    }
                }}
            >
                Open dialog
            </Button>
            <Dialog open={dialogState === "opened"}>
                <DialogTitle>Welcome!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you an administrator?
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={() => close("no")}>No</Button>
                        <Button onClick={() => close("yes")}>Yes</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    )
}
