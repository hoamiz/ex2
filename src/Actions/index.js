export const Active = (id) => ({
    type: 'ACTIVE',
    id
});
export const Add = (tab) => ({
    type: 'ADD',
    tab
})
export const checkUpDown = () => ({
    type: 'CHECK_UP_DOWN'
})
export const Up = () => ({
    type: 'UP'
})
export const Down = () => ({
    type: 'DOWN'
})
export const canEdit = () => ({
    type: 'EDITABLE'
})
export const Delete = () => ({
    type: 'DELETE'
})
export const confDelete = () => ({
    type: 'CONFDELETE'
})
export const cancelDelete = () => ({
    type: 'CANCELDELETE'
})

export const onEdit = () => ({
    type: 'ON_EDIT'
})
export const finishlEdit = () => ({
    type: 'FINISH_EDIT'
})
export const onChange = (e) => ({
    type: 'CHANGE',
    e
})
