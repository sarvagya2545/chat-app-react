import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { CLEAR_ERRORS } from '../../redux/actions/types';

class ErrBox extends Component {

    clearErrors = () => {
        this.props.clearErrors()
    }

    render() { 
        const { isError, errType, statusCode, errArray, clearErrors } = this.props;
        return (
            <>
                <div className={cx("err-box-filter", { "visible": isError })}/>
                <div className={cx("err-box", { "visible": isError })}>
                    <div className="head">
                        <h2>Error!</h2>
                        <button className="btn btn-close close" onClick={e => clearErrors()}>&#x2716;</button>
                    </div>
                    <div className="middle">
                        <p className="err-status">{statusCode}</p>
                        <p className="err-type">{errType}</p>
                    </div>
                    <div className="errors">
                        {errArray.map((err, index) => <p className="err-message" key={index}>{err}</p>)}
                    </div>
                    <button className="btn btn-submit" onClick={e => clearErrors()}>OK</button>
                </div>
            </>
        );
    }
}

const getArrayFromObject = (obj) => {
    if(!obj) 
        return []
    else
        // gets the keys of obj as an array and returns it as an array of values
        return Object.keys(obj).map(key => obj[key])
}
 
const mapStateToProps = state => {
    const { isError, errType, statusCode } = state.errors
    const errObj = isError ? state.errors.errors : null;
    const errArray = isError ? getArrayFromObject(errObj) : [];

    return {
        isError,
        errType,
        statusCode,
        errArray
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearErrors: () => {
            dispatch({ type: CLEAR_ERRORS })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrBox);