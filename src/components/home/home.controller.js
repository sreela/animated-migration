(function () {
    'use strict';

    angular
        .module('sapeLabs.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$http', '$scope', '$timeout'];

    function HomeController($http, $scope, $timeout) {
        var vm = this;
        vm.list = [];
        vm.states = [];
        vm.dummyObj1 = {};
        vm.dummyObj2 = {};
        var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
        var planeSVG = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
        vm.proStates = [];
        vm.finStates=[{lines:[],images:[]}];
        vm.dropTo=[];
        vm.dropFrom=[];
        vm.filterArr=[];
        vm.statesFin=[];
        vm.fromTo='from';
        vm.drop = vm.dropTo;
        vm.count = 0;
        vm.countArr=[];


        vm.plotStates = plotStates;
        function activate(){

            //console.log(vm.dropTo[0]);
            $http.get('files/finalCSV.csv').success(function (data) {
                Papa.parse(data, {
                    header: true,
                    complete: function (results) {

                        vm.list = results.data;

                    }
                });
                $http.get('files/toFrom.csv').success(function (data) {
                    Papa.parse(data, {
                        header:true,
                        complete: function (results) {

                            vm.drop = results.data;
                            console.log(vm.drop);
                            populateDrop(vm.drop);

                        }
                    });
                });
            });


            // svg path for target icon

// svg path for plane icon




        }
        activate();

        function plotStates(fromTo){
            vm.arr = [];
            vm.proStates=[];
            if(fromTo=='to'){
                $.each(vm.dropFrom,function(i){
                    if(vm.dropFrom[i].state != 'Punjab'){
                        vm.dummyObj1 = {
                            svgPath: targetSVG,
                            label: vm.dropFrom[i].state,
                            labelPosition:'left',
                            labelRollOverColor:'#000',
                            //labelColor:'#ddd',
                            //labelShiftX:-50,
                            //labelShiftY:-15,
                            latitude: vm.dropFrom[i].latitude,
                            longitude: vm.dropFrom[i].longitude
                        };
                    }


                    vm.proStates.push(vm.dummyObj1);


                });
            }
            if(fromTo=='from') {
                $.each(vm.dropTo, function (i) {
                    if(vm.dropTo[i].state !='noida'){
                        vm.dummyObj2 = {
                            svgPath: targetSVG,
                            title: vm.dropTo[i].state,
                            latitude: vm.dropTo[i].latitude,
                            longitude: vm.dropTo[i].longitude
                            //labelShiftX:-50,
                            //labelShiftY:-15
                            //linkToObject:vm.dropTo[i].state,
                            //color:'#000000',
                            //scale:1.5

                        };
                    } else {
                        vm.dummyObj2 = {
                            svgPath: targetSVG,
                            title: vm.dropTo[i].state,

                            latitude: vm.dropTo[i].latitude,
                            longitude: vm.dropTo[i].longitude,
                            //labelShiftX:-50,
                            labelShiftY:10
                            //linkToObject:vm.dropTo[i].state,
                            //color:'#000000',
                            //scale:1.5

                        };
                    }



                            vm.proStates.push(vm.dummyObj2);


                });
            }

            vm.dummyObj1={};

            console.log('list',vm.list);
            vm.count=0;
            if(fromTo == 'to'){

                for(var t=0;t<vm.dropTo.length;t++){
                    vm.filterArr = [];
                    vm.countArr=[];
                    vm.planeArr=[];



                $.each(vm.list,function(i){


                        if(vm.list[i].JobCity == vm.dropTo[t].state ){

                            vm.dummyObj1 = {id:vm.count,
                                //arc: 0.1,
                                alpha: 1,latitudes:[vm.list[i].fromlat,vm.list[i].tolat],longitudes:[vm.list[i].fromlong,vm.list[i].tolong]};
                            vm.filterArr.push(vm.dummyObj1);
                            vm.countArr.push(vm.count);
                            //if(vm.list[i].CollegeState != '')
                            vm.dummyObj2 = {
                                svgPath: planeSVG,
                                positionOnLine: 0,
                                //color: "#585869",
                                animateAlongLine: true,
                                lineId: vm.count,
                                animationDuration:2,
                                //flipDirection: true,
                                //loop: true,
                                scale: 0.05,
                                positionScale: 1.8
                            };
                            vm.planeArr.push(vm.dummyObj2);
                            vm.count++;




                        }


                });
                    if(vm.dropTo[t].state=='Noida'){
                        vm.proStates[vm.proStates.length] = {id: vm.dropTo[t].state,
                            color: "#CC0000",
                            svgPath: targetSVG,
                            label: vm.dropTo[t].state,
                            labelBackgroundAlpha:1,
                            //labelBackgroundColor:'#ededed',
                            labelFontSize:15,
                            labelColor:'#CC0000',
                            labelRollOverColor:'#0019ff',
                            labelPosition:'top',
                            latitude: vm.dropTo[t].latitude,
                            longitude: vm.dropTo[t].longitude,
                            scale: 1.5,
                            labelShiftY:20,
                            labelShiftX:40,
                            //zoomLevel: 1,
                            //zoomLongitude: vm.selected.longitude,
                            //zoomLatitude: vm.selected.latitude,
                            lines:vm.filterArr,
                            images:vm.planeArr
                        };
                    } else if(vm.dropTo[t].state =='Jaipur'){
                        vm.proStates[vm.proStates.length] = {id: vm.dropTo[t].state,
                            color: "#CC0000",

                            svgPath: targetSVG,
                            label: vm.dropTo[t].state,
                            labelFontSize:15,
                            labelPosition:'bottom',
                            labelRollOverColor:'#0019ff',
                            //labelShiftY:5,
                            latitude: vm.dropTo[t].latitude,
                            longitude: vm.dropTo[t].longitude,
                            scale: 1.5,
                            labelBackgroundAlpha:1,
                            labelColor:'#CC0000',
                            //labelBackgroundColor:'#ededed',
                            //labelShiftY:10,
                            //zoomLevel: 1,
                            //zoomLongitude: vm.selected.longitude,
                            //zoomLatitude: vm.selected.latitude,
                            lines:vm.filterArr,
                            images:vm.planeArr
                        };
                    }else if(vm.dropTo[t].state =='Bengaluru'){
                        vm.proStates[vm.proStates.length] = {id: vm.dropTo[t].state,
                            color: "#CC0000",

                            svgPath: targetSVG,
                            label: vm.dropTo[t].state,
                            labelFontSize:15,
                            labelPosition:'bottom',
                            labelRollOverColor:'#0019ff',
                            //labelShiftY:3,
                            latitude: vm.dropTo[t].latitude,
                            longitude: vm.dropTo[t].longitude,
                            scale: 1.5,
                            labelBackgroundAlpha:1,
                            labelColor:'#CC0000',
                            //labelBackgroundColor:'#ededed',
                            //labelShiftY:10,
                            //zoomLevel: 1,
                            //zoomLongitude: vm.selected.longitude,
                            //zoomLatitude: vm.selected.latitude,
                            lines:vm.filterArr,
                            images:vm.planeArr
                        };
                    }
                    else if(vm.dropTo[t].state !='Pune'){
                        vm.proStates[vm.proStates.length] = {id: vm.dropTo[t].state,
                            color: "#CC0000",

                            svgPath: targetSVG,
                            label: vm.dropTo[t].state,
                            labelFontSize:15,
                            labelPosition:'top',
                            labelShiftY:-5,
                            latitude: vm.dropTo[t].latitude,
                            longitude: vm.dropTo[t].longitude,
                            scale: 1.5,
                            labelBackgroundAlpha:1,
                            labelRollOverColor:'#e02e2e',
                            labelColor:'#CC0000',
                            //labelBackgroundColor:'#ededed',
                            //labelShiftY:10,
                            //zoomLevel: 1,
                            //zoomLongitude: vm.selected.longitude,
                            //zoomLatitude: vm.selected.latitude,
                            lines:vm.filterArr,
                            images:vm.planeArr
                        };
                    }


                }





            }
            vm.count=0;
            if(fromTo == 'from'){
                for(var t=0;t<vm.dropFrom.length;t++){
                    vm.filterArr = [];
                    vm.planeArr=[];
                    vm.countArr=[];
                    //vm.count=0;


                    $.each(vm.list,function(i){


                        if(vm.list[i].CollegeState == vm.dropFrom[t].state ){

                            vm.dummyObj1 = {id:vm.count,
                                //arc: 0.1,
                                alpha: 1,latitudes:[vm.list[i].fromlat,vm.list[i].tolat],longitudes:[vm.list[i].fromlong,vm.list[i].tolong]};
                            vm.filterArr.push(vm.dummyObj1);
                            vm.countArr.push(vm.count);

                                vm.dummyObj2 = {
                                    svgPath: planeSVG,
                                    positionOnLine: 0,
                                    //color: "#585869",
                                    animateAlongLine: true,
                                    lineId: vm.count,
                                    animationDuration:2,
                                    //flipDirection: true,
                                    //loop: true,
                                    scale: 0.05,
                                    positionScale: 1.8
                                };
                                vm.planeArr.push(vm.dummyObj2);
                                vm.count++;





                        }


                    });

                    if(vm.dropFrom[t].state == 'Punjab' ){
                        vm.proStates[vm.proStates.length] = {
                            id: vm.dropFrom[t].state,
                            color: "#000000",
                            svgPath: targetSVG,
                            label: vm.dropFrom[t].state,
                            //labelFontSize:15,
                            labelPosition:'left',
                            latitude: vm.dropFrom[t].latitude,
                            longitude: vm.dropFrom[t].longitude,
                            scale: 1.5,
                            //labelShiftX:-50,
                            //labelShiftY:-20,
                            //zoomLevel: 1,
                            //zoomLongitude: vm.selected.longitude,
                            //zoomLatitude: vm.selected.latitude,
                            lines:vm.filterArr,
                            images: vm.planeArr
                        };
                    }  else if(vm.dropFrom[t].state == 'Haryana' ){
                        vm.proStates[vm.proStates.length] = {
                            id: vm.dropFrom[t].state,
                            color: "#000000",
                            svgPath: targetSVG,
                            label: vm.dropFrom[t].state,
                            //labelFontSize:15,
                            //labelPosition:'top',
                            latitude: vm.dropFrom[t].latitude,
                            longitude: vm.dropFrom[t].longitude,
                            scale: 1.5,
                            labelShiftX:-70,
                            labelShiftY:-20,
                            //zoomLevel: 1,
                            //zoomLongitude: vm.selected.longitude,
                            //zoomLatitude: vm.selected.latitude,
                            lines:vm.filterArr,
                            images: vm.planeArr
                        };
                    }else if(vm.dropFrom[t].state != 'Meghalaya' ) {
                        vm.proStates[vm.proStates.length] = {
                            id: vm.dropFrom[t].state,
                            color: "#000000",
                            svgPath: targetSVG,
                            label: vm.dropFrom[t].state,
                            //labelFontSize:15,
                            //labelPosition:'top',
                            latitude: vm.dropFrom[t].latitude,
                            longitude: vm.dropFrom[t].longitude,
                            scale: 1.5,
                            labelShiftX:-50,
                            labelShiftY:-20,
                            //zoomLevel: 1,
                            //zoomLongitude: vm.selected.longitude,
                            //zoomLatitude: vm.selected.latitude,
                            lines:vm.filterArr,
                            images: vm.planeArr
                        };
                    }



                }



            }


            console.log(vm.proStates);
            makeChart(vm.proStates);


        }

        function populateDrop(states){
            //console.log('hi',states);
            $.each(states, function(i){
                vm.dummyObj1 = {state:states[i].JobCity,latitude:states[i].tolat,longitude:states[i].tolong};
                vm.dummyObj2 = {state:states[i].CollegeState,latitude:states[i].fromlat,longitude:states[i].fromlong};
                if(vm.dummyObj1.latitude){
                    vm.dropTo.push(vm.dummyObj1);
                }
                if(vm.dummyObj2.state){
                vm.dropFrom.push(vm.dummyObj2);
                }
            });
            plotStates(vm.fromTo);
            //console.log(vm.dropTo);
            //console.log(vm.dropFrom);

        }
        $scope.$watch(function () {

            return vm.selected;
        }, function (a, b) {

            if(a != b){

                //filt();


            }
        });
        $scope.$watch(function () {

            return vm.fromTo;
        }, function (a, b) {
            plotStates(vm.fromTo);
            //console.log('fromTo',vm.fromTo);
            if(a != b){

                //console.log(vm.fromTo);
                if(vm.fromTo=='to'){
                    console.log('to');
                    vm.map.areasSettings.unlistedAreasColor = '#FFD11A';
                    vm.map.validateNow();
                } else {
                    vm.map.areasSettings.unlistedAreasColor = '#8DD9EF';
                }

            }
        });



        function makeChart(stateObj){



            vm.map = AmCharts.makeChart( "chartdiv", {
                type: "map",
                "theme": "none",
                //selectedObject:true,
                dataProvider: {
                    map: "indiaHigh",
                    //linkToObject: 'kolkata',
                    images:stateObj

                },

                areasSettings: {
                    unlistedAreasColor: "#8dd9ef"
                },

                imagesSettings: {
                    color: "#585869",
                    rollOverColor: "#585869",
                    selectedColor: "#000000",
                    adjustAnimationSpeed:true
                },

                linesSettings: {
                    //arc: 0.1, // this makes lines curved. Use value from -1 to 1
                    arrow: "middle",
                    color: "#585869",
                    alpha: 1,
                    arrowAlpha: 1,
                    arrowSize: 4
                },

                //balloon:{
                //    drop:true
                //},


                backgroundZoomsToTop: true,
                linesAboveImages: true,

                "export": {
                    "enabled": true
                }
            } );
            console.log(vm.map);
            vm.map.zoomOnDoubleClick = false;

            //AmCharts.theme = AmCharts.themes.dark;
        }

    }
})();