import React, { useRef, useState } from 'react';
import cx from 'classnames';

const Switch = ({ label, onClick, children, disabled, checkedDefault }) => {
    const [checked, setChecked] = useState(checkedDefault || false);
    const switchRef = useRef(null);
    const switchCheckChange = async (e) => {
        if(disabled) return;
        switchRef.current.click();
        if(typeof onClick === 'function') await onClick();
    }

    const checkClick = (e) => {
        // this stops event bubbling and prevents from onClick to be called two times
        e.stopPropagation();
        setChecked(val => !val);
    }

    return (
        <div className={cx("switch-container", { "disabled" : disabled })}>
            <div className="switch" onClick={switchCheckChange}>
                <input type="checkbox" className="switch-check" ref={switchRef} onClick={checkClick} checked={checked}/>
                <div></div>
            </div>
            <label htmlFor="switch" className="switch-label">{label || children}</label>
        </div>
    );
}
 
export default Switch;