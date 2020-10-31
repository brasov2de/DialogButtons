
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

/*
Xrm.Navigation.navigateTo({
    pageType: "entityrecord", 
    entityName: "orb_dialog", 
    entityId: "83BD09D6-930D-EB11-A813-000D3A23CB53", 
    formId:"830FB574-F340-40E6-AD64-93B2033A1C6E", 
    createdFromEntity: {entityType: "orb_testentity", id: Xrm.Page.data.entity.getId(), name: "dummy"}
}, {
    target: 2, 
    width: 600, 
    height: 350, 
    position: 1
}).then(console.log, console.error)
*/