import React from 'react';
import { Button } from 'devextreme-react/button';
import './index.scss';
interface IMdaeButton {
    text: string,
    id: string,
    style?: object
    onClick?: (e) => void,
}
export const MdaeButton: React.FC<IMdaeButton> = (props) => {
    return (<Button
        text={props.text}
        type="default"
        id={props.id}
        className="mdae-button"
        style={props.style}
        onClick={props.onClick}
    />)
}