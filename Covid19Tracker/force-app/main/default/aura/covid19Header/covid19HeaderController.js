({
    refresh:function(component,event,helper){
       location.reload();
    },
    searchKeyChange:function(component,event,helper){
        var evt=component.getEvent("searchEvent");
        console.log(component.get("v.country"));
        evt.setParams({"countryName":component.get("v.country")});
        evt.fire();
    }
})
