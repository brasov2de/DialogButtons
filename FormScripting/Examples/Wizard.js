

function FormDialog(formContext, attributeNames, actionAttributeName, autosetOnSubmitModeNever ){
    let actions = {};   
    
    var disabledAttributeName, checkDisabledState;
    const applyDisabled = function(attributeName, checkFunction){
        disabledAttributeName = attributeName;
        checkDisabledState = function(){
            const valDisabled = checkFunction();
            formContext.getAttribute(disabledAttributeName).setValue(valDisabled==null ? "," : valDisabled)
        };
        myAttributes.forEach(function(attribute){           
                attribute.addOnChange(checkDisabledState);      
        });
        checkDisabledState();
    }

    var visibleAttributeName, checkVisibleState;
    const applyVisible = function(attributeName, checkFunction){
        visibleAttributeName = attributeName;
        checkVisibleState = function(){
            const valVisible = checkFunction();
            formContext.getAttribute(visibleAttributeName).setValue(valVisible==null ? "," : valVisible)
        };
        myAttributes.forEach(function(attribute){           
            attribute.addOnChange(checkVisibleState);      
    });
        checkVisibleState();
    }

    
    //hide header and footer
    formContext.ui.footerSection.setVisible(false);
    formContext.ui.headerSection.setBodyVisible(false);
    formContext.ui.headerSection.setCommandBarVisible(false);
    formContext.ui.headerSection.setTabNavigatorVisible(false);
   
  //set all attributes on "never" submit
    if(autosetOnSubmitModeNever===true){
        formContext.data.entity.attributes.forEach(function(attribute){        
            attribute.setSubmitMode  && attribute.setSubmitMode("never");        
        });
    }

    const myAttributes = attributeNames.map(function(attrName){
        return formContext.getAttribute(attrName);
    }).filter(Boolean);

   

    function getIsDirty(){
        return myAttributes.some(function(attribute){
            return attribute.getValue()!=null
        });
    }

    function myAction(){        
        const attr = formContext.getAttribute(actionAttributeName);
        if(attr==null || attr.getValue()==null){
            return;
        } 
        const fn = actions[attr.getValue()];
        if(fn){
            fn();
        } 
    }

    formContext.getAttribute(actionAttributeName).addOnChange(myAction);    

    return {
        getIsDirty: getIsDirty, 
        attributes : myAttributes, 
        applyDisabled: applyDisabled, 
        applyVisible : applyVisible, 
        setActions : function(value){
            actions = value;
        }
    }      
}


function Dianamics_Wizard_Onload(executionContext){
    const formContext = executionContext.getFormContext();

    let stage = 1;
    function setStage(newStage){
        stage = newStage;        
        if(stage===1){            
            formContext.ui.tabs.get("Stage1").setFocus();
            formContext.getAttribute("orb_disabledbuttons").setValue("434350000;434350002");
        }
        if(stage===2){
            formContext.ui.tabs.get("Stage2").setFocus();
            formContext.getAttribute("orb_disabledbuttons").setValue("434350001");
        } 
    }

    const dialogs = FormDialog(formContext, ["orb_comment", "orb_count", "orb_optionsetcode", "ownerid"], "orb_wizardcode",true);
    setStage(1);    
   
    dialogs.setActions({
        "434350000": function(){
            setStage(1);

        },
        "434350001": function(){
            setStage(2);

        },
        "434350002" : function(){ //calculate                    
            const dataToSave = dialogs.attributes.map(function(attribute){                    
                return [attribute.getName(), attribute.getValue()];
            });     
            Xrm.Navigation.openAlertDialog({text: `Here I can make whatever I need with: ${JSON.stringify(dataToSave)}`})
                .then(() => formContext.ui.close());
           
        }, 
        "434350003" : function(){//cancel
            formContext.ui.close();  
        }
    })
}

/*
Xrm.Navigation.navigateTo({
    pageType: "entityrecord", 
    entityName: "orb_dialog", 
    entityId: "83BD09D6-930D-EB11-A813-000D3A23CB53", 
    formId:"725c0f2a-ce76-4733-9b66-a4c1875f3860", 
    createdFromEntity: {entityType: "orb_testentity", id: Xrm.Page.data.entity.getId(), name: "dummy"}
}, {
    target: 2, 
    width: 600, 
    height: 350, 
    position: 1})
    .then(console.log, console.error)
    */

    /*
    no functionality
   Xrm.Navigation.navigateTo({
    pageType: "entityrecord", 
    entityName: "orb_dialog", 
    entityId: "83BD09D6-930D-EB11-A813-000D3A23CB53", 
    formId:"77b9e858-9742-44b3-87f3-829a6c2bbc7d", 
    createdFromEntity: {entityType: "orb_testentity", id: Xrm.Page.data.entity.getId(), name: "dummy"}
}, {
    target: 2, 
    width: 600, 
    height: 350, 
    position: 1})
    .then(console.log, console.error)
    */

   