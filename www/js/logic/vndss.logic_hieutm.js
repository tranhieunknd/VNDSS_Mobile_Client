logic.factory('$vndssLogic_Hieutm', ['$vndssLogicCommon','$ionicPopup', '$resource',
	function($vndssLogicCommon, $ionicPopup, $resource){
		var vndssLogic_Hieutm = {
			memberTypeList : function(){
				console.log('vao logic member Type list');
				var param = {value: 2};
				return $vndssLogicCommon.get(
					'GetData_demo',
					param);
			},
			memberTypeList_post : function(){
				console.log('vao logic member Type list');
				var param = {};
				return $vndssLogicCommon.post(
					'GetData',
					param);
			},
			memberTypeList_post_ngoai : function(){
				console.log('vao logic member Type list');
				var param = {};
				return $vndssLogicCommon.postpublic(
					'http://localhost:27302/Service1.svc/LoadAllDocument',
					param);
			},
			callResource: function(){
				var demo = $resource('http://localhost:27302/Service1.svc/GetData', {}, {
					query: {method:'GET', params:{entryId:''}, isArray:true},
					post: {method:'POST'},
					update: {method:'PUT'},
					remove: {method:'DELETE'}
				});
				return demo;
			},
			LocationCanhBaoHo: function(){
				var param = {};
				return $vndssLogicCommon.get("CanhBao/MucNuocHo/KML", param);
			},
			LocationCanhBaoSong: function(){
				var param = {};
				return $vndssLogicCommon.get("CanhBao/MucNuocSong/KML", param);
			},
			LocationCanhBaoMua: function(){
				var param = {};
				return $vndssLogicCommon.get("CanhBao/Mua/KML", param);
			},
			GetInfoGeoJson: function(tablename, geomid){
				var param = {tablename: tablename, geomid: geomid};
				return $vndssLogicCommon.get("Geome", param);
			},
			GetAshxTLVN: function(tablename, geomid){
				var param = {};
				var url= 'http://thuyloivietnam.vn/MapObject.ashx?table=' + tablename + '&id=' + geomid;
				console.log(url)
				return $vndssLogicCommon.getfullurl(url, param);
			},
			ListCamera: function(){
				var param = {};
				return $vndssLogicCommon.get("Camera/List", param);
			} ,
			CheckLogin: function(user, pass){
				var param = {userName: user, passWord: pass};
				return $vndssLogicCommon.get("Account/Login", param);
			}
		}
		return vndssLogic_Hieutm;
	}
]);