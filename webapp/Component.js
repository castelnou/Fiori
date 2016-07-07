jQuery.sap.declare("stock.Component");
sap.ui.localResources("util");


var serviceUrl = "/sap/opu/odata/sap/ZSTOCK_SRV/?sap-client=100";

function getServiceURL(){
	//Get the service URL from the SAP NetWeaver Gateway Catalog service.
	jQuery.sap.require("util.ServiceNegotiation");
	return useNegotiation ? getNegotiationService() : serviceUrl;
}

sap.ui.core.UIComponent.extend("stock.Component", {

	createContent : function() {

		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "stock.view.App",
			type : "JS",
			viewData : { component : this }
		});

		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "i18n/messageBundle.properties"
		});
		oView.setModel(i18nModel, "i18n");

//		// Using OData model to connect against a real service
		//var oModel = new sap.ui.model.odata.ODataModel(serviceUrl, false, "", "", null,null, null, true);
		var oViewModel = new  sap.ui.model.json.JSONModel();
		//var oModel = new sap.ui.model.odata.v2.ODataModel("proxy/http/deverp01.avenida.com.ar:8000/sap/opu/odata/sap/ZSTOCK_SRV/?sap-client=100",true);
		var oModel = new sap.ui.model.odata.ODataModel("proxy/http/deverp01.avenida.com.ar:8000/sap/opu/odata/sap/ZSTOCK_SRV/?sap-client=100",true);
		
		oModel.setCountSupported(false);
		 
		
		var oData =	oModel.read('HeaderSet',null, [],false,
				function(oData,response){
			oViewModel.setData(oData.results);
		},
		function(oError){
			sap.ui.commons.MessageBox.show(JSON.parse(oError.response.body).error.message.value, null, 'Error');
		});
		
		//this.getView().setModel(oData);
		oViewModel.setData(oModel.oData);
		oView.setModel(oViewModel);		
		
		
		 /* var oODataJSONModel = new sap.ui.model.json.JSONModel();  
		  oODataJSONModel.setData({ modelData : oData }); 
		oView.setModel(oODataJSONModel);*/
		
	    //oModel.setCountSupported(false);
		// set global models
		sap.ui.getCore().setModel(oModel,'oModel');
	
		
		
		/*var url = ""; //+ "/CorpBudgetOpBudgetHeader/CorpBudgetOpBudgetLinesSet"; */
       // var oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);  
     /*   var oModelJson = new sap.ui.model.json.JSONModel();  
        oModel.read('HeaderSet', null, null, false, function(oData, oResponse) {  
                  oModelJson.setData(oData);  
        }, null);  
        var data = oModelJson.getData();  	*/
        
		

		// Using a local model for offline development
		//var oModel = new sap.ui.model.json.JSONModel("model/mock.json");
		oView.setModel(oModel);

		// done
        //oView.setModel(oModelJson);
		return oView;
	}
});
