// 30-03-2016 HoaPT
// khong ro
controllerGlobal.controller('HomeCtrl', function($scope, $rootScope, $location, $state, $ionicFilterBar, $vndssHelperCommon) {
	
	 $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.items,
            update: function (filteredItems, filterText) {
                $scope.items = filteredItems;
                if (filterText) {
                    console.log(filterText);
                }
            }
        });
	}
	console.log('===============ddfdfd===========================');
	
	// HieuTM: tro ve trang chu
	$rootScope._fun = {
		_backHome: function(){
			try{
				$location.path('#/tab/forecast');	
			}catch(e){
				console.log(e);
			}
		},
		_backHistory: function(){
			$vndssHelperCommon.backHistory();
		},
		_goMap: function(){
			$location.path('/apphome/map');
		},
		_getMonitor: function(){
			var x = $vndssHelperCommon.getWidthHeightMonion();
			console.log(x);
			return x;
		}
	}
	// $rootScope._backHome =  function(){
		// try{
			// $location.path('#/tab/forecast');	
		// }catch(e){
			// console.log(e);
		// }
	// }
	// $rootScope._backHome =  function(){
		// try{
			// $location.path('#/tab/forecast');	
		// }catch(e){
			// console.log(e);
		// }
	// }
	
	// // HieuTM: di toi trang ban do
	// $rootScope._goMap= function(){
		// $location.path('/apphome/map');
	// }
	
	// $rootScope._getMonitor = function(){
		// var x = $vndssHelperCommon.getWidthHeightMonion();
		// console.log(x);
		// return x;
	// }
	
	
})
 