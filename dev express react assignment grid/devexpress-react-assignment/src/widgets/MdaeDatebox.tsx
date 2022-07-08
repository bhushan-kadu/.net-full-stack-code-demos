import React from 'react';
import { DateBox } from 'devextreme-react/date-box';

export const MdaeDatebox = (props) => {
    return (<DateBox
        className="mdaeDatebox"
        name={props.name}
        max={props.max}
        value={props.value}
        onChange={props.onChange}
        onValueChanged={props.onChange}
    />)
}