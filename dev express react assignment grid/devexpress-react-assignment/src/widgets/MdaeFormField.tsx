import React from 'react';

export const MdaeFormField = (props) => {
    return (
        <div className="form-field">
            <div className="form-field-label">
                <div>{props.label}
                    {props.required && <div className="requiredStar">*</div>}
                </div>
            </div>
            <div className="form-field-input">
                {props.input}
            </div>
        </div>
    )
}