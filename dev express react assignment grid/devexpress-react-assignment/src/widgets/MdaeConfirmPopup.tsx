import React from 'react';
import { Popup } from 'devextreme-react/popup';

export const MdaeConfirmPopup = (props) => {
    return (<Popup
        contentTemplate={props.contentTemplate}
        title='Confirm'
        width='400px'
        height='120px'
        toolbarItems={[{
            widget: "dxButton",
            toolbar: "bottom",
            location: "before",
            options: {
                text: "Yes",
                onClick: props.onYesClick
            }
        },
        {
            widget: "dxButton",
            toolbar: "bottom",
            location: "after",
            options: {
                text: "No",
                onClick: function (e) {
                    props.close(false)
                }
            }
        }]}
        onHidden={() => { props.close(false) }}
        visible={props.visible}
    />)
}