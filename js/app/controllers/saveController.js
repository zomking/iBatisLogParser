tipJS.controller({
	name : "app.saveController",
	async: true,

	beforeInvoke:function(){
		tipJS.debug(this.name + ".beforeInvoke");
	},
	isRequiredOk : function ( params ) {
		var parserView = this.loadView("parserView");
		if ( $.trim ( parserView.get$txt_parsing().val() ) === "" ) {
			parserView.set$div_alertType("Required Error");
			parserView.set$div_alertMsg("Parsed SQL 이 없습니다. - parse 후 저장하세요.");
			parserView.get$txt_origin().focus();
			parserView.get$class_alert().show();
			return false;
		} 
		return true;
	},
	invoke : function( params ){
		var parsedSql = this.loadView("parserView").get$txt_parsing().val();

		if ( !this.isRequiredOk() ) {
			return false;
		}

		var parserModel = this.loadModel("parserModel");
		var maxKey = parserModel.getMaxKey();
		parserModel.setParsedSQL(maxKey, parsedSql);
	}
});
