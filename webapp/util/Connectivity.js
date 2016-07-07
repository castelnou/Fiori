jQuery.sap.declare("util.Connectivity");
 //Service Root URL
// "http://10.1.1.8:8000/sap/opu/odata/sap/ZGW_PRODUCT_SRV_01/?sap-client=100";
//Extract the relative URL to use this application for deployment on any Web Server
var serviceUrl = "http://deverp01.avenida.com.ar:8000/sap/opu/odata/sap/zgw_product_srv_01/?sap-client=100";

function getServiceURL(){
	//Get the service URL from the SAP NetWeaver Gateway Catalog service.
	jQuery.sap.require("util.ServiceNegotiation");
	return useNegotiation ? getNegotiationService() : serviceUrl;
}

function createModel(){  

	var oModel = new sap.ui.model.odata.ODataModel(getServiceURL(), false, "", "", null,null, null, true);
    oModel.setCountSupported(false);
	// set global models
	sap.ui.getCore().setModel(oModel);
    
	oModel.attachRequestCompleted(function(oEvent) {
	    sap.ui.getCore().getEventBus().publish("busyDialog","close");
	});

	oModel.attachRequestSent(function(oEvent) {
	    sap.ui.getCore().getEventBus().publish("busyDialog","open");
	});

	oModel.attachParseError(function(oEvent) {
	    displayError({
		message : oEvent.getParameter("message"),
		responseText : oEvent.getParameter("responseText"),
		statusCode : oEvent.getParameter("statusCode"),
		statusText : oEvent.getParameter("statusText")
	    });
	});

	oModel.attachRequestFailed(function(oEvent) {
	    displayError({
		message : oEvent.getParameter("message"),
		responseText : oEvent.getParameter("responseText"),
		statusCode : oEvent.getParameter("statusCode"),
		statusText : oEvent.getParameter("statusText")
	    });
	});
	
}

	
