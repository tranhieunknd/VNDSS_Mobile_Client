// 30-03-2016 HoaPT
controllerGlobal.controller('WarningRainCtrl', function($scope, $rootScope, $ionicHistory, $location, $state, $interval, $ionicFilterBar,$filter,  $vndssLogic_Manhdv, $vndssHelperCommon) {
	
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
		console.log('==Trở lại==');
		$ionicHistory.goBack();
		
	}
    $scope.goMap= function(){
		$location.path('/apphome/map');
	}
	
	//khai báo dữ liệu cho biểu đồ.
	$scope.labels = [];
	$scope.series = [];
	$scope.datavalue = [[]];
	$scope.data = {}; 
	$scope.data.titlePage='Cảnh báo mưa';
	
	var StationName = 0;
	var muahientai = 0;
	var muamotngay = 0;
	var muabangay = 0;
	var ProvinceName=0;
	var GeomId=0;
	
	var code = $state.params.StationCode;
	$scope.data.StationCode = code;	
	
	var typeRain=$state.params.TypeRain;
	$scope.data.typeRain=typeRain;
	
	var MauCanhBao=0;
	//lay chi tiet
	if(typeRain==0)
	{
		console.log("====Canh bao mua hien tai=====");
		if($rootScope.ListDataCBMuaHientai)
		{
			console.log($rootScope.ListDataCBMuaHientai);
			for(i=0;$rootScope.ListDataCBMuaHientai.length;i++)
			{
				if($rootScope.ListDataCBMuaHientai[i].StationCode==code)
				{
					
					$scope.data.dataGoc = $rootScope.ListDataCBMuaHientai[i]; 
					StationName=$rootScope.ListDataCBMuaHientai[i].StationName;
					muahientai=$rootScope.ListDataCBMuaHientai[i].LM0;
					muamotngay=$rootScope.ListDataCBMuaHientai[i].LM1;
					muabangay=$rootScope.ListDataCBMuaHientai[i].LM3;
					ProvinceName=$rootScope.ListDataCBMuaHientai[i].ProvinceName;
					GeomId=$rootScope.ListDataCBMuaHientai[i].GeomId;
					MauCanhBao=$rootScope.ListDataCBMuaHientai[i].MauCanhBao;
					
					break;
				}
			}
		}
		
	}
	else if(typeRain==1)
	{
		console.log("====Canh bao mua mot ngay====");
		if($rootScope.ListDataCBMuaMotNgay)
		{
			console.log($rootScope.ListDataCBMuaMotNgay);
			for(i=0;$rootScope.ListDataCBMuaMotNgay.length;i++)
			{
				if($rootScope.ListDataCBMuaMotNgay[i].StationCode==$scope.data.StationCode)
				{
					$scope.data.dataGoc = $rootScope.ListDataCBMuaHientai[i]; 
					
					StationName=$rootScope.ListDataCBMuaMotNgay[i].StationName;
					muahientai=$rootScope.ListDataCBMuaMotNgay[i].LM0;
					muamotngay=$rootScope.ListDataCBMuaMotNgay[i].LM1;
					muabangay=$rootScope.ListDataCBMuaMotNgay[i].LM3;
					ProvinceName=$rootScope.ListDataCBMuaMotNgay[i].ProvinceName;
					GeomId=$rootScope.ListDataCBMuaMotNgay[i].GeomId;
					MauCanhBao=$rootScope.ListDataCBMuaMotNgay[i].MauCanhBao;
					
					break;
				}
			}
		}
	}
	else{
		if($rootScope.ListDataCBMuaBaNgay)
		{
			console.log("====Canh bao mua Ba ngay===");
			for(i=0;$rootScope.ListDataCBMuaBaNgay.length;i++)
			{
				if($rootScope.ListDataCBMuaBaNgay[i].StationCode==code)
				{
					$scope.data.dataGoc = $rootScope.ListDataCBMuaHientai[i]; 
					
					StationName=$rootScope.ListDataCBMuaBaNgay[i].StationName;
					muahientai=$rootScope.ListDataCBMuaBaNgay[i].LM0;
					muamotngay=$rootScope.ListDataCBMuaBaNgay[i].LM1;
					muabangay=$rootScope.ListDataCBMuaBaNgay[i].LM3;
					ProvinceName=$rootScope.ListDataCBMuaBaNgay[i].ProvinceName;
					GeomId=$rootScope.ListDataCBMuaBaNgay[i].GeomId;
					MauCanhBao=$rootScope.ListDataCBMuaBaNgay[i].MauCanhBao;
					break;
				}
			}
		}
	}
	
	var ProviderCode = $state.params.ProviderCode;
	var type=1;
	if(ProviderCode !='CWRS'){type=2;}
	
	$scope.data.StationName = StationName;	
	$scope.data.ProvinceName = ProvinceName;	
	$scope.data.muahientai = muahientai;	
	$scope.data.muamotngay = muamotngay;	
	$scope.data.muabangay = muabangay;	
	$scope.data.GeomId = GeomId;	
	$scope.data.MauCanhBao = MauCanhBao;	
	console.log($scope.data.MauCanhBao );
	
    $scope.data.CanhBaoMua = 0;	 
	$scope.data.MuaCanhBao=[];
	
	$scope.data.termp=[];
	$scope.data.SoSanh=[];
	
	
	//===Ham Gan lai chi tiet
	
	$scope.RefreshData=function(typeRain)
	{
		
		console.log('===Refresh Data====');
		//Refresh lai du lieu cua mua hien tai
		if(typeRain==0)
		{
			var http = $vndssLogic_Hoapt.DsMuaCanhBao(type);
			http.success(function(data){	
				$scope.data.ListMuaCanhBaoHienTai =[];
				
				$scope.data.DataDsMuaCanhBao = $vndssLogic_Hoapt.parserList(data);	
				//gan lai danh sach
				for(i=0; i<$scope.data.DataDsMuaCanhBao.length;i++)
				{
					if($scope.data.DataDsMuaCanhBao[i].MucCanhBao==2||$scope.data.DataDsMuaCanhBao[i].MucCanhBao==3||$scope.data.DataDsMuaCanhBao[i].MucCanhBao==4)
					{
						$scope.data.DataDsMuaCanhBao[i].LM0=Math.round($scope.data.DataDsMuaCanhBao[i].LM0);
						$scope.data.ListMuaCanhBaoHienTai.push($scope.data.DataDsMuaCanhBao[i]);
					}
				}
				$rootScope.ListDataCBMuaHientai=$scope.data.ListMuaCanhBaoHienTai;
				console.log($rootScope.ListDataCBMuaHientai);
				
				//gan lai du lieu 
				for(i=0;$rootScope.ListDataCBMuaHientai.length;i++)
				{
					if($rootScope.ListDataCBMuaHientai[i].StationCode==code)
					{
						
						StationName=$rootScope.ListDataCBMuaHientai[i].StationName;
						muahientai=$rootScope.ListDataCBMuaHientai[i].LM0;
						muamotngay=$rootScope.ListDataCBMuaHientai[i].LM1;
						muabangay=$rootScope.ListDataCBMuaHientai[i].LM3;
						ProvinceName=$rootScope.ListDataCBMuaHientai[i].ProvinceName;
						GeomId=$rootScope.ListDataCBMuaHientai[i].GeomId;
						
						var http = $vndssLogic_Manhdv.CanhBaoMua(code, type);	
						http.success(function(data){
						$rootScope.ListDataCBMuaHientai[$scope.index].detailWarningRain=$vndssLogic_Manhdv.parserList(data);
						
						});	
						
						break;
					}
				}
				
			})
		}
		//Refresh du lieu cua mua mot ngay
		else if(typeRain==1)
		{
			console.log('=====Refresh du lieu cua mua mot ngay====');
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
						$scope.data.checkMuaHientai++;
						$scope.data.DataDsMuaCanhBao[i].LM1=Math.round($scope.data.DataDsMuaCanhBao[i].LM1);
						$scope.data.ListMuaCanhBaoHienTai.push($scope.data.DataDsMuaCanhBao[i]);
					}
				}
				$rootScope.ListDataCBMuaMotNgay=$scope.data.ListMuaCanhBaoHienTai;
				
				//gan lai du lieu
				for(i=0;$rootScope.ListDataCBMuaMotNgay.length;i++)
				{
					if($rootScope.ListDataCBMuaMotNgay[i].StationCode==code)
					{
						StationName=$rootScope.ListDataCBMuaHientai[i].StationName;
						muahientai=$rootScope.ListDataCBMuaHientai[i].LM0;
						muamotngay=$rootScope.ListDataCBMuaHientai[i].LM1;
						muabangay=$rootScope.ListDataCBMuaHientai[i].LM3;
						ProvinceName=$rootScope.ListDataCBMuaHientai[i].ProvinceName;
						GeomId=$rootScope.ListDataCBMuaHientai[i].GeomId;
						break;
					}
				}
			})
				
		}
		//Refresh du lieu mua ba ngay
		else{
			console.log('=====Refresh du lieu mua ba ngay====');
			var http = $vndssLogic_Hoapt.DsMuaCanhBao(type);
			http.success(function(data){	
				$scope.data.ListDataCBMuaBaNgay =[];
				$scope.data.checkMuaHientai=0;	
				$scope.data.checkMua=0;
				$scope.data.DataDsMuaCanhBao = $vndssLogic_Hoapt.parserList(data);	
				for(i=0; i<$scope.data.DataDsMuaCanhBao.length;i++)
				{
					if($scope.data.DataDsMuaCanhBao[i].MucCanhBao==2||$scope.data.DataDsMuaCanhBao[i].MucCanhBao==3||$scope.data.DataDsMuaCanhBao[i].MucCanhBao==4)
					{
						$scope.data.checkMuaHientai++;
						$scope.data.DataDsMuaCanhBao[i].LM3=Math.round($scope.data.DataDsMuaCanhBao[i].LM3);
						$scope.data.ListMuaCanhBaoHienTai.push($scope.data.DataDsMuaCanhBao[i]);
					}
				}
				$rootScope.ListDataCBMuaBaNgay=$scope.data.ListMuaCanhBaoHienTai;
				
				//gans lai du lieu
				
				for(i=0;$rootScope.ListDataCBMuaBaNgay.length;i++)
				{
					if($rootScope.ListDataCBMuaBaNgay[i].StationCode==code)
					{
						StationName=$rootScope.ListDataCBMuaBaNgay[i].StationName;
						muahientai=$rootScope.ListDataCBMuaBaNgay[i].LM0;
						muamotngay=$rootScope.ListDataCBMuaBaNgay[i].LM1;
						muabangay=$rootScope.ListDataCBMuaBaNgay[i].LM3;
						ProvinceName=$rootScope.ListDataCBMuaBaNgay[i].ProvinceName;
						GeomId=$rootScope.ListDataCBMuaBaNgay[i].GeomId;
						break;
					}
				}
			})
				
		}
		
	}
	
	
	//Hàm đổ dữ liệu vào biểu đồ và lưới dữ liệu
	$scope.fnFillData_KTTV = function(data){
		console.log(data);
		$scope.labels = [];
		$scope.series=['Lượng mưa (mm)'];
		$scope.datavalue = [[]];
			
		console.log('===Hello world===');
		$scope.data.CanhBaoMua=[];
		$scope.data.CanhBaoMua=data;
		console.log($scope.data.CanhBaoMua);
		
		for(i=0; i<$scope.data.CanhBaoMua.length; i++){
			var time=$scope.data.CanhBaoMua[i].DataTime.split('T');
			console.log(time);
			var x = {
				datetime: time[0]+' 01:00',
				value: $scope.data.CanhBaoMua[i].rrr6
			}
			$scope.data.MuaCanhBao.push(x);
			
			var x = {
				datetime: time[0]+' 07:00',
				value: $scope.data.CanhBaoMua[i].rrr12
			}
			$scope.data.MuaCanhBao.push(x);
			
			var x = {
				datetime: time[0]+' 13:00',
				value: $scope.data.CanhBaoMua[i].rrr18
			}
			$scope.data.MuaCanhBao.push(x);
			
			var x = {
				datetime: time[0]+' 19:00',
				value: $scope.data.CanhBaoMua[i].rrr24
			}
			$scope.data.MuaCanhBao.push(x);

			$scope.labels.push(time[0]+' 01:00');
			$scope.labels.push(time[0]+' 07:00');
			$scope.labels.push(time[0]+' 13:00');
			$scope.labels.push(time[0]+' 19:00');
			
			$scope.datavalue[0].push($scope.data.CanhBaoMua[i].rrr6); 
			$scope.datavalue[0].push($scope.data.CanhBaoMua[i].rrr12); 
			$scope.datavalue[0].push($scope.data.CanhBaoMua[i].rrr18); 
			$scope.datavalue[0].push($scope.data.CanhBaoMua[i].rrr24); 
		}
		
		 $rootScope._fun._hideLoad();
	}
	//Hàm đổ dữ liệu vào biểu đồ và lưới dữ liệu trong trường hợp trạm của CWRS
	$scope.fnFillData_CWRS = function(data){
		console.log(data);
		$scope.labels = [];
	$scope.series=['Lượng mưa (mm)'];
	$scope.datavalue = [[]];
		console.log('===Hello CWRS===');
		$scope.data.CanhBaoMua=[];
		
		$scope.data.CanhBaoMua=data;
		for(i=0; i<$scope.data.CanhBaoMua.length; i++){
			var time=$scope.data.CanhBaoMua[i].DataTime.split('T');
			if($scope.data.CanhBaoMua[i].Hour==1||$scope.data.CanhBaoMua[i].Hour==7||$scope.data.CanhBaoMua[i].Hour==13||$scope.data.CanhBaoMua[i].Hour==19)
			{
				$scope.labels.push(time[0]+ ' '+$scope.data.CanhBaoMua[i].Hour +':00');
			}
			else
			{
				$scope.labels.push(' ');
			}
			$scope.datavalue[0].push($scope.data.CanhBaoMua[i].Value); 
			var x = {
				datetime: time[0]+ ' '+ $scope.data.CanhBaoMua[i].Hour +':00' ,
				value: $scope.data.CanhBaoMua[i].Value
			}
			$scope.data.MuaCanhBao.push(x);
			
		}
	   $rootScope._fun._hideLoad();
	}
	
	//Hàm reload lại dữ liệu và kiểm tra dữ liệu
	$scope.checkChange=false;
	
	$scope.reload=function(typeRain,type){
		
		//load lại dữ liệu sau 1 phút
		$rootScope.reloadWarningRain=$interval(function(){
			 if(typeRain==0)
			 {
				 var http = $vndssLogic_Manhdv.CanhBaoMua(code, type);	
					http.success(function(data){
						console.log('====Gia tri cu====');
						console.log($rootScope.ListDataCBMuaHientai[$scope.index].detailWarningRain);
						$scope.data.SoSanh=$rootScope.ListDataCBMuaHientai[$scope.index].detailWarningRain;
						console.log('====Refresh====');
						$scope.data.termp=$vndssLogic_Manhdv.parserList(data);
						console.log($scope.data.termp);
						
						if($scope.data.SoSanh.length==$scope.data.termp.length)
						{
							for(i=0; i<$scope.data.SoSanh.length; i++)
							{
								if($scope.data.SoSanh[i].rrr6!==$scope.data.termp[i].rrr6||$scope.data.SoSanh[i].rrr12!==$scope.data.termp[i].rrr12||$scope.data.SoSanh[i].rrr18!==$scope.data.termp[i].rrr18||$scope.data.SoSanh[i].rrr24!==$scope.data.termp[i].rrr24)
								{
									$scope.checkChange=true;
									break;
								}
							}
							if($scope.checkChange==true)
							{
								$rootScope._fun._showLoad();
								console.log('===Có thay doi====');
								$rootScope.ListDataCBMuaHientai[$scope.index].detailWarningRain=$scope.data.termp;
								if(type==2)
								{
									$scope.fnFillData_KTTV($rootScope.ListDataCBMuaHientai[$scope.index].detailWarningRain);
								}
								else{
									$scope.fnFillData_CWRS($rootScope.ListDataCBMuaHientai[$scope.index].detailWarningRain);
								}
								
								$scope.RefreshData($scope.data.typeRain);
								$scope.checkChange=false;
							}
						}
						else{
							$rootScope._fun._showLoad();
							console.log('===Co thay doi====');
							$rootScope.ListDataCBMuaHientai[$scope.index].detailWarningRain=$scope.data.termp;
							if(type==2)
							{
								$scope.fnFillData_KTTV($rootScope.ListDataCBMuaHientai[$scope.index].detailWarningRain);
							}
							else{
								$scope.fnFillData_CWRS($rootScope.ListDataCBMuaHientai[$scope.index].detailWarningRain);
								
							}
							
							$scope.RefreshData($scope.data.typeRain);
						}
						
					});	
			 }
			 ///Mua mot ngay
			else if (typeRain==1){
				 var http = $vndssLogic_Manhdv.CanhBaoMua(code, type);	
					http.success(function(data){
						console.log('====Gia tri cu====');
						console.log($rootScope.ListDataCBMuaMotNgay[$scope.index].detailWarningRain);
						$scope.data.SoSanh=$rootScope.ListDataCBMuaMotNgay[$scope.index].detailWarningRain;
						console.log('====Refresh====');
						$scope.data.termp=$vndssLogic_Manhdv.parserList(data);
						console.log($scope.data.termp);
						
						if($scope.data.SoSanh.length==$scope.data.termp.length)
						{
							for(i=0; i<$scope.data.SoSanh.length; i++)
							{
								if($scope.data.SoSanh[i].rrr6!==$scope.data.termp[i].rrr6||$scope.data.SoSanh[i].rrr12!==$scope.data.termp[i].rrr12||$scope.data.SoSanh[i].rrr18!==$scope.data.termp[i].rrr18||$scope.data.SoSanh[i].rrr24!==$scope.data.termp[i].rrr24)
								{
									$scope.checkChange=true;
									break;
								}
							}
							if($scope.checkChange==true)
							{
								$rootScope._fun._showLoad();
								console.log('===Có thay doi====');
								$rootScope.ListDataCBMuaMotNgay[$scope.index].detailWarningRain=$scope.data.termp;
								if(type==2)
								{
									$scope.fnFillData_KTTV($rootScope.ListDataCBMuaMotNgay[$scope.index].detailWarningRain);
								}
								else{
									$scope.fnFillData_CWRS($rootScope.ListDataCBMuaMotNgay[$scope.index].detailWarningRain);
								}
								
								$scope.RefreshData($scope.data.typeRain);
								$scope.checkChange=false;
							}
						}
						else{
							$rootScope._fun._showLoad();
							console.log('===Co thay doi====');
							$rootScope.ListDataCBMuaMotNgay[$scope.index].detailWarningRain=$scope.data.termp;
							if(type==2)
							{
								$scope.fnFillData_KTTV($rootScope.ListDataCBMuaMotNgay[$scope.index].detailWarningRain);
							}
							else{
								$scope.fnFillData_CWRS($rootScope.ListDataCBMuaMotNgay[$scope.index].detailWarningRain);
								
							}
							
							$scope.RefreshData($scope.data.typeRain);
						}
						
					});	
				
			}
			//mua ba ngay
			else{
				
				 var http = $vndssLogic_Manhdv.CanhBaoMua(code, type);	
					http.success(function(data){
						console.log('====Gia tri cu====');
						console.log($rootScope.ListDataCBMuaBaNgay[$scope.index].detailWarningRain);
						$scope.data.SoSanh=$rootScope.ListDataCBMuaBaNgay[$scope.index].detailWarningRain;
						console.log('====Refresh====');
						$scope.data.termp=$vndssLogic_Manhdv.parserList(data);
						console.log($scope.data.termp);
						
						if($scope.data.SoSanh.length==$scope.data.termp.length)
						{
							for(i=0; i<$scope.data.SoSanh.length; i++)
							{
								if($scope.data.SoSanh[i].rrr6!==$scope.data.termp[i].rrr6||$scope.data.SoSanh[i].rrr12!==$scope.data.termp[i].rrr12||$scope.data.SoSanh[i].rrr18!==$scope.data.termp[i].rrr18||$scope.data.SoSanh[i].rrr24!==$scope.data.termp[i].rrr24)
								{
									$scope.checkChange=true;
									break;
								}
							}
							if($scope.checkChange==true)
							{
								$rootScope._fun._showLoad();
								console.log('===Có thay doi====');
								$rootScope.ListDataCBMuaBaNgay[$scope.index].detailWarningRain=$scope.data.termp;
								if(type==2)
								{
									$scope.fnFillData_KTTV($rootScope.ListDataCBMuaBaNgay[$scope.index].detailWarningRain);
								}
								else{
									$scope.fnFillData_CWRS($rootScope.ListDataCBMuaBaNgay[$scope.index].detailWarningRain);
								}
								
								$scope.RefreshData($scope.data.typeRain);
								$scope.checkChange=false;
							}
						}
						else{
							$rootScope._fun._showLoad();
							console.log('===Co thay doi====');
							$rootScope.ListDataCBMuaBaNgay[$scope.index].detailWarningRain=$scope.data.termp;
							if(type==2)
							{
								$scope.fnFillData_KTTV($rootScope.ListDataCBMuaBaNgay[$scope.index].detailWarningRain);
							}
							else{
								$scope.fnFillData_CWRS($rootScope.ListDataCBMuaBaNgay[$scope.index].detailWarningRain);
								
							}
							
							$scope.RefreshData($scope.data.typeRain);
						}
						
					});	
				
			}
			
			 
			 
		 },60000)
	}
	
	
	
	
	//====Code chinh len du lieu==========
	
	
	if($scope.data.typeRain==0)//Chi tiet MUA HIEN TAI
	{
		console.log("=======Chi tiet MUA HIEN TAI=======");
		//trường hợp dữ liệu của khí tượng thủy văn
			if(type==2){
				console.log('===Truong hop du lieu cua khi tuong thuy van');
				if($rootScope.ListDataCBMuaHientai){
					for(i=0; i<$rootScope.ListDataCBMuaHientai.length;i++){
						if($rootScope.ListDataCBMuaHientai[i].StationCode==code){
							$scope.index = i;
							//truong hop chua co chi tiet canh bao cua tram mua
							if(!$rootScope.ListDataCBMuaHientai[i].detailWarningRain){
								console.log('truong hop CHUA CO chi tiet canh bao cua tram mua');
								var http = $vndssLogic_Manhdv.CanhBaoMua(code, type);	
								http.success(function(data){
								$rootScope.ListDataCBMuaHientai[$scope.index].detailWarningRain=$vndssLogic_Manhdv.parserList(data);
								console.log($vndssLogic_Manhdv.parserList(data));
								console.log($rootScope.ListDataCBMuaHientai[$scope.index].detailWarningRain);
								 $scope.fnFillData_KTTV($rootScope.ListDataCBMuaHientai[$scope.index].detailWarningRain);
								 
								 $scope.reload($scope.data.typeRain,2);
								});	
								break;
							}
							//truong hop da co chi tiet canh bao mua
							else{
								console.log('truong hop DA CO chi tiet canh bao cua tram mua');
								$scope.fnFillData_KTTV($rootScope.ListDataCBMuaHientai[$scope.index].detailWarningRain);
								$scope.reload($scope.data.typeRain,2);
								
							}
							break;
							
						}
					}
				}
				
			}
			//trường hợp dữ liệu của CWRS
			else{
				console.log('===Truong hop du lieu cua CWRS');
				if($rootScope.ListDataCBMuaHientai){
					for(i=0; i<$rootScope.ListDataCBMuaHientai.length;i++){
						if($rootScope.ListDataCBMuaHientai[i].StationCode==code){
							
							$scope.index = i;
							//truong hop chua co chi tiet canh bao cua tram mua
							if(!$rootScope.ListDataCBMuaHientai[i].detailWarningRain){
								
								var http = $vndssLogic_Manhdv.CanhBaoMua(code, type);	
								http.success(function(data){
								$rootScope.ListDataCBMuaHientai[$scope.index].detailWarningRain=$vndssLogic_Manhdv.parserList(data);
								$scope.fnFillData_CWRS($rootScope.ListDataCBMuaHientai[$scope.index].detailWarningRain);
								$scope.reload($scope.data.typeRain,1);
								});	
								break;
							}
							//truong hop da co chi tiet canh bao mua
							else{
								 $scope.fnFillData_CWRS($rootScope.ListDataCBMuaHientai[$scope.index].detailWarningRain);
								$scope.reload($scope.data.typeRain,1);
							}
						}
					}
				}
			}
	}
	else if($scope.data.typeRain==1)//Chi tiet MUA MOT NGAY
	{
		console.log("=======Chi tiet MUA MOT NGAY=======");
		//trường hợp dữ liệu của khí tượng thủy văn
			if(type==2){
				console.log('===Truong hop du lieu cua khi tuong thuy van');
				if($rootScope.ListDataCBMuaMotNgay){
					for(i=0; i<$rootScope.ListDataCBMuaMotNgay.length;i++)
					{
						if($rootScope.ListDataCBMuaMotNgay[i].StationCode==$scope.data.StationCode)
						{
							$scope.index = i;
							//truong hop chua co chi tiet canh bao cua tram mua
							if(!$rootScope.ListDataCBMuaMotNgay[i].detailWarningRain){
								
								var http = $vndssLogic_Manhdv.CanhBaoMua(code, type);	
								http.success(function(data){
								$rootScope.ListDataCBMuaMotNgay[$scope.index].detailWarningRain=$vndssLogic_Manhdv.parserList(data);
								$scope.fnFillData_KTTV($rootScope.ListDataCBMuaMotNgay[$scope.index].detailWarningRain);
								$scope.reload($scope.data.typeRain,2);	
								});	
								break;
							}
							//truong hop da co chi tiet canh bao mua
							else{
								 $scope.fnFillData_KTTV($rootScope.ListDataCBMuaMotNgay[$scope.index].detailWarningRain);
								$scope.reload($scope.data.typeRain,2);
							}
							break;
							
						}
					}
				}
				
			}
			else
			{
				console.log('===Truong hop du lieu cua CWRS');
				if($rootScope.ListDataCBMuaMotNgay){
					for(i=0; i<$rootScope.ListDataCBMuaMotNgay.length;i++){
						if($rootScope.ListDataCBMuaMotNgay[i].StationCode==code){
							
							$scope.index = i;
							//truong hop chua co chi tiet canh bao cua tram mua
							if(!$rootScope.ListDataCBMuaMotNgay[i].detailWarningRain){
								
								var http = $vndssLogic_Manhdv.CanhBaoMua(code, type);	
								http.success(function(data){
								$rootScope.ListDataCBMuaMotNgay[$scope.index].detailWarningRain=$vndssLogic_Manhdv.parserList(data);
								$scope.fnFillData_CWRS($rootScope.ListDataCBMuaMotNgay[$scope.index].detailWarningRain);
								$scope.reload($scope.data.typeRain,1);
								});	
								break;
							}
							//truong hop da co chi tiet canh bao mua
							else{
								 $scope.fnFillData_CWRS($rootScope.ListDataCBMuaMotNgay[$scope.index].detailWarningRain);
								$scope.reload($scope.data.typeRain,1);
							}
						}
					}
				}
			}
		
	}
	else//Chi tiet MUA BA NGAY
	{
		console.log("=======Chi tiet MUA BA NGAY=======");
		//trường hợp dữ liệu của khí tượng thủy văn
			if(type==2){
				console.log('===Truong hop du lieu cua khi tuong thuy van');
				if($rootScope.ListDataCBMuaBaNgay){
					for(i=0; i<$rootScope.ListDataCBMuaBaNgay.length;i++)
					{
						if($rootScope.ListDataCBMuaBaNgay[i].StationCode==$scope.data.StationCode)
						{
							$scope.index = i;
							//truong hop chua co chi tiet canh bao cua tram mua
							if(!$rootScope.ListDataCBMuaBaNgay[i].detailWarningRain){
								
								var http = $vndssLogic_Manhdv.CanhBaoMua(code, type);	
								http.success(function(data){
								$rootScope.ListDataCBMuaBaNgay[$scope.index].detailWarningRain=$vndssLogic_Manhdv.parserList(data);
								$scope.fnFillData_KTTV($rootScope.ListDataCBMuaBaNgay[$scope.index].detailWarningRain);
								$scope.reload($scope.data.typeRain,2);	
								});	
								break;
							}
							//truong hop da co chi tiet canh bao mua
							else{
								 $scope.fnFillData_KTTV($rootScope.ListDataCBMuaBaNgay[$scope.index].detailWarningRain);
								$scope.reload($scope.data.typeRain,2);
							}
							break;
							
						}
					}
				}
				
			}
			else
			{
				console.log('===Truong hop du lieu cua CWRS');
				if($rootScope.ListDataCBMuaBaNgay){
					for(i=0; i<$rootScope.ListDataCBMuaBaNgay.length;i++){
						if($rootScope.ListDataCBMuaBaNgay[i].StationCode==code){
							
							$scope.index = i;
							//truong hop chua co chi tiet canh bao cua tram mua
							if(!$rootScope.ListDataCBMuaBaNgay[i].detailWarningRain){
								
								var http = $vndssLogic_Manhdv.CanhBaoMua(code, type);	
								http.success(function(data){
								$rootScope.ListDataCBMuaBaNgay[$scope.index].detailWarningRain=$vndssLogic_Manhdv.parserList(data);
								$scope.fnFillData_CWRS($rootScope.ListDataCBMuaBaNgay[$scope.index].detailWarningRain);
								$scope.reload($scope.data.typeRain,1);
								});	
								break;
							}
							//truong hop da co chi tiet canh bao mua
							else{
								 $scope.fnFillData_CWRS($rootScope.ListDataCBMuaBaNgay[$scope.index].detailWarningRain);
								$scope.reload($scope.data.typeRain,1);
							}
						}
					}
				}
			}
	}
	
	
	// Hàm xem vị trí trên bản đồ.
	$scope.viewMapDetail = function(){
		console.log('demo' + $scope.data.GeomId);
		if(!$scope.data.GeomId | $scope.data.GeomId == null | $scope.data.GeomId == undefined | $scope.data.GeomId == -1) return;
		
		$rootScope._fun._goMap('Cảnh báo mực nước sông', 'TramKTTV', $scope.data.GeomId);
	}
})
