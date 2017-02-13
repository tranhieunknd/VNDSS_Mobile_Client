logic.factory('$vndssLogic_Manhdv', ['$vndssLogicCommon','$ionicPopup', '$resource',
	function($vndssLogicCommon, $ionicPopup, $resource){
		
		var vndssLogic_Manhdv = {
			DsMuaCanhBao: function(type){
				var param = {type: type};
				return $vndssLogicCommon.get("CanhBao/Mua/list",param);
			} ,
			parserList : function (data){
				//console.log(data.data.datas);
				if (data.data && data.data.datas  ){
					return data.data.datas;
				}else{
					return 0;
				}
			} ,	
			MuaCanhBao: function(stationrm){
							var param = {stationrm: stationrm};
							return $vndssLogicCommon.get("CanhBao/Mua/Station", param);
				} ,		
			CanhBaoMucNuocHo: function(lake){
										var param = {lake: lake};
										return $vndssLogicCommon.get("CanhBao/MucNuocHo/Lake", param);
							} ,			
			CanhBaoMua: function(code, type){
										var param = {code: code, type:type};
										return $vndssLogicCommon.get("CanhBao/Mua/Station", param);
							} ,		
			CanhBaoMucNuocSong: function(stationrm){
										var param = {stationrm: stationrm};
										return $vndssLogicCommon.get("CanhBao/mucnuocsong/river", param);
							} ,							
		}
		return vndssLogic_Manhdv;
	}
]);