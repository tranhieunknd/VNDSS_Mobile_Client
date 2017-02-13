// 01-04-2016 HoaPT
controllerGlobal.controller('ListWarningFlowCtrl',  function($scope, $rootScope, $filter,  $ionicLoading, $location, $state, ionicMaterialInk, $ionicFilterBar,  $vndssLogic_Hoapt)  {
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
				else{
					$scope.search='';
				}
            }
        });
	}
	
	$ionicLoading.show({
		content: 'Đang tải',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0,
		template: 'Đang tải <br><br><ion-spinner icon="bubbles" class="spinner-calm"></ion-spinner> '
    });
	
	$scope.items = ['Xem theo tỉnh', 'Xem theo lưu vực', 'Xem theo hồ'];
	$scope.selection = $scope.items[2];
	
	$scope.back = function(){	
	$location.path('/tab/forecast');
	}	
	 $scope.goMap= function(){
		$location.path('/apphome/map');
	}     
	
	$scope.data  = {};
	$scope.data.titlePage='Cảnh báo mực nước hồ';
	
	if(!$rootScope.ListDataCBMucNuocHo)
	{
			
		$scope.data.MucNuocHo  = 0;
		$scope.data.checkCanhBaoMucNuocHo  = 0;
		$scope.data.ListDataMucNuocHo  = [];
		var http = $vndssLogic_Hoapt.MucNuocHo();	
		http.success(function(data){	
				$scope.data.checkCanhBaoMucNuocHo  = 0;
				$scope.data.MucNuocHo = $vndssLogic_Hoapt.parserList(data);
				for(i=0; i<$scope.data.MucNuocHo.length;i++)
				{
					if($scope.data.MucNuocHo[i].MucCanhBaoNumber==2||$scope.data.MucNuocHo[i].MucCanhBaoNumber==3||$scope.data.MucNuocHo[i].MucCanhBaoNumber==4)
					{
						$scope.data.checkCanhBaoMucNuocHo++;
						$scope.data.ListDataMucNuocHo.push($scope.data.MucNuocHo[i]);
					}
				}	
				$rootScope.ListDataCBMucNuocHo=$scope.data.ListDataMucNuocHo;
				$rootScope.checkMucNuocHo=$scope.data.checkMucNuocHo;
				$ionicLoading.hide();
		});	
	}
	else
	{
		$ionicLoading.hide();
	}
});