logic.factory('$vndssLogic_Hoapt', ['$vndssLogicCommon', '$ionicPopup',
	function($vndssLogicCommon, $ionicPopup){
		var vndssLogic_Hoapt = {
			DsMuadubao: function(){
				return $vndssLogicCommon.get("DuBao/Mua/List",{});
			} ,
			DsDongChayDuBao: function(){
				return $vndssLogicCommon.get("DuBao/DongChay/List",{});
			} ,
			parserList : function (data){
				//console.log(data.data.datas);
				if (data.data && data.data.datas  ){
					return data.data.datas;
				}else{
					return 0;
				}
			} ,			
			MuaDuBao: function(station, from, to){
				var param = {station: station,  from: from, to: to};
				return $vndssLogicCommon.get("MuaDuBao", param);
			} ,
			DongChayDuBao: function(lake, from, to){
				var param = {lake: lake,  from: from, to: to};
				return $vndssLogicCommon.get("DongChayDuBao", param);
			} ,
			DsMuaCanhBao: function(type){
				var param = {type: type};
				return $vndssLogicCommon.get("CanhBao/Mua/list",param);
			} ,
			MucNuocSong: function(){
				return $vndssLogicCommon.get("CanhBao/MucNuocSong/List",{});
			} ,
			MucNuocHo: function(){
				return $vndssLogicCommon.get("CanhBao/MucNuocHo/List",{});
			} ,
		}
		return vndssLogic_Hoapt;
	}
	
	/* DsMuadubao: function(){  var param = {};
								return this.get('driver_login.php',param);} */			 
	// MuaDuBao - param: {station: ''}
]);