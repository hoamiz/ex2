import React from 'react';
import { connect } from 'react-redux';


class RightSide extends React.Component {
    render() {
        const { innerText } = this.props
        console.log(innerText)
        return (
            <div class="thx-window">
                <div class="sub-title flex">
                    <h1 id="eqTitle" class="eq-title">{innerText}</h1>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    innerText: state.innerText
})

export default connect(mapStateToProps, null)(RightSide);
