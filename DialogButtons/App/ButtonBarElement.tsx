import * as React from 'react';
import {DefaultButton } from '@fluentui/react/lib/Button';
import { mergeStyles } from '@fluentui/react/lib/Styling';


export interface IButtonBarElementProps{
    label : string, 
    value : number,
    color ?: string, 
    isPrimary : boolean,
    isDisabled: boolean,    
    iconName ?: string, 
    setValue: (value : number |undefined) => void
}


export const ButtonBarElement = React.memo(function ButtonBarElementComponent({label, value, color,isPrimary, isDisabled, iconName, setValue}: IButtonBarElementProps ) : JSX.Element{
    const handleClick = React.useCallback(() => {
        setValue(value);
    },[]);
             
    const getStyles = (color : string | undefined, primary: boolean) => {
        if(color===undefined){
            return undefined;
        }
        const highlightStyle = {
            backgroundColor: color ,                    
            borderColor: color, 
            filter: "brightness(75%)"
        }        
        return mergeStyles({
            backgroundColor: primary===true ? color : "white" ,
            color: primary === true ? undefined : color,
            borderColor: color
            }, {   
                selectors: {                 
                ":active": highlightStyle, 
                ":visited": highlightStyle, 
                ":hover": highlightStyle,  
                ":disabled": {  
                    backgroundColor: "transparent",                  
                }   
            }                                                                   
        })
    }
    return <DefaultButton primary
                    key={value}         
                    text={label}
                    value = {value}            
                    onClick={handleClick}                               
                    className={getStyles(color, isPrimary)}
                    iconProps={ {iconName}}                          
                    disabled={isDisabled}
                />
   
}, (prevProps, newProps) => {
    return prevProps.isDisabled === newProps.isDisabled  
    && prevProps.label === newProps.label
    && prevProps.color === newProps.color
    && prevProps.iconName === newProps.iconName
} );