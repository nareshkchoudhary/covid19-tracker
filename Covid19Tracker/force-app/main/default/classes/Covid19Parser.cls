public with sharing class Covid19Parser {
    public Covid19Parser() {

    }
    @AuraEnabled
    public Total total;
    
    @AuraEnabled
    public List<Countries> countries;
    //table total
    public class Total{
        @AuraEnabled
        public string NewConfirmed;

        @AuraEnabled
        public string TotalConfirmed;

        @AuraEnabled
        public string TotalDeaths;

        @AuraEnabled
        public string TotalRecovered; 

    }
    //table countries
    public class Countries{

         @AuraEnabled
        public string Country; 

          @AuraEnabled
        public string NewConfirmed;
        
         @AuraEnabled
        public string TotalConfirmed; 

         @AuraEnabled
        public string NewDeaths; 

         @AuraEnabled
        public string TotalDeaths; 

         @AuraEnabled
        public string TotalRecovered; 

         @AuraEnabled
        public string NewRecovered; 
    }
    //now we have to parse or change the data from json to this class tables.
    //parse it in Covid19Parser class object

    public static Covid19Parser parse(String json){
        return (Covid19Parser)System.JSON.deserialize(json,Covid19Parser.class);
    }
}
