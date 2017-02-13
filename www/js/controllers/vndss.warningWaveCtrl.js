// 30-03-2016 HoaPT
controllerGlobal.controller('WarningWaveCtrl', function($scope, $rootScope,$filter,$ionicHistory, $location, $state,$vndssLogic_Hoapt, $ionicFilterBar,$interval,  $vndssLogic_Manhdv) {
	
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
		$ionicHistory.goBack();
		
	}
	
	$rootScope._fun._showLoad();
	
	//khai báo dữ liệu cho biểu đồ.
	$scope.labels = [];
	$scope.series = [];
	 $scope.datavalue = [
		[],[],[],[]]
	;
   
   var StationFK = $state.params.StationFK;
	//var SoSanhBaoDong = $state.params.SoSanhBaoDong;
	//var BD1 = $state.params.BD1;
	//var BD2 = $state.params.BD2;
	//var BD3 = $state.params.BD3;
	//var LLS=$state.params.LLS;
	//var StationName = $state.params.StationName;
	//var BasinName = $state.params.BasinName;
	
	var SoSanhBaoDong = 0;
	var BD1 = 0;
	var BD2 = 0;
	var BD3 = 0;
	var LLS=0;
	var StationName = 0;
	var BasinName = 0;
	var GeomId=0;
	var MauCanhBao=0;
	
	if($rootScope.ListCBDataMucNuocSong)
	{
		for(i=0; i<$rootScope.ListCBDataMucNuocSong.length;i++)
		{
			if($rootScope.ListCBDataMucNuocSong[i].StationFK==StationFK)
			{
				console.log('==Co ton tai===');
				 SoSanhBaoDong = $rootScope.ListCBDataMucNuocSong[i].SoSanhBaoDong;
				 BD1 = $rootScope.ListCBDataMucNuocSong[i].BD1;
				 BD2 = $rootScope.ListCBDataMucNuocSong[i].BD2;
				 BD3 = $rootScope.ListCBDataMucNuocSong[i].BD3;
				 LLS=$rootScope.ListCBDataMucNuocSong[i].LLS;
				 StationName = $rootScope.ListCBDataMucNuocSong[i].StationName;
				 BasinName = $rootScope.ListCBDataMucNuocSong[i].BasinName;
				GeomId=$rootScope.ListCBDataMucNuocSong[i].GeomId;
				MauCanhBao=$rootScope.ListCBDataMucNuocSong[i].MauCanhBao;
				break;
			}
		}
	}
	
	
	
	$scope.data = {}; 
	$scope.data.titlePage='Cảnh báo mực nước sông';
	
	$scope.data.StationFK = StationFK;	
	$scope.data.SoSanhBaoDong = SoSanhBaoDong;	
	$scope.data.BD1 = BD1;	
	$scope.data.BD2 = BD2;	
	$scope.data.BD3 = BD3;	
	$scope.data.LLS = LLS;		
	$scope.data.StationName = StationName;	
	$scope.data.BasinName = BasinName;	
	$scope.data.GeomId = GeomId;	
	$scope.data.MauCanhBao = MauCanhBao;
	
	$scope.data.CanhBaoMucNuocSong = 0;	  
	
	
	$scope.thoigian=0;
	
	

		//chuyển định dạng ngày tháng 
	$scope.formatDateTime=function(time){
		var datetime='';
		var term=time;
		var date=term.split('T');
		var date1=date[0].split('-');
		datetime=date1[2]+'/'+date1[1]+'/'+date1[0];
		var date2=date[1].split(':');
		datetime+=' '+ date2[0]+':'+date2[1];
		return datetime;
	}
	
	//ham Refresh du lieu
	$scope.RefreshData=function()
	{
		console.log('===Refresh Data====');
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
							var SoSanhBaoDong=$rootScope.DataMucNuocSong[i].SoSanhBaoDong.split(',');
							$rootScope.DataMucNuocSong[i].SoSanh1=SoSanhBaoDong[0];
							$rootScope.DataMucNuocSong[i].SoSanh2=SoSanhBaoDong[1];
							$scope.data.ListDataMucNuocSong.push($rootScope.DataMucNuocSong[i]);
						}
					}
					$rootScope.ListCBDataMucNuocSong=$scope.data.ListDataMucNuocSong;
					$rootScope.checkMucNuocSong=$scope.data.checkMucNuocSong;
					
					//dien lai du lieu
					for(i=0; i<$rootScope.ListCBDataMucNuocSong.length;i++)
					{
						if($rootScope.ListCBDataMucNuocSong[i].StationFK==StationFK)
						{
							console.log('==Co ton tai===');
							 SoSanhBaoDong = $rootScope.ListCBDataMucNuocSong[i].SoSanhBaoDong;
							 BD1 = $rootScope.ListCBDataMucNuocSong[i].BD1;
							 BD2 = $rootScope.ListCBDataMucNuocSong[i].BD2;
							 BD3 = $rootScope.ListCBDataMucNuocSong[i].BD3;
							 LLS=$rootScope.ListCBDataMucNuocSong[i].LLS;
							 StationName = $rootScope.ListCBDataMucNuocSong[i].StationName;
							 BasinName = $rootScope.ListCBDataMucNuocSong[i].BasinName;
							 
							 $scope.data.SoSanhBaoDong = SoSanhBaoDong;	
								$scope.data.BD1 = BD1;	
								$scope.data.BD2 = BD2;	
								$scope.data.BD3 = BD3;	
								$scope.data.LLS = LLS;		
								$scope.data.StationName = StationName;	
								$scope.data.BasinName = BasinName;
							 
							 var http = $vndssLogic_Manhdv.CanhBaoMucNuocSong(StationFK);	
								http.success(function(data){
									console.log('====lay du lieu====');
									$rootScope.ListCBDataMucNuocSong[$scope.index].detailWarningWave=$vndssLogic_Manhdv.parserList(data);
									
								})
							 
							
							break;
						}
					}
					
					$rootScope._fun._hideLoad();
			});	
	}
	
	//=====Ham dien du lieu len bieu do,luoi du lieu=============
	$scope.fnFillData=function(data)
	{
			$scope.labels = [];
			$scope.series = [];
			 $scope.datavalue = [
				[],[],[],[]]
			;
		console.log('===Vao ham dien du lieu====');
		$scope.data.CanhBaoMucNuocSong=data;
		for(i=0; i<$scope.data.CanhBaoMucNuocSong.length; i++){
						
					$scope.data.CanhBaoMucNuocSong[i].ThoiGianFomat=$scope.formatDateTime($scope.data.CanhBaoMucNuocSong[i].ThoiGian);	
					$scope.labels.push($scope.data.CanhBaoMucNuocSong[i].ThoiGianFomat);
					$scope.datavalue[0].push($scope.data.CanhBaoMucNuocSong[i].GiaTri.toFixed(2)); 
					$scope.datavalue[1].push($scope.data.BD1); 
					$scope.datavalue[2].push($scope.data.BD2); 
					$scope.datavalue[3].push($scope.data.BD3); 
					
				  }
				 $scope.series = ['Mực nước hồ','Mức BĐ1', 'Mức BĐ2', 'Mức BĐ3'];
				 $rootScope._fun._hideLoad();
	}
	
	
	//=====Ham reload du lieu sau 1 phut================
	$scope.checkChange=false;
	
	$scope.reloadData=function()
	{
		$rootScope.reloadWarningWave=$interval(function(){
			
			var http = $vndssLogic_Manhdv.CanhBaoMucNuocSong(StationFK);	
			http.success(function(data){
				console.log('====Gia tri cu====');
				console.log($rootScope.ListCBDataMucNuocSong[$scope.index].detailWarningWave);
				console.log('====Refresh====');
				$scope.data.termp=$vndssLogic_Manhdv.parserList(data);
				console.log($scope.data.termp);
				
				if($rootScope.ListCBDataMucNuocSong[$scope.index].detailWarningWave.length==$scope.data.termp.length)
				{
					console.log('phai kiem tra tung phan tu thoi');
					for(i=0; i<$rootScope.ListCBDataMucNuocSong[$scope.index].detailWarningWave.length;i++)
					{
						if($rootScope.ListCBDataMucNuocSong[$scope.index].detailWarningWave[i].GiaTri!==$scope.data.termp[i].GiaTri||$rootScope.ListCBDataMucNuocSong[$scope.index].detailWarningWave[i].BD1!==$scope.data.termp[i].BD1||$rootScope.ListCBDataMucNuocSong[$scope.index].detailWarningWave[i].BD2!==$scope.data.termp[i].BD2||$rootScope.ListCBDataMucNuocSong[$scope.index].detailWarningWave[i].BD3!==$scope.data.termp[i].BD3)
						{
							
							$scope.checkChange=true;
							
							break;
						}
					}
					if($scope.checkChange==true)
					{
						console.log('Muc nuoc song CO su thay doi');
						$rootScope.ListCBDataMucNuocSong[$scope.index].detailWarningWave=$scope.data.termp;
						//goi lai ham dien du lieu
						$scope.fnFillData($rootScope.ListCBDataMucNuocSong[$scope.index].detailWarningWave);
						$scope.RefreshData();
						$scope.checkChange=false;
					}
				}
				else{
					console.log('Muc nuoc song CO su thay doi');
					$rootScope.ListCBDataMucNuocSong[$scope.index].detailWarningWave=$scope.data.termp;
					//goi lai ham dien du lieu
					$scope.fnFillData($rootScope.ListCBDataMucNuocSong[$scope.index].detailWarningWave);
					$scope.RefreshData();
					$scope.checkChange=false;
				}
			})
			
		},60000)
		
	}
	
	
	
	//=========Hàm code chính để lên dữ liệu=============
	if($rootScope.ListCBDataMucNuocSong)
	{
		console.log('===Da ton tai danh sach canh bao muc nuoc song===');
		for(i=0; i<$rootScope.ListCBDataMucNuocSong.length; i++)
		{
			if($rootScope.ListCBDataMucNuocSong[i].StationFK==$scope.data.StationFK)
			{
				$scope.index = i;//luu lai vi tri ho duoc chon
				if(!$rootScope.ListCBDataMucNuocSong[$scope.index].detailWarningWave)
				{
					console.log('===Truong hop CHUA CO chi tiet canh bao===');
					var http = $vndssLogic_Manhdv.CanhBaoMucNuocSong(StationFK);	
					http.success(function(data){
						console.log('====lay du lieu====');
						$rootScope.ListCBDataMucNuocSong[$scope.index].detailWarningWave=$vndssLogic_Manhdv.parserList(data);
						//====Goi ham dien du lieu
						$scope.fnFillData($rootScope.ListCBDataMucNuocSong[$scope.index].detailWarningWave);
						//===Goi ham reload du lieu
						$scope.reloadData();
					})
					break;
				}
				else
				{
					console.log('===Truong hop DA CO chi tiet canh bao====');
					//====Goi ham dien du lieu
					$scope.fnFillData($rootScope.ListCBDataMucNuocSong[$scope.index].detailWarningWave);
					//===Goi ham reload du lieu
					$scope.reloadData();
					
				}
			}
			
		}
	}

	// hàm xem vị trí trên bản đồ.
	$scope.viewmapdetail = function(){
		console.log('demo' + $scope.data.GeomId);
		if(!$scope.data.GeomId | $scope.data.GeomId == null | $scope.data.GeomId == undefined | $scope.data.GeomId == -1) return;
		console.log('vao roi nhe');
		$rootScope._fun._goMap("Cảnh báo mực nước sông", "TramKTTV", $scope.data.GeomId);
	}
})