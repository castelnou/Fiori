jQuery.sap.require("stock.util.Formatter");

sap.ui.controller("stock.view.Detail", {

	handleNavButtonPress : function (evt) {
		this.nav.back("Master");
	},
	

});