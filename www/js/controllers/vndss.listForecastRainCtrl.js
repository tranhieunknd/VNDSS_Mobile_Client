// 01-04-2016 HoaPT
controllerGlobal.controller('ListForecastRainCtrl', function($scope, $rootScope, $location,$filter,$ionicLoading, $state, ionicMaterialInk, $ionicFilterBar,  $vndssLogic_Hoapt) {
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
	
	$scope.data = {};
	$scope.data.titlePage='Dự báo mưa';
	
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
	
	//$rootScope.from=from;
	//$rootScope.to=to;
	$scope.data.from=from;
	$scope.data.to=to;
	
	$scope.back = function(){	
	$location.path('/tab/forecast');
	}	
	 $scope.goMap= function(){
		$location.path('/apphome/map');
	}
	   if(!$rootScope.ListDataMuadubao)
	   {
		   console.log("co vao day");
			var http = $vndssLogic_Hoapt.DsMuadubao();	
			http.success(function(data){					
					$rootScope.ListDataMuadubao = $vndssLogic_Hoapt.parserList(data);	
					
					$scope.data.from = data.data.from;
					$scope.data.to = data.data.to;
					$scope.date = $filter('date')($scope.ListDataMuadubao, "dd-MM-yyyy");	
					$rootScope.datefrom = $scope.data.from;
					$ionicLoading.hide();
			});	
	   }
	   else{
		  $ionicLoading.hide(); 
	   }
	  var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      },
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2016, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };
});