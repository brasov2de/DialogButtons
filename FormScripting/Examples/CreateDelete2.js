
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