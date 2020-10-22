import * as React from 'react';
import {DefaultButton } from '@fluentui/react/lib/Button';
import {Stack} from '@fluentui/react/lib/Stack';
import { initializeIcons } from '@fluentui/react/lib/Icons';


export interface IButtonBarProps{
    options: ComponentFramework.PropertyHelper.OptionMetadata[];
    visibleButtons: number[];
    enabledButtons: number[];
    icons : any;
    align: "RIGHT" | "CENTER" | "LEFT";
    setValue: (value : number |undefined) => void;    
}

initializeIcons();

export const ButtonBar = React.memo(function ButtonBarComponent({options, visibleButtons, enabledButtons, icons, align, setValue}: IButtonBarProps ) : JSX.Element{
    return <Stack horizontal wrap horizontalAlign={align==="LEFT" ? "start" : (align==="CENTER" ? "center" : "end" ) } tokens={{childrenGap: "1%", padding: "5px"}}>
        {options.map((option) => visibleButtons.includes(option.Value) ?
         <DefaultButton primary
            text={`${option.Label}`}
            style={{backgroundColor: option.Color, width: "150px"}}
            iconProps={ {iconName: icons[option.Value]}}
            />    
            : undefined
        )}
    </Stack>
})