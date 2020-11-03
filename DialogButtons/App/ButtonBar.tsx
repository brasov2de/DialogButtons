import * as React from 'react';
import {Stack} from '@fluentui/react/lib/Stack';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import {DefaultButton } from '@fluentui/react/lib/Button'; 



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
        {options.map((option) => {
             const handleClick = React.useCallback(() => {
                setValue(option.Value);
            },[]);
            const getStyles = (color : string | undefined, primary: boolean) => {
                if(color===undefined){
                    return undefined;
                }
                const baseStyle = {
                    backgroundColor: primary===true ? color : "white" ,
                    color: primary === true ? undefined : color,
                    borderColor: color
                }
                return {   
                    root: { 
                       ...baseStyle                        
                    },                     
                    rootHovered: {                         
                           ...baseStyle,
                            filter: "brightness(85%)",
                            selectors: {
                                ":active": {  
                                    ...baseStyle,
                                    filter: "brightness(75%)",
                                }
                            }

                    }
                   
                }
            }
            if( visibleBtns === undefined || visibleBtns.includes(option.Value)) {
                let primary = true;
                let color : string | undefined = useOptionsColor==="YES" ?  option.Color : undefined;
                if(useOptionsColor==="YES" && option.Color?.toLowerCase()==="#ffffff" || option.Color?.toLowerCase()==="white"){
                    primary=false;
                    color = "#3B79B7";
                }
                return <DefaultButton primary
                    key={option.Value}         
                    text={option.Label}
                    value = {option.Value}            
                    onClick={handleClick}                               
                    styles={getStyles(color ?? "#3B79B7", primary)}
                    iconProps={ {iconName: icons[option.Value]}}                          
                    disabled={disabledBtns!=undefined && disabledBtns?.includes(option.Value)}
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
})