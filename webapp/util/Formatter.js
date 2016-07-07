jQuery.sap.declare("stock.util.Formatter");

stock.util.Formatter = {
		
		
		getNumberOfItems: function(sOrderID){  
			//alert(this.getView().getModel().getProperty("/Product("+sOrderID+")/order_id").length); 
			sOrderID = 1;
			 return   sOrderID;
			},
		

		productCount : function (oValue) {
		    //return the number of products linked to Category // sync call only to get $count
		   // if (oValue) {
			
		        //var sPath = this.getBindingContext().getPath() + '/status';
			var b = a;
		       return 1;
		       // alert(sPath);
		        //var oBindings = this.getModel().bindList(sPath);
		        //return oBindings.getLength();
		    //}
/*function productCount (oValue) {
		    //return the number of products linked to Category // sync call only to get $count
		    if (oValue) {
		    	alert("HOLA");
		        var sPath = this.getBindingContext().getPath() + '/status';
		        alert(sPath);
		        var oBindings = this.getModel().bindList(sPath);
		        return oBindings.getLength();
		    }*/
		}

};