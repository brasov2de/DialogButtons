
function Dianamics_CreateDelete_Onload(executionContext){
    const formContext = executionContext.getFormContext();

    const dialogs = FormDialog(formContext, ["orb_comment", "orb_count"], "orb_createdeletecancelactioncode",true);
    dialogs.setActions({
        "434350000" : function(){ //calculate                               
            const dataToSave = dialogs.attributes.map(function(attribute){                    
                return [attribute.getName(), attribute.getValue()];
            })         
            Xrm.Navigation.openAlertDialog({text: `Will execute a related create with: ${JSON.stringify(dataToSave)}`})
                .then(() => formContext.ui.close());                        
        }, 
        "434350001" : function(){//delete
            Xrm.Navigation.openAlertDialog({text: `Will execute a delete`})
            .then(() => formContext.ui.close());
        },
        "434350002" : function(){
            formContext.ui.close();
        }
    })


}

/*
Xrm.Navigation.navigateTo({
    pageType: "entityrecord", 
    entityName: "orb_dialog", 
    entityId: "83BD09D6-930D-EB11-A813-000D3A23CB53", 
    formId:"18BCC641-5D5E-433C-8106-C4099F4C9962", 
    createdFromEntity: {entityType: "orb_testentity", id: Xrm.Page.data.entity.getId(), name: "dummy"}
}, {
    target: 2, 
    width: 600, 
    height: 350, 
    position: 1}
).then(console.log, console.error);
*/