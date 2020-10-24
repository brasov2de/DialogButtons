
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
