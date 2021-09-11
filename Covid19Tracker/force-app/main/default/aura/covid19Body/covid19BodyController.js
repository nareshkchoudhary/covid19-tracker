({
    doInit : function(component, event, helper) {
        helper.getApiData(component,'all');
    },
     showSpinner: function(component, event, helper) {
        // make Spinner attribute true for displaying loading spinner 
        component.set("v.spinner", true); 
    },
     
    // function automatic called by aura:doneWaiting event 
    hideSpinner : function(component,event,helper){
        // make Spinner attribute to false for hiding loading spinner    
        component.set("v.spinner", false);
    },
    searchByCountry:function(component,event,helper){
        var countryName=event.getParam("countryName");
        console.log("countryName in parent:"+countryName);
        if(countryName!='' && countryName!=undefined){
            helper.getApiData(component,'byCountry',countryName);
        }else{
            helper.getApiData(component,'all');
        }
        
    },
    handlePagination:function(component,event,helper){
        var flag=event.getParam("flag");
        console.log("which button presses:"+flag);

        var pageNumber=component.get("v.pageNumber");
        var pageSize=component.get("v.pageSize");

        if(flag===1){
            //first pressed
            pageNumber=1;
            helper.getApiDataPagination(component,pageNumber,pageSize);
            
        }else if(flag==-1){
            //previous pressed
            pageNumber--;
            helper.getApiDataPagination(component,pageNumber,pageSize);
        }else if(flag===2){
            //next pressed
            pageNumber++;
            helper.getApiDataPagination(component,pageNumber,pageSize);
        }else if(flag===-2){
            //last
            var totalPages=component.get("v.totalPages");
            pageNumber=totalPages;
            helper.getApiDataPagination(component,pageNumber,pageSize);
        }
    }
   
})
