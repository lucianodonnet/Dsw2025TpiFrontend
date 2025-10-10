export interface FieldProps {
    type?: string;
    name: string;
    value: string;
    id: string;
    isRequired?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
}
import React from 'react';
function FieldText( props: FieldProps) {
    return (
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
        </fieldset>
    );
}

export default FieldText;