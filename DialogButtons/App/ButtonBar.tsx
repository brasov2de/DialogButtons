import * as React from 'react';
import {Stack} from '@fluentui/react/lib/Stack';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import {DefaultButton } from '@fluentui/react/lib/Button';
import { ButtonBarElement } from './ButtonBarElement';


export interface IButtonBarProps{
    options: ComponentFramework.PropertyHelper.OptionMetadata[];
    visibleButtons: string |null;
    disabledButtons:string | null;
    icons : any;
    align: "RIGHT" | "CENTER" | "LEFT";
    useOptionsColor: "YES" | "NO";
    setValue: (value : number |undefined) => void;    
}

initializeIcons();

export const ButtonBar = React.memo(function ButtonBarComponent({options, visibleButtons, disabledButtons, icons, align,useOptionsColor, setValue}: IButtonBarProps ) : JSX.Element{
    const parseButtonsInput = (input : string | null) : (number | undefined) [] |undefined => {
        if(input == null) {
            return undefined;
        }
        const values = input.split(";").map((val) => {
            const value = parseInt(val, 10);
            return (options.find((option) => option.Value===value)) ? value : undefined;
        }).filter(Boolean);
        return values.length===0 ? undefined : values;
    }

    const disabledBtns = parseButtonsInput(disabledButtons);
    const visibleBtns = parseButtonsInput(visibleButtons);
   
    return <Stack horizontal wrap horizontalAlign={align==="LEFT" ? "start" : (align==="CENTER" ? "center" : "end" ) } tokens={{childrenGap: "1%", padding: "5px"}} style={{marginTop: "20px"}}>
        {options.map((option) => ( visibleBtns === undefined || visibleBtns.includes(option.Value)) ?   
        <ButtonBarElement   
            key={option.Value}         
            label={option.Label}
            value = {option.Value}
            setValue={setValue}
            color={useOptionsColor==="YES" ? option.Color : undefined}
            iconName={icons[option.Value]}
            isDisabled={disabledBtns!=undefined && disabledBtns?.includes(option.Value)} 
        />
            : undefined
        )}
    </Stack>
}, (prevProps, newProps) => {
    return prevProps.options === newProps.options 
    && prevProps.disabledButtons === newProps.disabledButtons
    && prevProps.visibleButtons === newProps.visibleButtons        
})