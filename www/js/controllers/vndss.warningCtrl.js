// 06-04-2016 HoaPT
controllerGlobal.controller('WarningCtrl', function($scope, $rootScope, $location, $state, $ionicFilterBar,$interval,  $ionicLoading, $filter, $timeout, $vndssLogic_Hoapt) {
	
	//$scope.items = ['Mưa hiện tại', 'Mưa một ngày', 'Mưa ba ngày'];
	 $scope.showFilterBar = function () {
        filterBarInstance = $ionicFilterBar.show({
            items: $scope.items,
            update: function (filteredItems, filterText) {
                $scope.items = filteredItems;
                if (filterText) {
               
                }
            }
        });
	}
	
	$scope.data={};
	$scope.items = [{type:0, typename:'Mưa hiện tại'},{type:1, typename:'Mưa một ngày'},{type:3, typename:'Mưa ba ngày'}];
	$scope.initRain = function () {
			$scope.data.selection=$scope.items[0];
			$scope.reload($scope.data.selection.type);
			
		}
	$scope.changecbb=function()
	{

		var type= $scope.data.selection.type;
		//$scope.data.checkMuaHientai=0;
		//$scope.data.ListMuacanhbaoHientai = [];
		
		$rootScope._fun._showLoad();
		$scope.reload(type);
		}
	
	
	$scope.data.DataDsMuaCanhBao =0;
	$scope.data.DsMuacanhbaoMotNgay = 0;
	$scope.data.DsMuacanhbaoBaNgay = 0;	
	
	$scope.data.ListMuaCanhBaoMotNgay =[];
	$scope.data.ListMuaCanhBaoHienTai = [];
	$scope.data.ListMuaCanhBaoBaNgay = [];	
	
	$scope.data.checkMuaHientai=0;
	$scope.data.checkMuaMotNgay=0;
	$scope.data.checkMuaBaNgay=0;
	
	
	
	$scope.data.checkMucNuocHo=0;
	$scope.data.ListDataMucNuocHo = [];
	$scope.data.checkMucNuocSong=0;
	$scope.data.ListDataMucNuocSong = [];
	
	$scope.reload =  function(type){
		$rootScope._fun._showLoad();
		$rootScope.DataDsMuaCanhBao = {};
		if(type==0)
		{
			if(!$rootScope.ListDataCBMuaHientai)
			{
				var http = $vndssLogic_Hoapt.DsMuaCanhBao(type);
				http.success(function(data){	
					$scope.data.ListMuaCanhBaoHienTai =[];
					$scope.data.checkMuaHientai=0;	
					$scope.data.checkMua=0;
					$scope.data.DataDsMuaCanhBao = $vndssLogic_Hoapt.parserList(data);	
					for(i=0; i<$scope.data.DataDsMuaCanhBao.length;i++)
					{
						if($scope.data.DataDsMuaCanhBao[i].MucCanhBao==2||$scope.data.DataDsMuaCanhBao[i].MucCanhBao==3||$scope.data.DataDsMuaCanhBao[i].MucCanhBao==4)
						{
							$scope.data.DataDsMuaCanhBao[i].LM0=Math.round($scope.data.DataDsMuaCanhBao[i].LM0);
							$scope.data.checkMuaHientai++;
							$scope.data.ListMuaCanhBaoHienTai.push($scope.data.DataDsMuaCanhBao[i]);
						}
					}
					$rootScope.ListDataCBMuaHientai=$scope.data.ListMuaCanhBaoHienTai;
					$rootScope._fun._hideLoad();
				});	
			}
			else{
				
				$rootScope._fun._hideLoad();
			}
		}
		else if(type==1){
			if(!$rootScope.ListDataCBMuaMotNgay)
			{
				var http = $vndssLogic_Hoapt.DsMuaCanhBao(type);
				http.success(function(data){	
					$scope.data.ListMuaCanhBaoHienTai =[];
					$scope.data.checkMuaHientai=0;	
					$scope.data.checkMua=0;
					$scope.data.DataDsMuaCanhBao = $vndssLogic_Hoapt.parserList(data);	
					for(i=0; i<$scope.data.DataDsMuaCanhBao.length;i++)
					{
						if($scope.data.DataDsMuaCanhBao[i].MucCanhBao==2||$scope.data.DataDsMuaCanhBao[i].MucCanhBao==3||$scope.data.DataDsMuaCanhBao[i].MucCanhBao==4)
						{
							$scope.data.DataDsMuaCanhBao[i].LM1=Math.round($scope.data.DataDsMuaCanhBao[i].LM1);
							$scope.data.checkMuaHientai++;
							$scope.data.ListMuaCanhBaoHienTai.push($scope.data.DataDsMuaCanhBao[i]);
						}
					}
					$rootScope.ListDataCBMuaMotNgay=$scope.data.ListMuaCanhBaoHienTai;
					console.log($rootScope.ListDataCBMuaMotNgay);
				
					$rootScope._fun._hideLoad();
				});	
			}
			else{
				$rootScope._fun._hideLoad();
			}
		}
		else
		{
			if(!$rootScope.ListDataCBMuaBaNgay)
			{
				var http = $vndssLogic_Hoapt.DsMuaCanhBao(type);
				http.success(function(data){	
					$scope.data.ListMuaCanhBaoHienTai =[];
					$scope.data.checkMuaHientai=0;	
					$scope.data.checkMua=0;
					$scope.data.DataDsMuaCanhBao = $vndssLogic_Hoapt.parserList(data);	
					for(i=0; i<$scope.data.DataDsMuaCanhBao.length;i++)
					{
						if($scope.data.DataDsMuaCanhBao[i].MucCanhBao==2||$scope.data.DataDsMuaCanhBao[i].MucCanhBao==3||$scope.data.DataDsMuaCanhBao[i].MucCanhBao==4)
						{
							$scope.data.DataDsMuaCanhBao[i].LM3=Math.round($scope.data.DataDsMuaCanhBao[i].LM3);
							$scope.data.checkMuaHientai++;
							$scope.data.ListMuaCanhBaoHienTai.push($scope.data.DataDsMuaCanhBao[i]);
						}
					}
					$rootScope.ListDataCBMuaBaNgay=$scope.data.ListMuaCanhBaoHienTai;
					$rootScope._fun._hideLoad();
				});	
			}
			else{
				$rootScope._fun._hideLoad();
			}
		}
		
		if(!$rootScope.ListDataCBMucNuocHo)
		{
			$rootScope._fun._showLoad();
			$rootScope.DataMucNuocHo = {};	
			var http = $vndssLogic_Hoapt.MucNuocHo();	
			http.success(function(data){	
					$scope.data.checkMucNuocHo=0;
					$scope.data.ListDataMucNuocHo = [];
					$rootScope.DataMucNuocHo = $vndssLogic_Hoapt.parserList(data);
					for(i=0; i<$rootScope.DataMucNuocHo.length;i++)
					{
						if($rootScope.DataMucNuocHo[i].MucCanhBao==2||$rootScope.DataMucNuocHo[i].MucCanhBao==3||$rootScope.DataMucNuocHo[i].MucCanhBao==4)
						{
							$scope.data.checkMucNuocHo++;
							
							if($rootScope.DataMucNuocHo[i].SoSanh!=null)
							{
								var SoSanh=$rootScope.DataMucNuocHo[i].SoSanh.split(',');
								$rootScope.DataMucNuocHo[i].SoSanh1=SoSanh[0];
								$rootScope.DataMucNuocHo[i].SoSanh2=SoSanh[1];
								
							}
							$scope.data.ListDataMucNuocHo.push($rootScope.DataMucNuocHo[i]);
						}
					}
					$rootScope.ListDataCBMucNuocHo=$scope.data.ListDataMucNuocHo;
				
					$rootScope.checkMucNuocHo=$scope.data.checkMucNuocHo;
					$rootScope._fun._hideLoad();
			});	
		}
		if(!$rootScope.ListCBDataMucNuocSong)
		{
			$rootScope._fun._showLoad();
			$rootScope.DataMucNuocSong = {};	
			var http = $vndssLogic_Hoapt.MucNuocSong();	
			http.success(function(data){
					$scope.data.checkMucNuocSong=0;
					$scope.data.ListDataMucNuocSong = [];
					$rootScope.DataMucNuocSong = $vndssLogic_Hoapt.parserList(data);
					
					for(i=0; i<$rootScope.DataMucNuocSong.length;i++)
					{
						if($rootScope.DataMucNuocSong[i].MucCanhBao==2||$rootScope.DataMucNuocSong[i].MucCanhBao==3||$rootScope.DataMucNuocSong[i].MucCanhBao==4)
						{
							$scope.data.checkMucNuocSong++;
							//tách chuỗi để lấy so sánh các cấp báo động
							if($rootScope.DataMucNuocSong[i].SoSanhBaoDong!=null)
							{
								var SoSanhBaoDong=$rootScope.DataMucNuocSong[i].SoSanhBaoDong.split(',');
								$rootScope.DataMucNuocSong[i].SoSanh1=SoSanhBaoDong[0];
								$rootScope.DataMucNuocSong[i].SoSanh2=SoSanhBaoDong[1];
								$scope.data.ListDataMucNuocSong.push($rootScope.DataMucNuocSong[i]);
							}
						}
					}
					$rootScope.ListCBDataMucNuocSong=$scope.data.ListDataMucNuocSong;
					$rootScope.checkMucNuocSong=$scope.data.checkMucNuocSong;
					
					$rootScope._fun._hideLoad();
			});	
		} 
	
	}	
    
	
	// if(data1.GeomId == null | data1.GeomId == undefined | data1.GeomId == -1) $scope.data = data1;
	
    $scope.LoadWarningRainItem = function(data1,typeRain,from,to){
		console.log(typeRain);
		//if(data1.GeomId == null | data1.GeomId == undefined | data1.GeomId == -1) //$scope.data = data1;
		
		//$location.path('/apphome/warning_rain/' + $scope.data.StationCode +'/'+ $scope.data.ProviderCode +'/'+ $scope.data.StationName+'/'+$scope.data.LM0+'/'+$scope.data.LM1+'/'+$scope.data.LM3+'/'+$scope.data.ProvinceName+'/'+$scope.data.GeomId);
		$location.path('/apphome/warning_rain/' + data1.StationCode +'/'+ typeRain );
	}
		
	$scope.LoadWarningFlowItem = function(data1,from,to){
		
		//if(data1.GeomId == null | data1.GeomId == undefined | data1.GeomId == -1) $scope.data = data1;
		//$location.path('/apphome/warning_flow/' + $scope.data.LakeCode +'/'+ $scope.data.LakeName +'/'+ $scope.data.TongLuuLuongDen +'/'+ $scope.data.MucNuocDangBinhThuong + '/' + $scope.data.MucNuocDangGiaCuong +'/'+ $scope.data.MucNuocChet+'/'+$scope.data.SoSanh+'/'+$scope.data.GeomId );
		$location.path('/apphome/warning_flow/' + data1.LakeCode);
	}
		
	$scope.LoadWarningWaveItem = function(data1,from,to){
		//if(data1.GeomId == null | data1.GeomId == undefined | data1.GeomId == -1) $scope.data = data1;
		//$location.path('/apphome/warning_wave/'+ $scope.data.StationFK +'/'+ $scope.data.SoSanhBaoDong +'/'+ $scope.data.BD1 +'/'+ $scope.data.BD2 + '/' + $scope.data.BD3 +'/'+ $scope.data.LLS+'/'+$scope.data.StationName+'/'+$scope.data.BasinName+'/'+$scope.data.GeomId);
		$location.path('/apphome/warning_wave/'+ data1.StationFK );
	}
		 
	$scope.goMap = function(){
		$location.path('/apphome/map');
	}
	
	$scope.viewmapdetail = function(titlePage, tableName, geomid){
		if(!geomid | geomid == null | geomid == undefined | geomid == -1) return;
		//console.log('vao roi nhe');
		$rootScope._fun._goMap(titlePage, tableName, geomid);
	}
})