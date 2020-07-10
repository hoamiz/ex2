import React from 'react';
import { connect } from "react-redux";
import { Active, finishlEdit, onEdit, onChange } from './../Actions/index';

class Profile extends React.Component {


    componentDidMount() {
        this.props.Active('profile1')
    }
    componentDidUpdate() {
        this.checkUpDown()
        this.canEdit()
    }
    onClick(id) {
        this.props.Active(id)
    }
    finishlEdit() {
        this.props.finishlEdit()
    }
    onChange(e) {
        let evalue = e.target.value
        this.props.onChange(evalue)
    }
    checkUpDown() {
        let index = this.props.state.tabs.findIndex(tab => tab.id === this.props.state.chosenTab)
        if (index === 0) {
            document.getElementById('profileUp').classList.add('disabled');
            document.getElementById('profileDown').classList.remove('disabled');
        } else if (index === this.props.state.tabs.length - 1) {
            document.getElementById('profileUp').classList.remove('disabled');
            document.getElementById('profileDown').classList.add('disabled');
        }
        else {
            document.getElementById('profileUp').classList.remove('disabled');
            document.getElementById('profileDown').classList.remove('disabled');
        }
    }
    canEdit() {
        if (this.props.state.chosenTab !== 'profile1' && this.props.state.chosenTab !== 'profile2' && this.props.state.chosenTab !== 'profile3' && this.props.state.chosenTab !== 'profile4') {
            document.getElementById('profileEdit').classList.add('show');
            document.getElementById('profileDelete').classList.add('show');
        } else {
            document.getElementById('profileEdit').classList.remove('show');
            document.getElementById('profileDelete').classList.remove('show');
        }
    }
    render() {
        const { state } = this.props
        return (
            <div id="profileList" className="scrollable" >
                {state.tabs && state.tabs.map(tab => {
                    return (
                        <div>
                            {state.isEdit && tab.id === state.chosenTab &&
                                <div>
                                    <input
                                        value={state.innerText}
                                        id="profileRename"
                                        className="profile-item show"
                                        placeholder="Enter Profile Name"
                                        maxlength="25"
                                        onChange={this.onChange.bind(this)}
                                        onBlur={this.finishlEdit.bind(this)}
                                    />
                                </div>
                            }
                            {tab.active
                                ? <div
                                    onClick={this.onClick.bind(this, tab.id)}
                                    id={tab.id}
                                    className={tab.className + ' active'}
                                >
                                    {tab.name}
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
        onEdit: () => dispatch(onEdit()),
        finishlEdit: () => dispatch(finishlEdit()),
        onChange: (e) => dispatch(onChange(e)),
    }
}

const mapStateToProps = (state) => ({
    state: state

})
export default connect(mapStateToProps, mapDispatchToProps)(Profile);