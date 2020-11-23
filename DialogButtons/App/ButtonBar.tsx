import * as React from 'react';
import {Stack} from '@fluentui/react/lib/Stack';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { useColors } from './useColors';
import { ButtonBarElement } from './ButtonBarElement';




export interface IButtonBarProps{
    options: ComponentFramework.PropertyHelper.OptionMetadata[];
    visibleButtons: string |null;
    disabledButtons:string | null;
    whiteButtons: string | null;
    icons : any;
    align: "RIGHT" | "CENTER" | "LEFT";
    useOptionsColor: "YES" | "NO";
    setValue: (value : number |undefined) => void;    
    webAPI : ComponentFramework.WebApi ;
}



initializeIcons();

export const ButtonBar = React.memo(function ButtonBarComponent({options, visibleButtons, disabledButtons, whiteButtons, icons, align,useOptionsColor, setValue, webAPI}: IButtonBarProps ) : JSX.Element{
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
    const mainColor = useColors(webAPI)?.mainColor;
    const disabledBtns = parseButtonsInput(disabledButtons);
    const visibleBtns = parseButtonsInput(visibleButtons);
    const whiteBtns = parseButtonsInput(whiteButtons)

   
    return <Stack horizontal wrap horizontalAlign={align==="LEFT" ? "start" : (align==="CENTER" ? "center" : "end" ) } tokens={{childrenGap: "1%", padding: "5px"}} style={{marginTop: "20px"}}>
        {options.map((option) => {
           
            if( visibleBtns === undefined || visibleBtns.includes(option.Value)) {
                let primary = true;
                let color : string | undefined = useOptionsColor==="YES" ?  option.Color : undefined;
                if(whiteBtns?.includes(option.Value) || useOptionsColor==="YES" && option.Color?.toLowerCase()==="#ffffff" || option.Color?.toLowerCase()==="white"){
                    primary=false;
                    color = mainColor;
                }
                return <ButtonBarElement
                    key={option.Value}         
                    label={option.Label}
                    value = {option.Value}            
                    setValue={setValue}                               
                    color={color ?? mainColor}
                    isPrimary = {primary}
                    iconName={ icons[option.Value]}
                    isDisabled={disabledBtns!=undefined && disabledBtns?.includes(option.Value)}
                />
            }
            return undefined;
        })
    }
    </Stack>
}, (prevProps, newProps) => {
    return prevProps.options === newProps.options 
    && prevProps.disabledButtons === newProps.disabledButtons
    && prevProps.visibleButtons === newProps.visibleButtons       
    && prevProps.whiteButtons === newProps.whiteButtons 
})