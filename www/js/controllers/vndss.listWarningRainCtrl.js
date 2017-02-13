// 01-04-2016 HoaPT
controllerGlobal.controller('ListWarningRainCtrl', function($scope, $rootScope, $location,$filter, $state,$ionicLoading, ionicMaterialInk, $ionicFilterBar,  $vndssLogic_Manhdv) {
	 ionicMaterialInk.displayEffect();
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
	$rootScope._fun._showLoad();
	
	$scope.data = {};
	$scope.data.selection=0;
	$scope.data.selection.type=0;
	$scope.data.titlePage='Cảnh báo mưa';
	$scope.data.items = [{type:0, typename:'Mưa hiện tại'},{type:1, typename:'Mưa một ngày'},{type:3, typename:'Mưa ba ngày'}];
	$scope.initRain = function () {
			$scope.data.selection=$scope.data.items[0];
		
			$scope.GetData($scope.data.selection.type);
		}
	var type=0;
	$scope.back = function(){	
		$location.path('/tab/forecast');
	}	
	 $scope.goMap= function(){
		$location.path('/apphome/map');
	}
	$rootScope.data=$scope.data;
	$scope.data.checkMuaHientai=0;
	$scope.data.DsMuacanhbaoHientai = 0;	
	$scope.data.ListMuacanhbaoHientai = [];
    $scope.data.DsMuacanhbaoMotNgay = 0;
	$scope.data.DsMuacanhbaoBaNgay = 0;	
//hàm thay đổi combobox	
	$scope.changecbb=function()
	{

		var typeWarning= $scope.data.selection.type;
		$scope.data.checkMuaHientai=0;
		$scope.data.ListMuacanhbaoHientai = [];
		$rootScope._fun._showLoad();
		$scope.GetData(typeWarning);
		}
	
	
	$scope.GetData=function(type)
	{
		if(type==0)
		{
			if(!$rootScope.ListDataCBMuaHientai)
			{
				var http = $vndssLogic_Manhdv.DsMuaCanhBao(type);
				http.success(function(data){					
					$scope.data.DsMuacanhbaoHientai = $vndssLogic_Manhdv.parserList(data);	
					for(i=0; i<$scope.data.DsMuacanhbaoHientai.length;i++)
					{
						if($scope.data.DsMuacanhbaoHientai[i].MucCanhBao==2||$scope.data.DsMuacanhbaoHientai[i].MucCanhBao==3||$scope.data.DsMuacanhbaoHientai[i].MucCanhBao==4)
						{
							$scope.data.checkMuaHientai++;
							$scope.data.DsMuacanhbaoHientai[i].LM0=Math.round($scope.data.DsMuacanhbaoHientai[i].LM0);
							$scope.data.ListMuacanhbaoHientai.push($scope.data.DsMuacanhbaoHientai[i]);
						}
					}
					$rootScope.ListDataCBMuaHientai=$scope.data.ListMuacanhbaoHientai;
					console.log($rootScope.ListDataCBMuaHientai);
					
					$scope.data.from = data.data.from;
					$scope.data.to = data.data.to;	
					 $rootScope._fun._hideLoad();
			
				});	
			}
			else{
				$rootScope._fun._hideLoad();
			}
		}
		if(type==1)
		{
			if(!$rootScope.ListDataCBMuaMotNgay)
			{
				var http = $vndssLogic_Manhdv.DsMuaCanhBao(type);
				http.success(function(data){					
					$scope.data.DsMuacanhbaoHientai = $vndssLogic_Manhdv.parserList(data);	
					for(i=0; i<$scope.data.DsMuacanhbaoHientai.length;i++)
					{
						if($scope.data.DsMuacanhbaoHientai[i].MucCanhBao==2||$scope.data.DsMuacanhbaoHientai[i].MucCanhBao==3||$scope.data.DsMuacanhbaoHientai[i].MucCanhBao==4)
						{
							$scope.data.checkMuaHientai++;
							$scope.data.DsMuacanhbaoHientai[i].LM1=Math.round($scope.data.DsMuacanhbaoHientai[i].LM1);
							$scope.data.ListMuacanhbaoHientai.push($scope.data.DsMuacanhbaoHientai[i]);
						}
					}
					$rootScope.ListDataCBMuaMotNgay=$scope.data.ListMuacanhbaoHientai;
					$scope.data.from = data.data.from;
					$scope.data.to = data.data.to;	
					 $rootScope._fun._hideLoad();
			
				});	
			}
			else{
				$rootScope._fun._hideLoad();
			}
		}
		if(type==3)
		{
			if(!$rootScope.ListDataCBMuaBaNgay)
			{
				var http = $vndssLogic_Manhdv.DsMuaCanhBao(type);
				http.success(function(data){					
					$scope.data.DsMuacanhbaoHientai = $vndssLogic_Manhdv.parserList(data);	
					for(i=0; i<$scope.data.DsMuacanhbaoHientai.length;i++)
					{
						if($scope.data.DsMuacanhbaoHientai[i].MucCanhBao==2||$scope.data.DsMuacanhbaoHientai[i].MucCanhBao==3||$scope.data.DsMuacanhbaoHientai[i].MucCanhBao==4)
						{
							$scope.data.checkMuaHientai++;
							$scope.data.DsMuacanhbaoHientai[i].LM3=Math.round($scope.data.DsMuacanhbaoHientai[i].LM3);
							$scope.data.ListMuacanhbaoHientai.push($scope.data.DsMuacanhbaoHientai[i]);
						}
					}
					$rootScope.ListDataCBMuaBaNgay=$scope.data.ListMuacanhbaoHientai;
					$scope.data.from = data.data.from;
					$scope.data.to = data.data.to;	
					 $rootScope._fun._hideLoad();
			
				});	
			}
			else{
				$rootScope._fun._hideLoad();
			}
		}
	}
	
});