import React, { Component } from 'react';
import {connect} from 'react-redux';

import action from './action.js';

class CmpClick extends Component{
    adds = () => {
        this.props.action_adds();
    }
    render(){
        return (
            <div>
                <p>CmpClick的num : {this.props.ReducerClick}</p>
                <input type="button" value="增加" onClick={this.adds}/>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        ReducerClick: state.ReducerClick
    }
};

export default connect(mapStateToProps,action)(CmpClick);