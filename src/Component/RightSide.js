import React from 'react';
import { connect } from 'react-redux';

class RightSide extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            inner: 'Default'
        }
    }
    componentDidUpdate() {
        let inner = this.props.innerText
        let tabName = this.props.tabs.find(tab => tab.id === this.props.chosenTab).name
        if (inner.trim() !== '') this.setState({ inner: inner })
        else this.setState({ inner: tabName })
    }
    render() {
        return (
            <div className="thx-window">
                <div className="sub-title flex">
                    <h1 id="eqTitle" className="eq-title">{this.state.inner}</h1>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    innerText: state.innerText,
    chosenTab: state.chosenTab,
    tabs: state.tabs
})

export default connect(mapStateToProps, null)(RightSide);
