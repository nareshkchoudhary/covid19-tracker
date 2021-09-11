({
    handlePagination: function(component, event, helper) {
        var id=event.getSource().getLocalId();
        var flag=0;
        if(id==="first"){
            flag=1;
        }else if(id==="next"){
            flag=2;
        }else if(id==="previous"){
            flag=-1;
        }else if(id==='last'){
            flag=-2;
        }
        var evt=component.getEvent("paginationEvent");
        evt.setParams({"flag":flag});
        evt.fire();
    }
})
