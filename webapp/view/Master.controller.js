jQuery.sap.require("stock.util.Formatter");



sap.ui.controller("stock.view.Master",  {
	
	onInit: function (){
		
		var  oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData("proxy/http/deverp01.avenida.com.ar:8000/sap/bc/ui2/start_up","",false);
	
	    var id = oModel.getProperty("/id");
	    
	    
	    var rejectBtn = this.getView().byId("prueba");
        
	    if(id === "MPETRILLO"){
        rejectBtn.setVisible(true);
	    };
		/*jQuery.sap.require("sap.m.MessageToast");
		 
		var sMessage = id;
		sap.m.MessageToast.show(sMessage);*/
	},

	handleListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("Detail", context);			          
			          
	},

	
	onRefresh: function (){
		
		var model = this.getView().byId("table");
		 var a = model.getBinding("items");
		 a.sFilterParams = null;
		 a.sRangeParams = null;
		 a.aLastContexts = null;
		 a.aFilters = null;

		model.getModel().refresh(true);
	},
	
	onMaterial: function (evt) {
	
	var model = this.getView().byId("table");	
	
	var dialog = new sap.m.Dialog({
		title: 'Buscar Material',
		type: 'Message',
		content: [

					new  sap.ui.layout.VerticalLayout({
						width: '200px',
						content: [
							new sap.m.Input('in1', {
								width: '200px',
								placeholder: "Id Material"
							}),
							new sap.m.Input('in2', {
								width: '200px',
								placeholder: "Descripción"
							}),
							new sap.m.Input('in3', {
								width: '200px',
								placeholder: "EAN"
							}),
						]
			})
		],
		beginButton: new sap.m.Button({
			text: 'Aceptar',
			type: 'Accept',
			press: function() {
				
				var filters = [];
				var matnr = sap.ui.getCore().byId("in1").getValue();
				var desc = sap.ui.getCore().byId("in2").getValue();

				if (matnr != '' ){
					var filter = new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.Contains, matnr);
					filters.push(filter);
				}	if (desc != '' ){
					var filter2 = new sap.ui.model.Filter("Descr", sap.ui.model.FilterOperator.Contains, desc);
					filters.push(filter2);
				}
				
				// update list binding
				//var list = sap.ui.getCore().getView().byId("table");
				var binding = model.getBinding("items");
				binding.filter(filters);
					
				dialog.close();
			}

		}),
		endButton: new sap.m.Button({
			text: 'Cancelar',
			type: 'Reject',
			press: function() {

				dialog.close();
			}
		}),

		afterClose: function() {
			dialog.destroy();
		}
	});

	dialog.open();
},	
	


onProve: function (evt) {
	
	//var model = this.getView().byId("table");	
	
	var dialog = new sap.m.Dialog({
		title: 'Proveedor',
		type: 'Message',
		content: [

					new  sap.ui.layout.VerticalLayout({
						width: 'auto',
						content: [
							
						          
						          
						          
						          
						          
     oTable = new sap.m.List({
	 
    id: "Players",
    items: "/HeaderSet",
    columns: [

    new sap.m.Items({

           width: "1em",
           header: new sap.m.Label({
           text: "First Name"
           })

    })
    ]
})						          
						          
						          
						          
						          
						          
						          
						          
						]
			})
		],
		beginButton: new sap.m.Button({
			text: 'Aceptar',
			type: 'Accept',
			press: function() {
					
				dialog.close();
			}

		}),
		endButton: new sap.m.Button({
			text: 'Cancelar',
			type: 'Reject',
			press: function() {
				dialog.close();
			}
		}),

		afterClose: function() {
			dialog.destroy();
		}
	});

	dialog.open();
},	




	
	onSearch : function (evt) {
		
		// create model filter
		var filters = [];
		var query = evt.getParameter("selectionSet");
		//if (query && query.length > 0) {
		var ob_id = query[0]._$input[0].value;
		var state = query[1]._$input[0].value;
		var date  = query[2]._$input[0].value;
		
			if (ob_id != '' ){
				var filter = new sap.ui.model.Filter("object_id", sap.ui.model.FilterOperator.Contains, ob_id);
				filters.push(filter);
			} if (state != '' ){
				var filter2 = new sap.ui.model.Filter("status", "EQ", state);
				filters.push(filter2);
			}if (date != '' ){
				var filter3 = new sap.ui.model.Filter("date", "GT", date);
				filters.push(filter3);
			}
		//}
		
		// update list binding
		var list = this.getView().byId("list");
		var binding = list.getBinding("items");
		binding.filter(filters);
	},
	
	handleListSelect : function (evt) {
		var context = evt.getParameter("listItem").getBindingContext();
		this.nav.to("Detail", context);
	},
	onReset: function(oEvent) {
		//jQuery.sap.require("sap.m.MessageToast");
		// var params = oEvent.getParameters();
		//var sMessage = "onReset trigered";
		//sap.m.MessageToast.show(sMessage);
	},
		
	handleIconTabBarSelect: function (oEvent) {
		//var oBinding = this._oTable.getBinding("items"),
		var list = this.getView("stock.view.App").byId("list");
		var oBinding = list.getBinding("items"),
			sKey = oEvent.getParameter("key"),
			oFilter,
			filters = [];
		if (sKey === "Rep") {
			 var a = list.getItems();
			 delete a[1];
			
		    oFilter = new sap.ui.model.Filter("status", "EQ", "E0010");
		    filters.push(oFilter);
			
		} else if (sKey === "Res") {
			var oFilter2 = new sap.ui.model.Filter("status", "EQ", "E0003");
			filters.push(oFilter2);
			//oBinding.filter(filters);
		} else if (sKey === "Tes") {
			var oFilter3 = new sap.ui.model.Filter("status", "EQ", "E0009");
			filters.push(oFilter3);
			//oBinding.filter(filters);
			}oBinding.filter(filters);
		//} else {
		//	oBinding.filter([]);
		}

});