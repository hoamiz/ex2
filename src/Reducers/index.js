
const initialState = {
    chosenTab: "profile1",
    tabs: [
        {
            name: 'Default',
            id: "profile1",
            className: "profile-item default no-edit",
            active: false
        },
        {
            name: 'Game',
            id: "profile2",
            className: "profile-item game no-edit",
            active: false

        },
        {
            name: 'Movie',
            id: "profile3",
            className: "profile-item movie no-edit",
            active: false

        },
        {
            name: 'Music',
            id: "profile4",
            className: "profile-item music no-edit",
            active: false

        },
        {
            name: 'Custom 1',
            id: "custom1",
            className: "profile-item custom",
            active: false

        },
        {
            name: 'Demo Long Text Demo Long Text Demo',
            id: "custom2",
            className: "profile-item custom",
            active: false

        },
    ],
    isEdit: false,
    innerText: '',
    onDelete: false,
}
export default function (state = initialState, action) {
    switch (action.type) {
        case 'ACTIVE': {
            let newState = Object.assign({}, state);
            newState.tabs.find(tab => tab.id === action.id).active = true
            newState.tabs.filter(tab => tab.id !== action.id).map(tab => tab.active = false)
            newState.chosenTab = action.id
            return newState
        }
        case 'ADD': {
            return {
                ...state,
                tabs: state.tabs.concat(action.tab),
            }
        }
        case 'UP': {
            let newState = Object.assign({}, state)
            let index = newState.tabs.findIndex(tab => tab.id === newState.chosenTab)
            let tmpTab = newState.tabs.filter(tab => tab.id === newState.chosenTab)[0]
            if (index !== 0) {
                newState.tabs[index] = newState.tabs[index - 1]
                newState.tabs[index - 1] = tmpTab
            }
            return newState
        }
        case 'DOWN': {
            let newState = Object.assign({}, state)
            let index = newState.tabs.findIndex(tab => tab.id === newState.chosenTab)
            let tmpTab = newState.tabs.filter(tab => tab.id === newState.chosenTab)[0]
            if (index !== newState.tabs.length - 1) {
                newState.tabs[index] = newState.tabs[index + 1]
                newState.tabs[index + 1] = tmpTab
            }
            return newState
        }
        case 'DELETE': {
            let newState = Object.assign({}, state)
            let index = newState.tabs.findIndex(tab => tab.id == state.chosenTab)
            let newId
            if (index !== 0) {
                newId = newState.tabs[index - 1].id
                newState.tabs[index - 1].active = true
            }
            else {
                newId = newState.tabs[1].id
                newState.tabs[1].active = true
            }
            newState.tabs = newState.tabs.filter(tab => tab.id !== newState.chosenTab)

            newState.chosenTab = newId
            newState.onDelete = !newState.onDelete
            return newState
        }
        case 'CONFDELETE': {
            return {
                ...state,
                onDelete: !state.onDelete
            }
        }
        case 'CANCELDELETE': {
            return {
                ...state,
                onDelete: false
            }
        }
        case 'ON_EDIT': {
            let text = state.tabs.filter(tab => tab.id === state.chosenTab)[0].name;
            return {
                ...state,
                isEdit: !state.isEdit,
                innerText: text,
                clicked: !state.clicked
            }
        }
        case 'FINISH_EDIT': {
            let newState = Object.assign({}, state)
            let innerText = newState.innerText;
            let [tab] = newState.tabs.filter(tab => tab.id == newState.chosenTab)
            if (innerText && innerText.trim() !== '') tab.name = innerText
            newState.isEdit = false;
            return newState
        }
        case 'CHANGE': {
            return {
                ...state,
                innerText: action.e
            }
        }
        default:
            return state
    }
}
