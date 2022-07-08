import { React } from "react";

export const Required = (props) => {
    return <div>{props.name} <div className="divStar">*</div></div>
}