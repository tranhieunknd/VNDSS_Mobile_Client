// 01-04-2016 HoaPT
controllerGlobal.controller('listForecastFlowCtrl', function($scope, $rootScope, $filter, $ionicLoading,$location, $state,$interval, ionicMaterialInk, $ionicFilterBar,  $vndssLogic_Hoapt) {
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
	
	$scope.data = {}; 
	$scope.data.titlePage='Dự báo dòng chảy đến hồ';
	$scope.back = function(){	
	$location.path('/tab/forecast');
	}
	 $scope.goMap= function(){
		$location.path('/apphome/map');
	}
	
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
	
	$scope.data.from=from;
	$scope.data.to=to;
	
	//===Ham kiem tra su thay doi du lieu sau thoi gian 1 phut
	$scope.checkChange=false;
	$scope.ReloadData=function()
	{
		$rootScope.reloadListForecastFlow=$interval(function(){
			console.log("====RELOAD====");
			var http = $vndssLogic_Hoapt.DsDongChayDuBao();	
			http.success(function(data){
				$scope.data.termp = $vndssLogic_Hoapt.parserList(data);
				console.log("===Gia tri cu===");
				console.log($rootScope.ListDataDongChayDuBao);
				console.log("===Gia tri moi===");
				console.log($scope.data.termp );
				
				if($rootScope.ListDataDongChayDuBao.length==$scope.data.termp.length)
				{
					for(i=0;i<$rootScope.ListDataDongChayDuBao.length;i++)
					{
						if($rootScope.ListDataDongChayDuBao[i].LuongMua!==$scope.data.termp[i].LuongMua||$rootScope.ListDataDongChayDuBao[i].LuuLuongDenDuBao!==$scope.data.termp[i].LuuLuongDenDuBao)
						{
						
							
							$scope.checkChange=true;
							break;
						}
					}
				}
				else{
					$scope.checkChange=true;
				}
				if($scope.checkChange==true)
				{
					
					console.log("===Danh sach CO bi thay doi===");
					$scope.checkChange=false;
				}
			
			});	 
		},60000)
	}
	
	if(!$rootScope.ListDataDongChayDuBao)
	{
		var http = $vndssLogic_Hoapt.DsDongChayDuBao();	
		http.success(function(data){					
				$scope.DsDongChayDuBao = $vndssLogic_Hoapt.parserList(data);		
				console.log($scope.DsDongChayDuBao);
				$rootScope.RListDongChayDuBao = $scope.DsDongChayDuBao;
				
				$scope.data.from = data.data.from;
				$scope.data.to = data.data.to;
				$scope.date = $filter('date')($scope.DsDongChayDuBao, "dd-MM-yyyy");
				$rootScope.ListDataDongChayDuBao=$scope.DsDongChayDuBao;
				$rootScope._fun._hideLoad();
				$scope.ReloadData()
		});	 
	}
	else
	{
		$scope.ReloadData();
		$rootScope._fun._hideLoad();
	}
 
});