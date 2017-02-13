// 30-03-2016 HoaPT
controllerGlobal.controller('ForecastFlowCtrl', function($scope,$filter, $rootScope, $ionicHistory, $location, $state,$interval, $ionicFilterBar,  $vndssLogic_Hoapt) {
	
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
	
	$scope.labels = [];
	$scope.series = [];
	 $scope.datavalue = [
		[]]
	;
	$scope.labelslake = [];
	$scope.serieslake = [];
	 $scope.datavaluelake = [
		[],[]]
	;
	$scope.back = function(){
		$ionicHistory.goBack();
	}
    $scope.homeBack = function(){
		$location.path('/tab/forecast');
	}
    $scope.goMap= function(){
		$location.path('/apphome/map');
	}

	$scope.data = {}; 
	$scope.data.titlePage='Dự báo dòng chảy đến hồ';
	
	var lake = $state.params.id;
	$scope.data.LakeRef=lake;
	//var name = $state.params.name;
	//var mucnuoc = $state.params.mucnuoc;
	//var dongchay = $state.params.dongchay;
	
	var name =0;
	var mucnuoc = 0;
	var dongchay = 0;
	var GeomId=0;
	//lay du lieu thong tin chi tiet
	if($rootScope.ListDataDongChayDuBao)
	{
		for(i=0; i<$rootScope.ListDataDongChayDuBao.length;i++)
		{
			if($rootScope.ListDataDongChayDuBao[i].LakeRef==$scope.data.LakeRef)
			{
				console.log("CO ton tai chi tiet Ho");
				name=$rootScope.ListDataDongChayDuBao[i].LakeName;
				mucnuoc=$rootScope.ListDataDongChayDuBao[i].MucNuocDuBao;
				dongchay=$rootScope.ListDataDongChayDuBao[i].LuuLuongDenDuBao;
				GeomId=$rootScope.ListDataDongChayDuBao[i].GeomId;
				break;
			}
		}
	}
	
	$scope.data.fdataname = name;	
	$scope.data.fdatamucnuoc = mucnuoc.toFixed(2);	
	$scope.data.fdatadongchay = dongchay.toFixed(2);	
	$scope.data.GeomId = GeomId;	
	
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
	
	$scope.data.to = to;
	$scope.data.from = from;
	
    $scope.data.DongChayDuBao = 0;	
	
	//===Ham dinh dang thoi gian
	$scope.formatDateTime=function(k){
		var datetime='';
		var a=k;
		var date=a.split('T');
		var date1=date[0].split('-');
		datetime=date1[2]+'/'+date1[1]+'/'+date1[0];
		var date2=date[1].split(':');
		datetime+=' '+ date2[0]+':'+date2[1];
		return datetime;
	}
	
	//===Ham dien du lieu vao bieu do va luoi du lieu
	
	$scope.fnFillData=function(data)
	{
		console.log("===Vao ham dien du lieu===");
		$scope.labels = [];
		$scope.series = [];
		 $scope.datavalue = [
			[]]
		;
		$scope.labelslake = [];
		$scope.serieslake = [];
		 $scope.datavaluelake = [
			[],[]]
		;
		
		$scope.data.DongChayDuBao=data;
		 $scope.series=['Dòng chảy dự báo'];
			$scope.serieslake = ['Mực nước dâng bình thường','Mực nước hồ'];
		
			//$scope.date = $filter('date')($scope.data.DongChayDuBao, "dd-MM-yyyy");	
			for(i=0; i<$scope.data.DongChayDuBao.length; i++){
				//lấy lên biểu đồ 4 mốc thời gian
				var d=$scope.formatDateTime($scope.data.DongChayDuBao[i].ThoiGian);
				var d1=d.split(' ');
				if(d1[1]=='01:00'||d1[1]=='07:00'||d1[1]=='13:00' ||d1[1]=='19:00')
				{
					$scope.labels.push(d);
					$scope.labelslake.push(d);
					if($scope.data.DongChayDuBao[i].LuuLuongDenDuBao==null)
					{
						$scope.data.DongChayDuBao[i].LuuLuongDenDuBao=0;
					}
					if($scope.data.DongChayDuBao[i].MucNuocDuBao==null){
						$scope.data.DongChayDuBao[i].MucNuocDuBao=0;
					}
					var value=$scope.data.DongChayDuBao[i].LuuLuongDenDuBao.toFixed(2);
					var valuelake=$scope.data.DongChayDuBao[i].MucNuocDuBao.toFixed(2);
					
					$scope.datavalue[0].push(value); // dòng chảy đến hồ
					$scope.datavaluelake[0].push(20); //Mực nước dâng bình thường
					$scope.datavaluelake[1].push(valuelake);//mực nước hồ
				}
			  }
			 $rootScope._fun._hideLoad();
	}
	//Ham Refresh lai chi tiet
	$scope.RefreshDetail=function()
	{
		console.log('===VAO HAM REFRESH===');
		var http = $vndssLogic_Hoapt.DsDongChayDuBao();	
		http.success(function(data){
				$scope.data.DsDongChayDuBao = $vndssLogic_Hoapt.parserList(data);
				
				//$scope.data.from = data.data.from;
				//$scope.data.to = data.data.to;
				var nucnuoc = 245;
				$scope.mnc1 = {};
				for(var i =0; i < $scope.data.DsDongChayDuBao.length; i++){
						$scope.data.DsDongChayDuBao[i].MucNuocDuBao = $scope.data.DsDongChayDuBao[i].MucNuocDuBao - nucnuoc;
				}
				$scope.date = $filter('date')($scope.data.DsDongChayDuBao, "dd-MM-yyyy");
				$rootScope.ListDataDongChayDuBao=$scope.data.DsDongChayDuBao;
				
				
				for(i=0; i<$rootScope.ListDataDongChayDuBao.length;i++)
				{
					if($rootScope.ListDataDongChayDuBao[i].LakeRef==$scope.data.LakeRef)
					{
						
						name=$rootScope.ListDataDongChayDuBao[i].LakeName;
						mucnuoc=$rootScope.ListDataDongChayDuBao[i].MucNuocDuBao;
						dongchay=$rootScope.ListDataDongChayDuBao[i].LuuLuongDenDuBao;
						var http = $vndssLogic_Hoapt.DongChayDuBao($scope.data.LakeRef, formatdate($scope.data.from), formatdate($scope.data.to));	
						http.success(function(data){
							$scope.data.DongChayDuBao = $vndssLogic_Hoapt.parserList(data);
							$rootScope.ListDataDongChayDuBao[$scope.index].detailForecastFlow=$vndssLogic_Hoapt.parserList(data);
						})
						
						break;
					}
				}
				
				$scope.data.fdataname = name;	
				$scope.data.fdatamucnuoc = mucnuoc.toFixed(2);	
				$scope.data.fdatadongchay = dongchay.toFixed(2);
				
				//$rootScope._fun._hideLoad();
		});	 	
	}
	
	//Ham reload kiem tra su thay doi
	$scope.checkChange=false;
	$scope.ReloadData=function()
	{
		
		$rootScope.reloadForecastFlow=$interval(function(){
			console.log("====VAO HAM RELOAD===");
			console.log($scope.index);
			console.log($rootScope.ListDataDongChayDuBao[$scope.index]);
		console.log($scope.data.from);
		console.log($scope.data.to);
		var http = $vndssLogic_Hoapt.DongChayDuBao($scope.data.LakeRef, formatdate($scope.data.from), formatdate($scope.data.to));	
				http.success(function(data){	
					$scope.data.termp = $vndssLogic_Hoapt.parserList(data);
					console.log("====Gia tri cu====");
					console.log($rootScope.ListDataDongChayDuBao[$scope.index].detailForecastFlow);
					console.log('====Gia tri Refresh====');
					console.log($scope.data.termp);
					if($rootScope.ListDataDongChayDuBao[$scope.index].detailForecastFlow.length==$scope.data.termp.length )
					{
						for(i=0;i<$rootScope.ListDataDongChayDuBao[$scope.index].detailForecastFlow.length;i++)
						{
							if($rootScope.ListDataDongChayDuBao[$scope.index].detailForecastFlow[i].LuuLuongDenDuBao!==$scope.data.termp[i].LuuLuongDenDuBao||$rootScope.ListDataDongChayDuBao[$scope.index].detailForecastFlow[i].MucNuocDuBao!==$scope.data.termp[i].MucNuocDuBao)
							{
								
								$scope.checkChange=true;
								break;
							}
						}
						if($scope.checkChange==true)
						{
							console.log("===Co thay doi nhe===");
							$rootScope.ListDataDongChayDuBao[$scope.index].detailForecastFlow=$scope.data.termp;
							$scope.checkChange=false;
							//goi ham dien lai du lieu
							$scope.fnFillData($rootScope.ListDataDongChayDuBao[$scope.index].detailForecastFlow);
							$scope.RefreshDetail();
						}
					}
					else
					{
						
						console.log('====Co thay doi');
						$rootScope.ListDataDongChayDuBao[$scope.index].detailForecastFlow=$scope.data.termp;
						
						//goi ham dien lai du lieu
						
						$scope.fnFillData($rootScope.ListDataDongChayDuBao[$scope.index].detailForecastFlow);
						$scope.RefreshDetail();
					}
					
				})
		},60000)
	}
	
	//===code chinh 
	if($rootScope.ListDataDongChayDuBao)
	{
		console.log("====DA ton tai danh sach===");
		for(i=0; i<$rootScope.ListDataDongChayDuBao.length;i++)
		{
			if($rootScope.ListDataDongChayDuBao[i].LakeRef==$scope.data.LakeRef)
			{
				$scope.index=i;
				if(!$rootScope.ListDataDongChayDuBao[i].detailForecastFlow)
				{
					console.log("=====Lay du lieu tren server====");
					var http = $vndssLogic_Hoapt.DongChayDuBao(lake, formatdate($scope.data.from), formatdate($scope.data.to));	
					http.success(function(data){	
						$scope.data.DongChayDuBao = $vndssLogic_Hoapt.parserList(data);
						$rootScope.ListDataDongChayDuBao[$scope.index].detailForecastFlow=$vndssLogic_Hoapt.parserList(data);
						
						$scope.fnFillData($rootScope.ListDataDongChayDuBao[$scope.index].detailForecastFlow);
						$scope.ReloadData();
						//$rootScope._fun._hideLoad();
					})
				}
				else{
					console.log("===Da co chi tiet===");
					
					$scope.fnFillData($rootScope.ListDataDongChayDuBao[$scope.index].detailForecastFlow);
					$scope.ReloadData();
					//$rootScope._fun._hideLoad();
				}
				break;
			}
		}
	}
	
	var thoigian;
	$scope.datepickerObjectFrom = {		
			
			titleLabel: 'Chọn ngày',
			todayLabel: 'Hôm nay', 
			closeLabel: 'Đóng',  
			setLabel: 'Chọn',  
			setButtonType : 'button-assertive', 
			todayButtonType : 'button-assertive',
			closeButtonType : 'button-assertive', 
			inputDate: from,
			mondayFirst: true, 
			disabledDates: disabledDates,
			weekDaysList: weekDaysList,
			monthList: monthList,
			templateType: 'popup',
			showTodayButton: 'true',
			modalHeaderColor: 'bar-positive', 
			modalFooterColor: 'bar-positive',
			from: new Date(2012, 8, 2),
			to: new Date(2018, 8, 25),
			callback: function(val) {datePickerCallbackFrom(val);},
			
			dateFormat: 'dd/MM/yyyy',
			closeOnSelect: false,
		};
	 var weekDaysList = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
	 var monthList = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
	 
	 var datePickerCallbackFrom = function (val) {
		 if (!val) {
			 thoigian = new Date();	
			 $scope.datepickerObjectFrom.inputDate = thoigian;	
			 
		 }
		 else{
			 $rootScope._fun._showLoad();
			thoigian = val;
			$scope.datepickerObjectFrom.inputDate = thoigian;
			$scope.data.from = thoigian;			
			$scope.data.DongChayDuBao = 0;	
			var http = $vndssLogic_Hoapt.DongChayDuBao(lake, formatdate($scope.data.from), formatdate($scope.data.to));	
			http.success(function(data){					
					$scope.data.DongChayDuBao = $vndssLogic_Hoapt.parserList(data);
					$scope.fnFillData($scope.data.DongChayDuBao);
			});		
		  }
	};
	
	
	$scope.datepickerObjectTo = {		
			
			titleLabel: 'Chọn ngày',
			todayLabel: 'Hôm nay', 
			closeLabel: 'Đóng',  
			setLabel: 'Chọn',  
			setButtonType : 'button-assertive', 
			todayButtonType : 'button-assertive',
			closeButtonType : 'button-assertive', 
			inputDate: to,
			mondayFirst: true, 
			disabledDates: disabledDates,
			weekDaysList: weekDaysList,
			monthList: monthList,
			templateType: 'popup',
			showTodayButton: 'true',
			modalHeaderColor: 'bar-positive', 
			modalFooterColor: 'bar-positive',
			from: new Date(2012, 8, 2),
			to: new Date(2018, 8, 25),
			callback: function(val) {datePickerCallbackTo(val);},
			
			dateFormat: 'dd/MM/yyyy',
			closeOnSelect: false,
		};
	 var weekDaysList = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
	 var monthList = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
	 
	 var datePickerCallbackTo = function (val) {
		 if (!val) {
			 thoigian = new Date();	
			 $scope.datepickerObjectTo.inputDate = thoigian;	
			 
		 }
		 else{
			$rootScope._fun._showLoad();
			thoigian = val;
			$scope.datepickerObjectTo.inputDate = thoigian;
			$scope.data.to = thoigian;			
			$scope.data.DongChayDuBao = 0;	
			var http = $vndssLogic_Hoapt.DongChayDuBao(lake, formatdate($scope.data.from), formatdate($scope.data.to));	
			http.success(function(data){					
					$scope.data.DongChayDuBao = $vndssLogic_Hoapt.parserList(data);
					$scope.fnFillData($scope.data.DongChayDuBao);
			});		
		  }
	};
	
	
	
	
	
	var disabledDates = [
			new Date(1437719836326),
			new Date(),
			new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
			new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
			new Date("08-14-2015"), //Short format
			new Date(1439676000000) //UNIX format
		];
})
