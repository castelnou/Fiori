sap.ui.jsview("stock.view.App", {

	getControllerName: function () {
		return "stock.view.App";
	},
	
	createContent: function (oController) {
		
		// to avoid scroll bars on desktop the root view must be set to block display
		this.setDisplayBlock(true);
		
		// create app
		this.app = new sap.m.App();
		
		// load the master page
		var master = sap.ui.xmlview("Master", "stock.view.Master");
		master.getController().nav = this.getController();
		this.app.addPage(master, true);
		
		// load the detail page
		var detail = sap.ui.xmlview("Detail", "stock.view.Detail");
		detail.getController().nav = this.getController();
		this.app.addPage(detail, false);
		
		// done
		return this.app;
	}
});