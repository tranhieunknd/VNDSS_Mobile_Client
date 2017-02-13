// 30-03-2016 HoaPT
controllerGlobal.controller('WarningFlowCtrl', function($scope, $rootScope, $ionicHistory, $filter, $location, $state, $ionicFilterBar,$interval,  $vndssLogic_Manhdv,$vndssLogic_Hoapt) {
	
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
	
	$scope.backhome = function(){
		$location.path('/tab/warning');
	}
	$scope.back = function(){
		$ionicHistory.goBack();
	}
	$scope.goMap= function(){
		$location.path('/apphome/map');
	}
	var lake = $state.params.lake;
	
	//var LakeName = $state.params.LakeName;

	//var TongLuuLuongDen = $state.params.TongLuuLuongDen;
	//var MucNuocDangBinhThuong = $state.params.MucNuocDangBinhThuong;
	//var MucNuocDangGiaCuong = $state.params.MucNuocDangGiaCuong;
	//var MucNuocChet = $state.params.MucNuocChet;
	//var SoSanh = $state.params.SoSanh;
	//SoSanh=SoSanh.split(',');
	
	
	//var LakeName = $state.params.LakeName;

	var TongLuuLuongDen = 0;
	var MucNuocDangBinhThuong = 0;
	var MucNuocDangGiaCuong =0;
	var MucNuocChet =0;
	var SoSanh = 0;
	var LakeName=0;
	var MauCanhBao=0;
	var GeomId=0;
	//khai báo dữ liệu cho biểu đồ.
	$scope.labels = [];
	$scope.series = [];
	$scope.datavalue = [[],[],[],[]];
	
	$scope.labelsflow = [];
	$scope.seriesflow = [];
	$scope.datavalueflow = [[]];
	
	$scope.data={};
	$scope.data.titlePage='Cảnh báo mực nước hồ';
	$scope.data.lake=lake;
	
	//dien du lieu
	if($rootScope.ListDataCBMucNuocHo)
	{
		console.log($rootScope.ListDataCBMucNuocHo);
		for(i=0; i<$rootScope.ListDataCBMucNuocHo.length; i++)
		{
			
			if($rootScope.ListDataCBMucNuocHo[i].LakeCode==$scope.data.lake)		
			{
				
				console.log('==co ton tai');
				LakeName=$rootScope.ListDataCBMucNuocHo[i].LakeName;
				TongLuuLuongDen = $rootScope.ListDataCBMucNuocHo[i].TongLuuLuongDen;
				MucNuocDangBinhThuong =$rootScope.ListDataCBMucNuocHo[i].MucNuocDangBinhThuong;
				MucNuocDangGiaCuong = $rootScope.ListDataCBMucNuocHo[i].MucNuocDangGiaCuong;
				MucNuocChet = $rootScope.ListDataCBMucNuocHo[i].MucNuocChet;
				SoSanh = $rootScope.ListDataCBMucNuocHo[i].SoSanh;
				MauCanhBao=$rootScope.ListDataCBMucNuocHo[i].MauCanhBao;
				GeomId=$rootScope.ListDataCBMucNuocHo[i].GeomId;
				break;
			}
		}
	}
	
	 SoSanh=SoSanh.split(',');
	 $scope.data.LakeName=LakeName;
	 $scope.data.TongLuuLuongDen=TongLuuLuongDen;
	 $scope.data.MucNuocDangBinhThuong=MucNuocDangBinhThuong;
	 $scope.data.MucNuocDangGiaCuong=MucNuocDangGiaCuong;
	 $scope.data.MucNuocChet=MucNuocChet;
	 $scope.data.SoSanh1=SoSanh[0];
	 $scope.data.SoSanh2=SoSanh[1];
	$scope.data.MauCanhBao=MauCanhBao;
	 $scope.data.GeomId=GeomId;
	
	$scope.CanhBaoMucNuocHo = 0;	
	$scope.data.MucNuocHoCanhBao = [];

	
	//ham Refresh du lieu
	$scope.RefreshData=function()
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
								var SoSanhTermp=$rootScope.DataMucNuocHo[i].SoSanh.split(',');
								$rootScope.DataMucNuocHo[i].SoSanh1=SoSanhTermp[0];
								$rootScope.DataMucNuocHo[i].SoSanh2=SoSanhTermp[1];
								
							}
							$scope.data.ListDataMucNuocHo.push($rootScope.DataMucNuocHo[i]);
						}
					}
					$rootScope.ListDataCBMucNuocHo=$scope.data.ListDataMucNuocHo;
				
					$rootScope.checkMucNuocHo=$scope.data.checkMucNuocHo;
					
					//dien lai du lieu
					for(i=0; i<$rootScope.ListDataCBMucNuocHo.length; i++)
					{
						
						if($rootScope.ListDataCBMucNuocHo[i].LakeCode==$scope.data.lake)		
						{
							
							console.log('==co ton tai');
							LakeName=$rootScope.ListDataCBMucNuocHo[i].LakeName;
							TongLuuLuongDen = $rootScope.ListDataCBMucNuocHo[i].TongLuuLuongDen;
							MucNuocDangBinhThuong =$rootScope.ListDataCBMucNuocHo[i].MucNuocDangBinhThuong;
							MucNuocDangGiaCuong = $rootScope.ListDataCBMucNuocHo[i].MucNuocDangGiaCuong;
							MucNuocChet = $rootScope.ListDataCBMucNuocHo[i].MucNuocChet;
							SoSanh = $rootScope.ListDataCBMucNuocHo[i].SoSanh;
							MauCanhBao=$rootScope.ListDataCBMucNuocHo[i].MauCanhBao;
							GeomId=$rootScope.ListDataCBMucNuocHo[i].GeomId;
							
							SoSanh=SoSanh.split(',');
							$scope.data.TongLuuLuongDen=TongLuuLuongDen;
							 $scope.data.MucNuocDangBinhThuong=MucNuocDangBinhThuong;
							 $scope.data.MucNuocDangGiaCuong=MucNuocDangGiaCuong;
							 $scope.data.MucNuocChet=MucNuocChet;
							 $scope.data.SoSanh1=SoSanh[0];
							 $scope.data.SoSanh2=SoSanh[1];
							$scope.data.MauCanhBao=MauCanhBao;
							 $scope.data.GeomId=GeomId;
							
							break;
						}
					}
					
					var http = $vndssLogic_Manhdv.CanhBaoMucNuocHo($scope.data.lake);	
					http.success(function(data){	
						console.log('====lay du lieu====');
						$rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow=$vndssLogic_Manhdv.parserList(data);
						
					})
					
					$rootScope._fun._hideLoad();
			});	
	}
	
	//=====Ham dien du lieu len bieu do,luoi du lieu=============
	$scope.fnFillData=function(data)
	{
		console.log('===Vao ham dien du lieu====');
		$scope.CanhBaoMucNuocHo = 0;	
		$scope.data.MucNuocHoCanhBao = [];
		$scope.CanhBaoMucNuocHo=data;
			for(i=0; i<$scope.CanhBaoMucNuocHo.mucnuocho.length;i++)
			{
				
				var time=$scope.CanhBaoMucNuocHo.mucnuocho[i].date.split('T');
				$scope.CanhBaoMucNuocHo.mucnuocho[i].date=time[0]+' '+$scope.CanhBaoMucNuocHo.mucnuocho[i].hour+':00';
				//$scope.DataCanhBaoMucNuocHo.push($scope.CanhBaoMucNuocHo.mucnuocho[i]);
				var termp={
					datatime:$scope.CanhBaoMucNuocHo.mucnuocho[i].date,
					mucnuocho: $scope.CanhBaoMucNuocHo.mucnuocho[i].value.toFixed(2),
					qden:''
				}
				
				$scope.data.MucNuocHoCanhBao.push(termp);
				
				var hour=$scope.CanhBaoMucNuocHo.mucnuocho[i].hour;
				if(hour==1||hour==7||hour==13||hour==19)
				{
					$scope.labels.push($scope.CanhBaoMucNuocHo.mucnuocho[i].date);
				}
				else{
					$scope.labels.push('');
				}
				$scope.datavalue[0].push($scope.CanhBaoMucNuocHo.mucnuocho[i].value.toFixed(2)); 
				$scope.datavalue[1].push($scope.data.MucNuocDangBinhThuong); 
				$scope.datavalue[2].push($scope.data.MucNuocDangGiaCuong); 
				$scope.datavalue[3].push($scope.data.MucNuocChet); 
			}
			
			for(i=0; i<$scope.CanhBaoMucNuocHo.qden.length;i++)
			{
				var time=$scope.CanhBaoMucNuocHo.qden[i].date.split('T');
				$scope.CanhBaoMucNuocHo.qden[i].termp_date=time[0]+' '+$scope.CanhBaoMucNuocHo.qden[i].hour+':00';
				var hour=$scope.CanhBaoMucNuocHo.qden[i].hour;
				if(hour==1||hour==7||hour==13||hour==19)
				{
					$scope.labelsflow.push($scope.CanhBaoMucNuocHo.qden[i].termp_date);
				}
				else{
					$scope.labelsflow.push('');
				}
				$scope.datavalueflow[0].push($scope.CanhBaoMucNuocHo.qden[i].value.toFixed(2)); 
				
				for(j=0; j<$scope.data.MucNuocHoCanhBao.length;j++)
				 {
					 if($scope.CanhBaoMucNuocHo.qden[i].date==$scope.data.MucNuocHoCanhBao[j].datatime)
					{
						console.log($scope.CanhBaoMucNuocHo.qden[i].date);
						$scope.data.MucNuocHoCanhBao[j].qden=$scope.CanhBaoMucNuocHo.qden[i].value;
					
					}
				}
			}
			$scope.series=['Mực nước hồ (m)','Mực nước DBT (m)','Mực nước DGC (m)', 'Mực nước chết (m)'];
			$scope.seriesflow=['Dòng chảy đến hồ(m3/s)'];
			
			$rootScope._fun._hideLoad();                   
			
	}
	//====Ket thuc========
	
	
	$scope.checkChange=false;
	//=====Ham reload du lieu sau 1 phut================
	
	$scope.reloadData=function()
	{
		$rootScope.reloadWarningFlow=$interval(function(){
			var http = $vndssLogic_Manhdv.CanhBaoMucNuocHo($scope.data.lake);	
			http.success(function(data){
				
				console.log('====Gia tri cu====');
				console.log($rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow);
				console.log('====Refresh====');
				$scope.data.termp=$vndssLogic_Manhdv.parserList(data);
				console.log($scope.data.termp);
				
				if($rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow.mucnuocho.length==$scope.data.termp.mucnuocho.length)
				{
					console.log('====Muc nuoc ho KHONG thay doi====');
					for(i=0; i<$rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow.mucnuocho.length;i++)
					{
						if($rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow.mucnuocho[i].date!==$scope.data.termp.mucnuocho[i].date&&$rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow.mucnuocho[i].hour!==$scope.data.termp.mucnuocho[i].hour&&$rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow.mucnuocho[i].value!==$scope.data.termp.mucnuocho[i].value)
						{
							
							
							$scope.checkChange=true;
							
							break;
						}
					}
					//===Neu muc nuoc ho co thay doi thi gan lai detail
					if($scope.checkChange==true)
					{
						console.log('====Muc nuoc ho CO thay doi====');
						$rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow=$scope.data.termp;
						$scope.fnFillData($rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow);
						$scope.checkChange=false;
						
					}
					//===neu muc nuoc ho khong co thay doi thi kiem tra qden
					else
					{
						if($rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow.qden.length==$scope.data.termp.qden.length)
						{
							for(i=0; i<$rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow.qden.length;i++)
							{
								if($rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow.qden[i].date!==$scope.data.termp.qden[i].date&&$rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow.qden[i].hour!==$scope.data.termp.qden[i].hour&&$rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow.qden[i].value!==$scope.data.termp.qden[i].value)
								{
									
									
									$scope.checkChange=true;
									
									break;
								}
							}
							if($scope.checkChange==true)
							{
								console.log('====Qden ho CO thay doi====');
								$rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow=$scope.data.termp;
								$scope.fnFillData($rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow);
								$scope.checkChange=false;
							}
						}
						else{
							console.log('====Qden ho CO thay doi====');
							$rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow=$scope.data.termp;
							$scope.fnFillData($rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow);
							$scope.checkChange=false;
						}
					}
					
				}
				else{
					$rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow=$scope.data.termp;
					console.log('====Muc nuoc ho CO thay doi====');
					$scope.fnFillData($rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow);
					$scope.checkChange=false;
				}
			})
			
		},60000)
	}
	
	//=====ket thuc ham reload==========
	
	//=========code chinh len du lieu===============
	if($rootScope.ListDataCBMucNuocHo)//kiem tra su ton tai cua danh sach canh bao muc nuoc ho
	{
		for(i=0; i<$rootScope.ListDataCBMucNuocHo.length; i++)
		{
			//console.log($rootScope.ListDataCBMucNuocHo[i].LakeCode);
			
			if($rootScope.ListDataCBMucNuocHo[i].LakeCode==$scope.data.lake)
			{
				//console.log($rootScope.ListDataCBMucNuocHo[i]);
				$scope.index = i;//luu lai vi tri ho duoc chon
				//truong hop chua co chi tiet canh bao muc nuoc ho
				if(!$rootScope.ListDataCBMucNuocHo[i].detailWarningFlow)
				{
					console.log('===truong hop CHUA co chi tiet canh bao muc nuoc ho===');
					var http = $vndssLogic_Manhdv.CanhBaoMucNuocHo($scope.data.lake);	
					http.success(function(data){	
						console.log('====lay du lieu====');
						$rootScope.ListDataCBMucNuocHo[$scope.index ].detailWarningFlow=$vndssLogic_Manhdv.parserList(data);
						//====Goi ham dien du lieu
						$scope.fnFillData($rootScope.ListDataCBMucNuocHo[$scope.index].detailWarningFlow);
						$scope.RefreshData();
						// console.log($rootScope.ListDataCBMucNuocHo);
						$scope.reloadData();
					})
					
					break;
				}
				//truong hop da co chi tiet canh bao muc nuoc ho
				else
				{
					console.log('===truong hop DA co chi tiet canh bao muc nuoc ho===');
					//===Goi ham dien du lieu
					$scope.fnFillData($rootScope.ListDataCBMucNuocHo[$scope.index].detailWarningFlow);
					$scope.RefreshData();
					// 
					$scope.reloadData();
				}
				 break;
				
			}
		}
	}
	
	$scope.viewMapDetail = function(){
		if($state.params.GeomId | $state.params.GeomId == null | $state.params.GeomId == undefined | $state.params.GeomId == -1) return;
		$rootScope._fun._goMap("ThuyHe",$state.params.GeomId);
	}
})
