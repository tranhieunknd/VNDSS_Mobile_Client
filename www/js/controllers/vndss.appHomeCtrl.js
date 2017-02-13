// 09:37 29-03-2016 HieuTM: 
// Trang chu
controllerGlobal.controller('AppHomeCtrl', function($scope, $rootScope, $state, $location, $vndssHelperCommon, $ionicFilterBar, $ionicLoading,$interval, $ionicHistory) {
	 $scope.search;
	 $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.items,
            update: function (filteredItems, filterText) {
                $scope.items = filteredItems;
                if (filterText) {
					$scope.search=filterText;
                }
				else
				{
					$scope.search='';
				}
            }
        });
	}
	
	$rootScope.fun = {
		initPage: function(){}
	}
	console.log("========App Home=======");
	// HieuTM: tro ve trang chu
	$rootScope.homeBack =  function(){
		try{
			$location.path('#/tab/forecast');	
		}catch(e){
			console.log(e);
		}
	}
	$rootScope._homeBack =  function(){
		try{
			$location.path('#/tab/warning');	
		}catch(e){
			console.log(e);
		}
	}
	
	// HieuTM: di toi trang ban do
	$rootScope.goMap= function(){
		$location.path('/apphome/map');
	}
	$rootScope._goMap= function(){
		$location.path('/apphome/map');
	}
	
	$rootScope._getMonitor = function(){
		var x = $vndssHelperCommon.getWidthHeightMonion();
		console.log(x);
		return x;
	}
	
	// HieuTM: function chung
	if($rootScope._data == undefined){
		$rootScope._data = {
			_canhBao: {
				_muaX0: 0,
				_muaX1:	0,
				_muaX3: 0,
				_mucNuocSong: 0,
				_mucNuocHo: [],
				_checkMuaX0:0,
				_checkMuaX1:0,
				_checkMuaX3:0,
				_checkMucNuocSong:0,
				_checkMucNuocHo:0,
				
			},
			_duBao: {
				_muaHo: [],
				_muaLuuVuc: [],
				_muaTinh: [],
				_dongChay: []
			},
			_passParam:{
				_tableName: "",
				_geomid: -1
			}
		}
	}
	
	$rootScope._fun = {
		_backHome: function(){
			try{
				$location.path('/tab/warning');	
			}catch(e){
				console.log(e);
			}
		},
		_backHistory: function(){
			console.log('===Go Back==');
			if($rootScope.reloadWarningRain)
			{
			$interval.cancel($rootScope.reloadWarningRain);
			}
			if($rootScope.reloadWarningFlow)
			{
				$interval.cancel($rootScope.reloadWarningFlow);
			}
			if($rootScope.reloadWarningWave)
			{
				$interval.cancel($rootScope.reloadWarningWave);
			}
			if($rootScope.reloadForecastFlow)
			{
				$interval.cancel($rootScope.reloadForecastFlow);
			}
			if($rootScope.reloadForecastRain)
			{
				$interval.cancel($rootScope.reloadForecastRain);
			}
			// $vndssHelperCommon.backHistory();
			$ionicHistory.goBack();
		},
		_goMap: function(titlePage, tableName, geomid){
			$rootScope._data._passParam._titlePage = titlePage;
			if($rootScope._data._passParam._tableName == "" && $rootScope._data._passParam._geomid == -1)
			{
				console.log('vao ghi du lieu qua trang');
				$rootScope._data._passParam._tableName = tableName;
				$rootScope._data._passParam._geomid = geomid;
			}
			$location.path('/apphome/map');
		},
		_getMonitor: function(){
			var x = $vndssHelperCommon.getWidthHeightMonion();
			console.log(x);
			return x;
		},
		_showFilterBar: function () {
			filterBarInstance = $ionicFilterBar.show({
				items: $scope.items,
				update: function (filteredItems, filterText) {
					$scope.items = filteredItems;
					if (filterText) {
						console.log(filterText);
					}
				}
			});
		},
		_showLoad: function(){
			$ionicLoading.show({
				content: 'Đang tải',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0,
				template: 'Đang tải <br><br><ion-spinner icon="bubbles" class="spinner-calm"></ion-spinner> '
			});
		},
		_hideLoad: function(){
			$ionicLoading.hide(); 
		},
		_LoadListCBMuaHienTai:function()
		{
			
		}
	}
});