// 31-03-2016 HoaPT
controllerGlobal.controller('ForecastFlowCtrl', function($scope, $rootScope, $location, $state, $ionicFilterBar,  $vndssLogic_Hoapt) {
	
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
	
	$scope.back = function(){
		
	}
    $scope.goMap= function(){
		$location.path('/apphome/map');
	}
	
});