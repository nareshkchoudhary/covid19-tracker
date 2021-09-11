({
    getApiData : function(component,query,countryName) {
       var columns=this.getMetaData(component);
        var action=component.get("c.getCovidData");
        action.setCallback(this,response=>{
            var state=response.getState();
            if(state==="SUCCESS"||state=="DRAFT"){
                var res=response.getReturnValue();
                console.log(JSON.stringify(res));

                //total stats
                console.log('tt'+res.total);
                component.set("v.totalConfirmed",res.total.TotalConfirmed);
                component.set("v.newConfirmed",res.total.NewConfirmed);
                component.set("v.totalConfirmed",res.total.TotalConfirmed);
                component.set("v.totalDeaths",res.total.TotalDeaths);
                component.set("v.totalRecovered",res.total.TotalRecovered);

                var totalRecords=res.countries.length;
                var pageSize=20;
                var totalPages=Math.ceil(totalRecords/pageSize);
                //for country specific
                var dataArray=[];
                for(var i=0;i<20;i++){
                    if(query==="byCountry" && countryName!='' && res.countries[i].Country.toLowerCase().includes(countryName)){
                         var data={
                        id:i,
                        country:res.countries[i].Country,
                        newConfirmed:res.countries[i].NewConfirmed,
                        totalConfirmed:res.countries[i].TotalConfirmed,
                        newRecovered:res.countries[i].NewRecovered,
                        totalRecovered:res.countries[i].TotalRecovered,
                        newDeaths:res.countries[i].NewDeaths,
                        totalDeaths:res.countries[i].TotalDeaths,

                    };
                    dataArray.push(data);
                    }else if(query=='all'){
                         var data={
                        id:i,
                        country:res.countries[i].Country,
                        newConfirmed:res.countries[i].NewConfirmed,
                        totalConfirmed:res.countries[i].TotalConfirmed,
                        newRecovered:res.countries[i].NewRecovered,
                        totalRecovered:res.countries[i].TotalRecovered,
                        newDeaths:res.countries[i].NewDeaths,
                        totalDeaths:res.countries[i].TotalDeaths,

                    };
                    dataArray.push(data);
                    }
                   
                }
                //console.log("in js:"+data);
                if(dataArray.length!=0 || dataArray!=null){
                    component.set("v.data",dataArray);
                    component.set("v.pageNumber",1);
                    component.set("v.totalPages",totalPages);
                    component.set("v.totalRecords",res.countries.length);
                }
                    
            }else{
                alert('Something went wrong!!');
            }
        });
        $A.enqueueAction(action);
    },
    getApiDataPagination:function(component,pageNumber,pageSize){
        var columns=this.getMetaData(component);
        var action=component.get("c.getCovidData");
        action.setCallback(this,response=>{
            var state=response.getState();
            if(state==="SUCCESS"||state=="DRAFT"){
                var res=response.getReturnValue();
                console.log(JSON.stringify(res));

                //total stats
                console.log('tt'+res.total);
                component.set("v.totalConfirmed",res.total.TotalConfirmed);
                component.set("v.newConfirmed",res.total.NewConfirmed);
                component.set("v.totalConfirmed",res.total.TotalConfirmed);
                component.set("v.totalDeaths",res.total.TotalDeaths);
                component.set("v.totalRecovered",res.total.TotalRecovered);

                var totalRecords=res.countries.length;
                var offset=(pageNumber-1)*pageSize;
                var startRecord=offset+1;
                var recordEnd=totalRecords>=(pageNumber*pageSize)?(pageNumber*pageSize):totalRecords;
                var totalPages=Math.ceil(totalRecords/pageSize);
                console.log("start:"+startRecord+", end:"+recordEnd);

                //for country specific
                var dataArray=[];
                for(var i=startRecord;i<recordEnd;i++){
                         var data={
                        id:i,
                        country:res.countries[i].Country,
                        newConfirmed:res.countries[i].NewConfirmed,
                        totalConfirmed:res.countries[i].TotalConfirmed,
                        newRecovered:res.countries[i].NewRecovered,
                        totalRecovered:res.countries[i].TotalRecovered,
                        newDeaths:res.countries[i].NewDeaths,
                        totalDeaths:res.countries[i].TotalDeaths,

                    };
                    dataArray.push(data); 
                   
                }
                //console.log("in js:"+data);
                if(dataArray.length!=0 || dataArray!=null){
                    component.set("v.data",dataArray);
                    component.set("v.pageNumber",pageNumber);
                    component.set("v.pageSize",pageSize);
                    component.set("v.totalRecords",totalRecords);
                    component.set("v.totalPages",totalPages);
                }
                   
            }else{
                alert('Something went wrong!!');
            }
        });
        $A.enqueueAction(action);
    },
    getMetaData:function(component){
 var columns=[
            {label:"Country",fieldName:"country",type:"text"},
            {label:"New Confirmed",fieldName:"newConfirmed",type:"text"},
            {label:"Total Confirmed",fieldName:"totalConfirmed",type:"text"},
            {label:"New Recovered",fieldName:"newRecovered",type:"text"},
            {label:"Total Recovered",fieldName:"totalRecovered",type:"text"},
            {label:"New Deaths",fieldName:"newDeaths",type:"text"},
            {label:"Total Deaths",fieldName:"totalDeaths",type:"text"},
        ];
        component.set("v.columns",columns);
    }
})
