// 06-04-2016 HoaPT
controllerGlobal.controller('ForecastCtrl', function($scope, $rootScope, $location, $state, $ionicFilterBar,  $ionicLoading, $filter, $timeout, $vndssLogic_Hoapt) {
	//hộp select option
	$scope.items = ['Xem theo tỉnh', 'Xem theo lưu vực', 'Xem theo hồ'];
	$scope.selection = $scope.items[2];
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
	$rootScope._fun._showLoad();
	
	var from = new Date();
	//console.log(to);
	
	var formatdate =  function(date){
		var dd = date.getDate();
		var mm = date.getMonth() + 1;
		var y = date.getFullYear();
		
		return y + '-' + mm + '-' + dd;
	}
	
	var adddate = function (theDate, days1) {
        return new Date(theDate.getTime() + days1 * 24 * 60 * 60 * 1000);
    }
	
	var to = adddate(from, 3);
	
	$rootScope.from=from;
	$rootScope.to=to;
	$rootScope.data={};
	if(!$rootScope.ListDataMuadubao)
	{
		var ListRain=[];
		var http = $vndssLogic_Hoapt.DsMuadubao();	
		http.success(function(data){	
			$rootScope.ListDataMuadubao = $vndssLogic_Hoapt.parserList(data);	
			
			$rootScope.checkMuaDuBao=0;
			for(i=0; i<$rootScope.ListDataMuadubao.length;i++)
			 {
				 if($rootScope.ListDataMuadubao[i].MucDuBao==2||$rootScope.ListDataMuadubao[i].MucDuBao==3)
				 {
					 $rootScope.checkMuaDuBao++;
					 $rootScope.ListDataMuadubao[i].LuongMuaDuBaoThoiDoan=Math.round($rootScope.ListDataMuadubao[i].LuongMuaDuBaoThoiDoan);
				 }
			 }
		
			$rootScope._fun._hideLoad();
		});	
	}
	else
	{
		$rootScope._fun._hideLoad();
	}
	
	if(!$rootScope.ListDataDongChayDuBao)
	{
		var http = $vndssLogic_Hoapt.DsDongChayDuBao();	
		http.success(function(data){
				$scope.data.DsDongChayDuBao = $vndssLogic_Hoapt.parserList(data);
				
				$scope.data.from = data.data.from;
				$scope.data.to = data.data.to;
				var nucnuoc = 245;
				$scope.mnc1 = {};
				for(var i =0; i < $scope.data.DsDongChayDuBao.length; i++){
						$scope.data.DsDongChayDuBao[i].MucNuocDuBao = $scope.data.DsDongChayDuBao[i].MucNuocDuBao - nucnuoc;
				}
				$scope.date = $filter('date')($scope.data.DsDongChayDuBao, "dd-MM-yyyy");
				$rootScope.ListDataDongChayDuBao=$scope.data.DsDongChayDuBao;
				
				$rootScope._fun._hideLoad();
		});	 	
	}
	else{
		$rootScope._fun._hideLoad();
	}
	$scope.LoadForecaseRainItem = function(data1,from,to){		
		$scope.data = data1;
		$location.path('/apphome/forecast_rain/' + $scope.data.StationCode +'/'+ from +'/'+ to);
	}
	$scope.LoadForecaseFlowItem = function(data1,from,to){
		$scope.data = data1;
		$location.path('/apphome/forecast_flow/' + $scope.data.LakeRef +'/'+ from +'/'+ to +'/'+ $scope.data.LakeName + '/' + $scope.data.MucNuocDuBao +'/'+ $scope.data.LuuLuongDenDuBao );
	}
})
