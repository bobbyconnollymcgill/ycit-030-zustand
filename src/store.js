import create from "zustand"

export const useDialogStore = create((set, get) => {
    return {
        dialogState: "closed",

        result: null,

        getResult: () => {
            const allState = get()
            return allState.result
        },

        open: () => {
            set({ dialogState: "opened", result: null })
        },

        close: (result) => {
            console.log(`close() result=${result}`)

            set({ dialogState: "closed", result }) // This is the same as the line below
            // set({ dialogState: "closed", result: result })
        },
    }
})

export const useAppStore = create((set) => {
    return {
        role: "user",

        promoteToAdmin: () => {
            set({ role: "admin" })
        },
    }
})
