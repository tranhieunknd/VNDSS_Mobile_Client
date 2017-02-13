// 30-03-2016 HoaPT
controllerGlobal.controller('LoginCtrl', function($scope, $rootScope, $document, $location, $state, $http, $vndssLogicCommon, $vndssLogic_Hieutm) {
	
	$scope.initLogin =  function(){
		
		var url = "";
		if(ionic.Platform.isAndroid()){
			url = "/android_asset/www/";
		}
		// try{
			// $http.get('appdata/data.json')
			// .success(function (data) {
				// // The json data will now be in scope.
				// $scope.myJsonData = data;
				// alert(data);
				// console.log(data);
			// });
		// }catch(ex){
			// console.log(ex);
		// }
		
		// var x = document.getElementById("usernameid");
		// console.log(x);
		
		// console.dir(ionic.Platform.device());
		// console.dir(ionic.Platform.platform());
		// console.dir(ionic.Platform.version());
	}
	
	$scope.LogIn = function(username, password){
		
		function handLogin(data){
			console.log(data);
			if(data.data.UserId)
				$location.path('/tab/warning');
			else{
				$vndssLogicCommon.popupError("Thông tin đăng nhập không chính xác!", "Thông báo")
			}
		}
		
		var http = $vndssLogic_Hieutm.CheckLogin(username, password);
		http.success(handLogin);
	}
});