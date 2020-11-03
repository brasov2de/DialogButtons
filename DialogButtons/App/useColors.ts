import * as React from 'react';

const STORAGE_KEY = "ORBIS.PCF.MainColor";

export const useColors = (webAPI: ComponentFramework.WebApi) => {
    
    const [mainColor, setMainColor] = React.useState("#3B79B7");

    React.useEffect(() => {
        const cachedColor = sessionStorage.getItem(STORAGE_KEY);
        if(cachedColor!=null){
            setMainColor(cachedColor);
            return;
        }
        webAPI?.retrieveMultipleRecords('theme', '?$filter=isdefaulttheme eq true')
        .then((result: any) => { 
            const theme = result.entities[0];
            const mainColor = theme.maincolor;
            if(mainColor==null){
                return;
            }
            sessionStorage.setItem(STORAGE_KEY, mainColor);
            setMainColor(mainColor);
        })
        .catch((err: any) => {            
            console.error(err);
        });
    }, []);

    return {mainColor};
}