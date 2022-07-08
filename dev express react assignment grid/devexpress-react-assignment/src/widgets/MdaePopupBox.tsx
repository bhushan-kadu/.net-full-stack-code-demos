import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Popup } from 'devextreme-react/popup';

const MdaePopupBox = (props, ref) => {
    const popup = useRef(null);
    useImperativeHandle(ref, () => ({
        visible: (isVisible) => {
            popup.current.instance.option('visible', isVisible);
        }
    }));
    return (
        <Popup
            ref={popup}
            className={props.className}
            visible={props.popupState.visible}
            title={props.title}
            onHiding={props.onHiding}
            width={props.width}
            height='auto'
            onShown={props.onShown}
        >
            {props.children}
        </Popup >
    )
}
export default forwardRef(MdaePopupBox)