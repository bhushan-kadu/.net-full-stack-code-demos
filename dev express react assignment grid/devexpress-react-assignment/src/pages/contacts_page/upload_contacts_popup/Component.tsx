import React, { useEffect, useRef, useState } from 'react';
import { MdaeFormField } from '../../../widgets/MdaeFormField';
import  {MdaeButton}  from '../../../widgets/MdaeButton';
import MdaePopupBox from '../../../widgets/MdaePopupBox';
import { MdaeFileSelect } from '../../../widgets/MdaeFileSelect';
interface IUploadContactsPopup {
    onsheetSelected: () => void
    onHiding?: (e) => void
    pnlAddContact_shown: (e) => void
    onDownloadSheetClick: (e) => void
    popupState: any
    onFileUploaderInitialize: (e) => void
}
export const UploadContactsPopup: React.FC<IUploadContactsPopup> = (props) => {
    const popupState = { ...props.popupState };

    return (
        <MdaePopupBox id="pnlAddContact"
            popupState={popupState}
            title={"Import Contacts"}
            onHiding={props.onHiding}
            onShown={props.pnlAddContact_shown}
            width='400px'>

            <div className="addContactPanel">
                <MdaeButton
                    id="btnDownloadSheet"
                    text="Download Sample Sheet"
                    onClick={props.onDownloadSheetClick} />
                <MdaeFileSelect
                    onInitialized={props.onFileUploaderInitialize}
                    onValueChanged={props.onsheetSelected}
                    name="lastName" />
            </div>
        </MdaePopupBox>
    )
}