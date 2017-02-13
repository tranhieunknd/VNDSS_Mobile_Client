// 01-04-2016 HoaPT
controllerGlobal.controller('ForecastRainCtrl', function($scope, $rootScope, $location, $ionicHistory, $state,$interval, $ionicFilterBar, $filter, $vndssLogic_Hoapt) {
	
	// Khoi tao
	$scope.fun = {
		initPage: function(){
			$scope.data = {
				titlePage: 'Dự báo mưa'
			}
		}
	};
	
	// tim kiem
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
	};
	
	//$rootScope.url='vndss.header_detail.html';
	//khai báo dữ liệu cho biểu đồ.
	$scope.labels = [];
	$scope.series = [];
	$scope.datavalue = [[]];
	$scope.data = {};
	$scope.data.url='vndss.header_detail.html';
	$scope.data.titlePage='Dự báo mưa';
	
	$scope.back = function(){
		$ionicHistory.goBack();
	}
	$scope.backhome = function(){
		$location.path('/tab/forecast');
	}
	$scope.goMap= function(){
		$location.path('/apphome/map');
	}
	
	$rootScope._fun._showLoad();
	
	var station = $state.params.id;

	var from = new Date();
	
	var formatdate =  function(date){
		var dd = date.getDate();
		var mm = date.getMonth() + 1;
		var y = date.getFullYear();
		
		return y + '-' + mm + '-' + dd;
	};
	
	var adddate = function (theDate, days1) {
        return new Date(theDate.getTime() + days1 * 24 * 60 * 60 * 1000);
    };

	var to = adddate(from, 3);
	
	var StationName=0;
	var MauDuBao=0;
	var GeomId=0;
	if($rootScope.ListDataMuadubao)
	{
		console.log($rootScope.ListDataMuadubao);
		for(i=0; i<$rootScope.ListDataMuadubao.length;i++)
		{
			if($rootScope.ListDataMuadubao[i].StationCode==station)
			{
				console.log("===Co ton tai ma ho===");
				StationName=$rootScope.ListDataMuadubao[i].StationName;
				MauDuBao=$rootScope.ListDataMuadubao[i].MauDuBao;
				GeomId=$rootScope.ListDataMuadubao[i].GeomId;
				break;
			}
		}
	}
	$scope.data.StationName=StationName;//lưu tên trạm
	$scope.data.MauDuBao=MauDuBao;//lưu mau du bao
	$scope.data.GeomId=GeomId;//lưu mau du bao
	
    $scope.data.MuaDuBao = 0;	//lưu chi tiết dự báo mưa
	$scope.data.station = station;//lưu mã trạm
	$scope.data.to = to;
	$scope.data.from = from;
	$scope.dateFrom=from;
	$scope.dateTo=to;
	
	
	//===Ham formatDateTime
	$scope.formatDateTime=function(time){
		var datetime = '';
		var term = time;
		var date = term.split('T');
		var date1 = date[0].split('-');
		datetime = date1[2]+'/'+date1[1]+'/'+date1[0];
		var date2 = date[1].split(':');
		datetime+=' '+ date2[0]+':'+date2[1];
		return datetime;
	};
	
	$scope.data.sum=0;
	//===Ham dien du lieu len bieu do, luoi du lieu
	
	$scope.fnFillData=function(data)
	{
		$scope.labels = [];
		$scope.series = [];
		$scope.datavalue = [[]];
		
		$scope.data.MuaDuBao=data;
		for(i=0; i<$scope.data.MuaDuBao.length; i++){
			var d=$scope.formatDateTime($scope.data.MuaDuBao[i].ThoiGianDuBao);
			$scope.data.MuaDuBao[i].ThoiGianDuBaoFormat=d;
			
			$scope.data.MuaDuBao[i].ThoiGianPhatDuBaoFormat=$scope.formatDateTime($scope.data.MuaDuBao[i].ThoiGianPhatDuBao);
			$scope.labels.push(d);
			$scope.datavalue[0].push($scope.data.MuaDuBao[i].LuongMuaDuBaoThoiDoan); 
		  }
		  //console.log($scope.data.MuaDuBao);
		 $scope.series=['Mưa dự báo (mm)'];	
		$rootScope._fun._hideLoad();
		
	}
	//======Ham kiem tra lai du lieu, va gan lai khi co thay doi
	$scope.checkChange=false;
	$scope.ReloadData=function()
	{
		
		$rootScope.reloadForecastRain=$interval(function(){
			console.log("====Vao ham Reload====");
			var http = $vndssLogic_Hoapt.MuaDuBao($scope.data.station, formatdate($scope.data.from), formatdate($scope.data.to));

			http.success(function(data){	
				console.log(data);
				$scope.data.termp = $vndssLogic_Hoapt.parserList(data);
				
				console.log("====Gia tri cu====");
				console.log($rootScope.ListDataMuadubao[$scope.index].detailForecastRain);
				console.log('====Gia tri Refresh====');
				console.log($scope.data.termp);
				
				if($rootScope.ListDataMuadubao[$scope.index].detailForecastRain.length==$scope.data.termp.length)
				{
					//$scope.checkChange=true;
					for(i=0; i<$rootScope.ListDataMuadubao[$scope.index].detailForecastRain.length;i++)
					{
						if($rootScope.ListDataMuadubao[$scope.index].detailForecastRain[i].LuongMuaDuBaoThoiDoan!==$scope.data.termp[i].LuongMuaDuBaoThoiDoan||$rootScope.ListDataMuadubao[$scope.index].detailForecastRain[i].LuongMuaDuBaoLuyTich!==$scope.data.termp[i].LuongMuaDuBaoLuyTich)
						{
							
							$scope.checkChange=true;
							break;
						}
					}
				}
				else
				{
					
					$scope.checkChange=true;
				}
				if($scope.checkChange==true)
				{
					$rootScope._fun._showLoad();
					$scope.checkChange==false;
					console.log("===DA thay doi====");
					$scope.data.sum = data.data.sum;
					$rootScope.ListDataMuadubao[$scope.index].detailForecastRain=$scope.data.termp ;
					$scope.fnFillData($rootScope.ListDataMuadubao[$scope.index].detailForecastRain);
					$rootScope._fun._hideLoad();
				}
			
			})
			
		},60000)
	}
	
	//======Code chinh len du lieu
	if($rootScope.ListDataMuadubao)
	{
		for(i=0;i<$rootScope.ListDataMuadubao.length;i++)
		{
			if($rootScope.ListDataMuadubao[i].StationCode==$scope.data.station)
			{
				$scope.index = i;
				if(!$rootScope.ListDataMuadubao[i].detailForecastRain)
				{
					console.log('===Chua ton tai chi tiet===');
					var http = $vndssLogic_Hoapt.MuaDuBao($scope.data.station, formatdate(from), formatdate(to));

					http.success(function(data){	
						console.log(data);
						$scope.data.MuaDuBao = $vndssLogic_Hoapt.parserList(data);
						$rootScope.dateto = data.data.to;
						$scope.data.sum = data.data.sum;
						$rootScope.datefrom = data.data.from;
						$rootScope.ListDataMuadubao[$scope.index].detailForecastRain=$scope.data.MuaDuBao;
						$rootScope.ListDataMuadubao[$scope.index].TongLuong=$scope.data.sum;
						
						$scope.fnFillData($rootScope.ListDataMuadubao[$scope.index].detailForecastRain);
						
						//goi ham reload kiem tra su thay doi
						$scope.ReloadData();
					})
				
					
				}
				else
				{
					console.log('====Da ton tai chi tiet===');
					$scope.data.MuaDuBao=$rootScope.ListDataMuadubao[$scope.index].detailForecastRain;
					console.log($scope.data.MuaDuBao);
					$scope.data.sum =$rootScope.ListDataMuadubao[$scope.index].TongLuong;
					$scope.fnFillData($rootScope.ListDataMuadubao[$scope.index].detailForecastRain);
					//goi ham reload kiem tra su thay doi
						$scope.ReloadData();
				
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
			thoigian: datePickerCallbackFrom,
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
			$scope.dateFrom = thoigian;	
			$scope.data.MuaDuBao = 0;	
			var http = $vndssLogic_Hoapt.MuaDuBao(station, formatdate($scope.dateFrom ), formatdate($scope.dateTo));	
			http.success(function(data){
				
				$scope.data.MuaDuBao = $vndssLogic_Hoapt.parserList(data);
				$scope.labels = [];
				$scope.series = [];
				$scope.datavalue = [[]];
				$scope.data.sum = data.data.sum;				
				$scope.date = $filter('date')($scope.data.MuaDuBao, "dd-MM-yyyy");					
				for(i=0; i<$scope.data.MuaDuBao.length; i++){
					var d=$scope.formatDateTime($scope.data.MuaDuBao[i].ThoiGianDuBao);
					$scope.data.MuaDuBao[i].ThoiGianDuBao=d;
					$scope.data.MuaDuBao[i].ThoiGianPhatDuBao=$scope.formatDateTime($scope.data.MuaDuBao[i].ThoiGianPhatDuBao);
					$scope.labels.push(d);
					$scope.datavalue[0].push($scope.data.MuaDuBao[i].LuongMuaDuBaoThoiDoan); 
				}
				$scope.series=['Mưa dự báo (mm)'];	
				$rootScope._fun._hideLoad();
				
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
		
		
	 var datePickerCallbackTo = function (val) {
		 if (!val) {
			 thoigian = new Date();	
			 $scope.datepickerObjectTo.inputDate = thoigian;	
		 }
		 else{
			$rootScope._fun._showLoad();
			thoigian = val;
			$scope.datepickerObjectTo.inputDate = thoigian;	
			$scope.dateTo=thoigian;
			$scope.data.MuaDuBao = 0;	
			console.log(to);
			var http = $vndssLogic_Hoapt.MuaDuBao(station, formatdate($scope.dateFrom), formatdate($scope.dateTo));	
			http.success(function(data){
				$scope.data.MuaDuBao = $vndssLogic_Hoapt.parserList(data);
				console.log($scope.data.MuaDuBao);
				$scope.labels = [];
				$scope.series = [];
				$scope.datavalue = [[]];
				
				//$rootScope.dateto = data.data.to;
				//$rootScope.datefrom =  $rootScope.time1;
				$scope.data.sum = data.data.sum;				
				$scope.date = $filter('date')($scope.data.MuaDuBao, "dd-MM-yyyy");					
				for(i=0; i<$scope.data.MuaDuBao.length; i++){
					var d=$scope.formatDateTime($scope.data.MuaDuBao[i].ThoiGianDuBao);
					$scope.data.MuaDuBao[i].ThoiGianDuBao=d;
					$scope.data.MuaDuBao[i].ThoiGianPhatDuBao=$scope.formatDateTime($scope.data.MuaDuBao[i].ThoiGianPhatDuBao);
					$scope.labels.push(d);
					$scope.datavalue[0].push($scope.data.MuaDuBao[i].LuongMuaDuBaoThoiDoan); 
				}
				$scope.series=['Mưa dự báo (mm)'];	
				$rootScope._fun._hideLoad();
			});			
		  }
	};
	    //chuyển định dạng ngày tháng 			
		$scope.Thu = returnThuTrongTuan();
		console.log($scope.Thu);
		function returnThuTrongTuan()
		{
			var date = $scope.datepickerObjectFrom.inputDate.getDay();
			console.log(date);
			if(date == 0)
				return "Chủ nhật";
			if(date == 1)
				return "Thứ Hai";
			if(date == 2)
				return "Thứ Ba";
			if(date == 3)
				return "Thứ Tư";
			if(date == 4)
				return "Thứ Năm";
			if(date == 5)
				return "Thứ Sáu";
			if(date == 6)
				return "Thứ Bảy";			
		}	
		var disabledDates = [
			new Date(1437719836326),
			new Date(),
			new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
			new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
			new Date("08-14-2015"), //Short format
			new Date(1439676000000) //UNIX format
		];
		$scope.toggle = function() {
			$scope.myVar = !$scope.myVar;
		};
		var code = document.getElementsByClassName('code-wrapper');
		for (var i = 0; i < code.length; i++) {
			code[i].addEventListener('click', function() {
				this.classList.toggle('active');
			});
		} ;
		$scope.changeDatetime=function()
		{
			console.log("Time changed!!!");
		} 

});