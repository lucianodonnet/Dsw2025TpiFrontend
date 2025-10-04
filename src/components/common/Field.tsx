export interface FieldProps {
    type?: string;
    name: string;
    value: string;
    id: string;
    isRequired?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    children?: ReactElement | ReactElement[];
}
import React, { ReactElement } from 'react';
function FieldText( props: FieldProps) {
    return (
    <>
        <fieldset>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                type={props.type || "text"}
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                required={props.isRequired}
            />
            {props.children}
        </fieldset>
    </>
    );
}

export default FieldText;