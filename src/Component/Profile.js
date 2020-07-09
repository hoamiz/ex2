import React from 'react';
import { connect } from "react-redux";
import { Active, checkUpDown, canEdit, finishlEdit, onEdit, onChange } from './../Actions/index';
import { render } from '@testing-library/react';

class Profile extends React.Component {


    componentDidMount() {
        this.props.Active('profile1')
        this.props.checkUpDown()
    }
    componentDidUpdate() {
        this.props.checkUpDown()
        this.props.Active()
        this.props.canEdit()
    }
    onClick(id) {
        this.props.Active(id)
        this.props.checkUpDown()
        this.props.canEdit()
    }
    finishlEdit() {
        this.props.finishlEdit()
    }
    onChange(e) {
        let evalue = e.target.value
        this.props.onChange(evalue)
    }
    render() {
        const { state, finishlEdit, onChange } = this.props
        return (
            <div id="profileList" className="scrollable" >
                {state.tabs && state.tabs.map(tab => {
                    return (
                        <div>
                            {state.isEdit && tab.id === state.chosenTab
                                ? <div>
                                    <input
                                        value={state.innerText}
                                        id="profileRename"
                                        className="profile-item show"
                                        placeholder="Enter Profile Name"
                                        maxlength="25"
                                        onChange={this.onChange.bind(this)}
                                        onBlur={this.finishlEdit.bind(this)}
                                    />
                                    <div
                                        onClick={this.onClick.bind(this, tab.id)}
                                        id={tab.id}
                                        className={tab.className}
                                    >
                                        {tab.name}
                                    </div>
                                </div>
                                : <div
                                    onClick={this.onClick.bind(this, tab.id)}
                                    id={tab.id}
                                    className={tab.className}
                                >
                                    {tab.name}
                                </div>}
                        </div>
                    )
                }
                )}
                <input
                    id="profileRename"
                    className="profile-item"
                    placeholder="Enter Profile Name"
                    maxlength="25"
                />
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {

    return {
        Active: (id) => dispatch(Active(id)),
        checkUpDown: () => dispatch(checkUpDown()),
        canEdit: () => dispatch(canEdit()),
        onEdit: () => dispatch(onEdit()),
        finishlEdit: () => dispatch(finishlEdit()),
        onChange: (e) => dispatch(onChange(e)),
    }
}

const mapStateToProps = (state) => ({
    state: state

})
export default connect(mapStateToProps, mapDispatchToProps)(Profile);