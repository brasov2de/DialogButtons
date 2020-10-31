import * as React from 'react';
import {DefaultButton } from '@fluentui/react/lib/Button';


export interface IButtonBarElementProps{
    label ?: string, 
    value : number,
    color ?: string, 
    isDisabled: boolean,    
    iconName ?: string, 
    setValue: (value : number |undefined) => void
}


export const ButtonBarElement = React.memo(function ButtonBarElementComponent({label, value, color, isDisabled, iconName, setValue}: IButtonBarElementProps ) : JSX.Element{
    const handleClick = React.useCallback(() => {
        setValue(value);
    },[]);
    return <DefaultButton key={value} primary
    text={`${label}`}
    style={{backgroundColor: color}}
    iconProps={ {iconName: iconName}}
    onClick={handleClick}
    disabled={isDisabled}
    />    
}, (prevProps, newProps) => {
    return prevProps.isDisabled === newProps.isDisabled  
    && prevProps.label === newProps.label
    && prevProps.color === newProps.color
    && prevProps.iconName === newProps.iconName
} );