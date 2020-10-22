import * as React from 'react';
import {DefaultButton } from '@fluentui/react/lib/Button';
import {Stack} from '@fluentui/react/lib/Stack';
import { initializeIcons } from '@fluentui/react/lib/Icons';


export interface IButtonBarProps{
    options: ComponentFramework.PropertyHelper.OptionMetadata[];
}

initializeIcons();

export const ButtonBar = React.memo(function ButtonBarComponent({options}: IButtonBarProps ) : JSX.Element{
    return <Stack horizontal wrap horizontalAlign="end" tokens={{childrenGap: "1%", padding: "5px"}}>
        <DefaultButton primary           
            iconProps={{iconName: 'Add'}}
        />
        <DefaultButton primary
            text="Test 1233546"
            iconProps={{iconName: 'Add'}}
        />
        <DefaultButton primary
            text="Test"
            iconProps={{iconName: 'Add'}}
        />
        <DefaultButton primary
            text="Test"
            iconProps={{iconName: 'Add'}}
        />
        <DefaultButton primary
            text=">>"            
        />
    </Stack>
})