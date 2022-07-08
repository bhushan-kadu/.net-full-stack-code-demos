import React from 'react';
import { TextBox } from 'devextreme-react/text-box';

export const MdaeTextBox = (props) => {
    return (<TextBox
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        maxLength={props.maxLength}
        className="mdeTextBox"
    />)
}