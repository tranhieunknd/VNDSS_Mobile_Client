// 01-04-2016 HoaPT
controllerGlobal.controller('ListWarningWaveCtrl', function($scope, $rootScope, $filter, $location,$ionicLoading, $state, ionicMaterialInk, $ionicFilterBar,  $vndssLogic_Hoapt)  {
	 ionicMaterialInk.displayEffect();
	  $scope.search;
	 $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.items,
            update: function (filteredItems, filterText) {
                $scope.items = filteredItems;
                if (filterText) {
                    console.log(filterText);
					$scope.search=filterText;
                }
				else
				{
					$scope.search='';
				}
            }
        });
	}
	
	$rootScope._fun._showLoad();
	
	$scope.items = ['Xem theo tỉnh', 'Xem theo lưu vực', 'Xem theo hồ'];
	$scope.selection = $scope.items[0];
	
	$scope.data={};
	$scope.data.titlePage='Cảnh báo mực nước sông';
	
	$scope.back = function(){	
	$location.path('/tab/forecast');
	}	
	 $scope.goMap= function(){
		$location.path('/apphome/map');
	}
	if(!$rootScope.ListCBDataMucNuocSong)
	{
		
		$scope.data.checkMucNuocSong=0;
		$scope.data.MucNuocSong = 0;	
		$scope.data.ListDataMucNuocSong = [];
			var http = $vndssLogic_Hoapt.MucNuocSong();	
			http.success(function(data){		
					$scope.data.checkMucNuocSong=0;
					$scope.data.MucNuocSong = 0;	
					$scope.data.ListDataMucNuocSong = [];	
					$scope.data.MucNuocSong = $vndssLogic_Hoapt.parserList(data);	
					for(i=0; i<$scope.data.MucNuocSong.length;i++)
					{
						if($scope.data.MucNuocSong[i].MucCanhBao==2||$scope.data.MucNuocSong[i].MucCanhBao==3||$scope.data.MucNuocSong[i].MucCanhBao==4)
						{
							$scope.data.checkMuaHientai++;
							$scope.data.ListDataMucNuocSong.push($scope.data.MucNuocSong[i]);
						}
					}
					$rootScope.checkMucNuocSong=$scope.data.checkMucNuocSong;
					$rootScope.ListCBDataMucNuocSong=$scope.data.ListDataMucNuocSong;
					console.log($rootScope.ListCBDataMucNuocSong);
					 $rootScope._fun._hideLoad();
		});	 
	}
	else
	{
		
		 $rootScope._fun._hideLoad();
	}
});
