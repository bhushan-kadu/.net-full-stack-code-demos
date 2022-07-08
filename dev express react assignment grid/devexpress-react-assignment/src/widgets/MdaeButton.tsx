import React from 'react';
import { Button } from 'devextreme-react/button';

export const MdaeButton = (props) => {
    return (<Button
        text={props.text}
        type="default"
        id={props.id}
        className="mdeButton"
        style={props.style}
        onClick={props.onClick}
    />)
}