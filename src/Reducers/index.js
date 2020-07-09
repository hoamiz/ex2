import { combineReducers } from 'redux';
import * as action from '../Actions/index';
import { connect } from 'react-redux';
import { Active } from './../Actions/index';
import { store } from './../index';


const initialState = {
    chosenTab: "profile1",
    tabs: [
        {
            name: 'Default',
            id: "profile1",
            className: "profile-item default no-edit",
        },
        {
            name: 'Game',
            id: "profile2",
            className: "profile-item game no-edit"
        },
        {
            name: 'Movie',
            id: "profile3",
            className: "profile-item movie no-edit"
        },
        {
            name: 'Music',
            id: "profile4",
            className: "profile-item music no-edit"
        },
        {
            name: 'Custom 1',
            id: "custom1",
            className: "profile-item custom",
        },
        {
            name: 'Demo Long Text Demo Long Text Demo',
            id: "custom2",
            className: "profile-item custom",
        },
    ],
    isEdit: false,
    innerText: '',
    onDelete: false,
    clicked: false
}
export default function (state = initialState, action) {
    switch (action.type) {
        case 'ACTIVE': {
            if (action.id !== undefined) state.chosenTab = action.id
            document.getElementById(state.chosenTab).classList.add('active')
            state.tabs.filter(tab => tab.id !== state.chosenTab).map(tab => {
                document.getElementById(tab.id).classList.remove('active')
            })
            return state
        }
        case 'ADD': {
            let tabs = [...state.tabs, action.tab]
            return {
                ...state,
                tabs,
            }
        }
        case 'CHECK_UP_DOWN': {
            let index = state.tabs.findIndex(tab => tab.id === state.chosenTab)
            if (index === 0) {
                document.getElementById('profileUp').classList.add('disabled');
                document.getElementById('profileDown').classList.remove('disabled');
            } else if (index === state.tabs.length - 1) {
                document.getElementById('profileUp').classList.remove('disabled');
                document.getElementById('profileDown').classList.add('disabled');
            }
            else {
                document.getElementById('profileUp').classList.remove('disabled');
                document.getElementById('profileDown').classList.remove('disabled');
            }
            return state
        }
        case 'UP': {
            let index = state.tabs.findIndex(tab => tab.id === state.chosenTab)
            let tabs = [...state.tabs]
            let tmpTab = tabs.filter(tab => tab.id === state.chosenTab)[0]
            if (index !== 0) {
                tabs[index] = tabs[index - 1]
                tabs[index - 1] = tmpTab
            }
            return { ...state, tabs }
        }
        case 'DOWN': {
            let index = state.tabs.findIndex(tab => tab.id === state.chosenTab)
            let tabs = [...state.tabs]
            let tmpTab = tabs.filter(tab => tab.id === state.chosenTab)[0]
            if (index !== state.tabs.length - 1) {
                tabs[index] = tabs[index + 1]
                tabs[index + 1] = tmpTab
            }
            return { ...state, tabs }
        }
        case 'EDITABLE':
            let chosenTab = state.chosenTab
            if (chosenTab !== 'profile1' && chosenTab !== 'profile2' && chosenTab !== 'profile3' && chosenTab !== 'profile4') {
                document.getElementById('profileEdit').classList.add('show');
                document.getElementById('profileDelete').classList.add('show');
            } else {
                document.getElementById('profileEdit').classList.remove('show');
                document.getElementById('profileDelete').classList.remove('show');
            }
            return state
        case 'DELETE': {
            let index = state.tabs.findIndex(tab => tab.id == state.chosenTab)
            let newId
            if (index !== 0) newId = state.tabs[index - 1].id
            else newId = state.tabs[1].id
            let tabs = [...state.tabs].filter(tab => tab.id !== state.chosenTab)
            return {
                ...state,
                tabs,
                chosenTab: newId,
                onDelete: !state.onDelete
            }
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
            let text = state.tabs.find(tab => tab.id === state.chosenTab).name;
            return {
                ...state,
                isEdit: !state.isEdit,
                innerText: text,
                clicked: !state.clicked
            }
        }
        case 'FINISH_EDIT': {
            let innerText = state.innerText;
            let tabs = [...state.tabs]
            let tab = state.tabs.find(tab => tab.id == state.chosenTab)
            if (innerText.trim() !== '') tab.name = innerText
            Object.assign({}, tabs, tab)
            return {
                ...state,
                isEdit: false,
                clicked: true
            }
        }
        case 'CHANGE': {
            let innerText = action.e

            console.log(innerText)
            return {
                ...state,
                innerText: innerText
            }
        }
        default:
            return state
    }
}
