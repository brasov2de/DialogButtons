
function Dianamics_Calculate_Onload(executionContext){
    const formContext = executionContext.getFormContext();

    const dialogs = FormDialog(formContext, ["orb_comment", "orb_count", "orb_optionsetcode"], "orb_actioncalculatecode",true);
    dialogs.applyDisabled("orb_disabledbuttons", function(){
        return dialogs.getIsDirty()===true ? null : "434350000";
    });
    dialogs.setActions({
        "434350000" : function(){ //calculate                    
            if(dialogs.getIsDirty()===true){     
                const dataToSave = dialogs.attributes.map(function(attribute){                    
                    return [attribute.getName(), attribute.getValue()];
                })         
                Xrm.Navigation.openAlertDialog({text: `Here I can make whatever I need with: ${JSON.stringify(dataToSave)}`})
                    .then(() => formContext.ui.close());
            }
            else{
                Xrm.Navigation.openAlertDialog({text: `Plase introduce the data for the culculation`});
            }
        }, 
        "434350001" : function(){//cancel
            formContext.ui.close();  
        }
    })


}