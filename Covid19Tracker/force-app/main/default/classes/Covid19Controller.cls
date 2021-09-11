public with sharing class Covid19Controller {
    public Covid19Controller() {

    }
    @AuraEnabled
    public static Covid19Parser getCovidData(){
        Covid19Parser cov=new Covid19Parser();
        try {
            string baseUrl='https://api.covid19api.com/summary';
            HttpRequest req=new HttpRequest();
            req.setEndpoint(baseUrl);
            req.setMethod('GET');
            req.setHeader('Accept', 'application/json');
            Http h=new Http();
            HttpResponse res=h.send(req);
            System.debug(res.getBody());

            res.getBody().replace('Global:','Total:');
            cov=Covid19Parser.parse(res.getBody().replace('"Global":','"Total":'));
            System.debug('cov:'+cov.countries);
        } catch (Exception e) {
            System.debug(e);
            throw new AuraHandledException(e.getMessage());
        }
        return cov;
    }
}
