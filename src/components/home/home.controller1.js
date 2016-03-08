(function () {
    'use strict';

    angular
        .module('sapeLabs.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$http', '$rootScope', '$scope', '$timeout', '$document'];

    function HomeController($http, $rootScope, $scope, $timeout, $document) {
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
        vm.fromTo='';
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
                        //console.log(vm.list);
                        //console.log(vm.list);
                        //$.each(vm.list,function(i){
                        //    vm.dummyObj1 = {jobCity:vm.list[i][0],tolat:vm.list[i][1],}
                        //})

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
                $http.get('files/listStates.csv').success(function (data) {
                    Papa.parse(data, {
                        complete: function (results) {

                            vm.states = results.data;
                            //console.log(vm.states);
                            vm.states.splice(vm.states.length-1);
                            //plotStates(vm.states);
                            filt();


                        }
                    });
                });
            });


            // svg path for target icon

// svg path for plane icon




        }
        activate();

        function plotStates(dropTo,dropFrom){
            vm.arr = [];
            //vm.proStates = [{svgPath: targetSVG, title: '', latitude: null, longitude: null}];
            //$.each(dropTo,function(i){
            //    vm.dummyObj1 = {svgPath: targetSVG, title: states[i][0], latitude: states[i][1], longitude: states[i][2]};
            //    vm.proStates.push(vm.dummyObj1);
            //
            //
            //});
            $.each(vm.dropFrom,function(i){
                vm.dummyObj1 = {svgPath: targetSVG, label: vm.dropFrom[i].state, labelShiftX:-50, labelShiftY:-15, latitude: vm.dropFrom[i].latitude, longitude: vm.dropFrom[i].longitude};

                vm.proStates.push(vm.dummyObj1);


            });
            $.each(vm.dropTo, function (i) {
                vm.dummyObj2 = {
                    svgPath: targetSVG,
                    label: vm.dropTo[i].state,
                    latitude: vm.dropTo[i].latitude,
                    longitude: vm.dropTo[i].longitude,
                    linkToObject:vm.dropTo[i].state,
                    color:'#000000',
                    scale:1.5

                };
                vm.proStates.push(vm.dummyObj2);


            });
            makeChart(vm.proStates,null);

            //vm.arr = [];
            //console.log(vm.states);
            //console.log('to',vm.dropTo);
            //console.log('from',vm.dropFrom);
            //vm.fromTo = 'to';
            ////vm.proStates = [{svgPath: targetSVG, title: '', latitude: null, longitude: null}];
            //if(vm.fromTo=='to'){
            //    $.each(vm.dropFrom,function(i){
            //        vm.dummyObj1 = {svgPath: targetSVG, label: vm.dropFrom[i].state, labelShiftX:-50, labelShiftY:-15, latitude: vm.dropFrom[i].latitude, longitude: vm.dropFrom[i].longitude};
            //
            //        vm.proStates.push(vm.dummyObj1);
            //
            //
            //    });
            //    $.each(vm.dropTo, function (i) {
            //        vm.dummyObj2 = {
            //            svgPath: targetSVG,
            //            label: vm.dropTo[i].state,
            //            latitude: vm.dropTo[i].latitude,
            //            longitude: vm.dropTo[i].longitude,
            //            linkToObject:vm.dropTo[i].state,
            //            color:'#000000',
            //            scale:1.5
            //
            //        };
            //        vm.proStates.push(vm.dummyObj2);
            //
            //
            //    });
            //
            //} else if(vm.fromTo=='from'){
            //    $.each(vm.dropFrom,function(i){
            //        vm.dummyObj1 = {svgPath: targetSVG, label: vm.dropFrom[i].state, labelShiftX:-50, labelShiftY:-15, latitude: vm.dropFrom[i].latitude, longitude: vm.dropFrom[i].longitude};
            //
            //        vm.proStates.push(vm.dummyObj1);
            //
            //
            //    });
            //    $.each(vm.dropTo, function (i) {
            //        vm.dummyObj2 = {
            //            svgPath: targetSVG,
            //            label: vm.dropTo[i].state,
            //            latitude: vm.dropTo[i].latitude,
            //            longitude: vm.dropTo[i].longitude
            //
            //        };
            //        vm.proStates.push(vm.dummyObj2);
            //
            //
            //    });
            //}
            //
            //vm.selected = {state: "bengaluru", latitude: "12.97", longitude: "77.59", $$hashKey: "object:34"};
            //

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
            //plotStates(vm.dropTo,vm.dropFrom);
            //console.log(vm.dropTo);
            //console.log(vm.dropFrom);

        }
        $scope.$watch(function () {

            return vm.selected;
        }, function (a, b) {

            if(a != b){

                filt();


            }
        });
        $scope.$watch(function () {

            return vm.fromTo;
        }, function (a, b) {
            //console.log('fromTo',vm.fromTo);
            if(a != b){

                //console.log(vm.fromTo);
                if(a=='to'){
                    vm.drop = vm.dropTo;
                } else {
                    vm.drop = vm.dropFrom;
                }

            }
        });

        function filt(){
            vm.filterArr = [];
            vm.dummyObj1={};
            //vm.count = 0;
            vm.countArr=[];
            vm.proStates=[];

            //console.log(vm.selected);
            //console.log(vm.list);

            vm.filter = {state: "bengaluru", latitude: "12.97", longitude: "77.59", $$hashKey: "object:34"};
            //console.log(vm.list);
            vm.dummyObj1={};
            if(vm.fromTo == 'to'){
                $.each(vm.list,function(i){
                    if(vm.list[i].JobCity == vm.selected.state){
                        vm.dummyObj1 = {id:vm.count,arc: 0.1, alpha: 0.3,latitudes:[vm.list[i].fromlat,vm.list[i].tolat],longitudes:[vm.list[i].fromlong,vm.list[i].tolong]};
                        vm.filterArr.push(vm.dummyObj1);
                        vm.countArr.push(vm.count);
                        vm.count++;

                    }
                });
            } else if(vm.fromTo == 'from'){
                $.each(vm.list,function(i){
                    if(vm.list[i].CollegeState == vm.selected.state){
                        vm.dummyObj1 = {id:vm.count,arc: 0.1, alpha: 0.3,latitudes:[vm.list[i].fromlat,vm.list[i].tolat],longitudes:[vm.list[i].fromlong,vm.list[i].tolong]};
                        vm.filterArr.push(vm.dummyObj1);
                        vm.countArr.push(vm.count);
                        vm.count++;
                    }
                });
            }


            //console.log(vm.filterArr);






            //console.log('lines',vm.finStates);
            //makeChart(vm.finStates);
            //console.log(vm.proStates);
            vm.proStates[vm.proStates.length] = {id: vm.selected.state,
                color: "#000000",
                svgPath: targetSVG,
                label: vm.selected.state,
                latitude: vm.selected.latitude,
                longitude: vm.selected.longitude,
                scale: 1.5,
                //zoomLevel: 1,
                //zoomLongitude: vm.selected.longitude,
                //zoomLatitude: vm.selected.latitude,
                lines:vm.filterArr};

            for(var t=0;t<vm.countArr.length;t++){
                vm.proStates.push({
                    svgPath: planeSVG,
                    positionOnLine: 0,
                    //color: "#585869",
                    animateAlongLine: true,
                    lineId: vm.countArr[t],
                    //flipDirection: true,
                    //loop: true,
                    scale: 0.05,
                    positionScale: 1.8
                });
            }

            vm.arr = [];
            console.log(vm.states);
            console.log('to',vm.dropTo);
            console.log('from',vm.dropFrom);
            //vm.proStates = [{svgPath: targetSVG, title: '', latitude: null, longitude: null}];
            if(vm.fromTo=='to'){
                $.each(vm.dropFrom,function(i){
                    vm.dummyObj1 = {svgPath: targetSVG, label: vm.dropFrom[i].state, labelShiftX:-50, labelShiftY:-15, latitude: vm.dropFrom[i].latitude, longitude: vm.dropFrom[i].longitude};

                    vm.proStates.push(vm.dummyObj1);


                });
                $.each(vm.dropTo, function (i) {
                    vm.dummyObj2 = {
                        svgPath: targetSVG,
                        label: vm.dropTo[i].state,
                        latitude: vm.dropTo[i].latitude,
                        longitude: vm.dropTo[i].longitude,
                        linkToObject:vm.dropTo[i].state,
                        color:'#000000',
                        scale:1.5

                    };
                    vm.proStates.push(vm.dummyObj2);


                });

            } else if(vm.fromTo=='from'){
                $.each(vm.dropFrom,function(i){
                    vm.dummyObj1 = {svgPath: targetSVG, label: vm.dropFrom[i].state, labelShiftX:-50, labelShiftY:-15, latitude: vm.dropFrom[i].latitude, longitude: vm.dropFrom[i].longitude};

                    vm.proStates.push(vm.dummyObj1);


                });
                $.each(vm.dropTo, function (i) {
                    vm.dummyObj2 = {
                        svgPath: targetSVG,
                        label: vm.dropTo[i].state,
                        latitude: vm.dropTo[i].latitude,
                        longitude: vm.dropTo[i].longitude

                    };
                    vm.proStates.push(vm.dummyObj2);


                });
            }







            //console.log('yo',vm.proStates);


            //makeChart(vm.proStates,vm.selected.state);
            //vm.map.dataProvider={linkToObject: vm.selected.state,images:vm.proStates};
            //vm.map.clearMap();
            makeChart(vm.proStates,vm.selected.state);
            console.log(vm.proStates);
            //vm.map.write('chartdiv');
        }

        function makeChart(stateObj,linkto){



            vm.map = AmCharts.makeChart( "chartdiv", {
                type: "map",
                "theme": "none",
                dataProvider: {
                    map: "indiaHigh",
                    linkToObject: linkto,
                    images:stateObj
                    //images: [ {
                    //    id: "london",
                    //    color: "#000000",
                    //    svgPath: targetSVG,
                    //    title: "London",
                    //    latitude: 51.5002,
                    //    longitude: -0.1262,
                    //    scale: 1.5,
                    //    zoomLevel: 2.74,
                    //    zoomLongitude: -20.1341,
                    //    zoomLatitude: 49.1712,
                    //
                    //    lines: [ {
                    //        latitudes: [ 51.5002, 50.4422 ],
                    //        longitudes: [ -0.1262, 30.5367 ]
                    //    }, {
                    //        latitudes: [ 51.5002, 46.9480 ],
                    //        longitudes: [ -0.1262, 7.4481 ]
                    //    }, {
                    //        latitudes: [ 51.5002, 59.3328 ],
                    //        longitudes: [ -0.1262, 18.0645 ]
                    //    }, {
                    //        latitudes: [ 51.5002, 40.4167 ],
                    //        longitudes: [ -0.1262, -3.7033 ]
                    //    }, {
                    //        latitudes: [ 51.5002, 46.0514 ],
                    //        longitudes: [ -0.1262, 14.5060 ]
                    //    }, {
                    //        latitudes: [ 51.5002, 48.2116 ],
                    //        longitudes: [ -0.1262, 17.1547 ]
                    //    }, {
                    //        latitudes: [ 51.5002, 44.8048 ],
                    //        longitudes: [ -0.1262, 20.4781 ]
                    //    }, {
                    //        latitudes: [ 51.5002, 55.7558 ],
                    //        longitudes: [ -0.1262, 37.6176 ]
                    //    }, {
                    //        latitudes: [ 51.5002, 38.7072 ],
                    //        longitudes: [ -0.1262, -9.1355 ]
                    //    }, {
                    //        latitudes: [ 51.5002, 54.6896 ],
                    //        longitudes: [ -0.1262, 25.2799 ]
                    //    }, {
                    //        latitudes: [ 51.5002, 64.1353 ],
                    //        longitudes: [ -0.1262, -21.8952 ]
                    //    }, {
                    //        latitudes: [ 51.5002, 40.4300 ],
                    //        longitudes: [ -0.1262, -74.0000 ]
                    //    } ],
                    //
                    //    images: [ {
                    //        label: "Flights from London",
                    //        svgPath: planeSVG,
                    //        left: 100,
                    //        top: 45,
                    //        labelShiftY: 5,
                    //        color: "#CC0000",
                    //        labelColor: "#CC0000",
                    //        labelRollOverColor: "#CC0000",
                    //        labelFontSize: 20
                    //    }, {
                    //        label: "show flights from Vilnius",
                    //        left: 106,
                    //        top: 70,
                    //        labelColor: "#000000",
                    //        labelRollOverColor: "#CC0000",
                    //        labelFontSize: 11,
                    //        linkToObject: "vilnius"
                    //    } ]
                    //},
                    //
                    //    {
                    //        id: "vilnius",
                    //        color: "#000000",
                    //        svgPath: targetSVG,
                    //        title: "Vilnius",
                    //        latitude: 54.6896,
                    //        longitude: 25.2799,
                    //        scale: 1.5,
                    //        zoomLevel: 4.92,
                    //        zoomLongitude: 15.4492,
                    //        zoomLatitude: 50.2631,
                    //
                    //        lines: [ {
                    //            latitudes: [ 54.6896, 50.8371 ],
                    //            longitudes: [ 25.2799, 4.3676 ]
                    //        }, {
                    //            latitudes: [ 54.6896, 59.9138 ],
                    //            longitudes: [ 25.2799, 10.7387 ]
                    //        }, {
                    //            latitudes: [ 54.6896, 40.4167 ],
                    //            longitudes: [ 25.2799, -3.7033 ]
                    //        }, {
                    //            latitudes: [ 54.6896, 50.0878 ],
                    //            longitudes: [ 25.2799, 14.4205 ]
                    //        }, {
                    //            latitudes: [ 54.6896, 48.2116 ],
                    //            longitudes: [ 25.2799, 17.1547 ]
                    //        }, {
                    //            latitudes: [ 54.6896, 44.8048 ],
                    //            longitudes: [ 25.2799, 20.4781 ]
                    //        }, {
                    //            latitudes: [ 54.6896, 55.7558 ],
                    //            longitudes: [ 25.2799, 37.6176 ]
                    //        }, {
                    //            latitudes: [ 54.6896, 37.9792 ],
                    //            longitudes: [ 25.2799, 23.7166 ]
                    //        }, {
                    //            latitudes: [ 54.6896, 54.6896 ],
                    //            longitudes: [ 25.2799, 25.2799 ]
                    //        }, {
                    //            latitudes: [ 54.6896, 51.5002 ],
                    //            longitudes: [ 25.2799, -0.1262 ]
                    //        }, {
                    //            latitudes: [ 54.6896, 53.3441 ],
                    //            longitudes: [ 25.2799, -6.2675 ]
                    //        } ],
                    //
                    //        images: [ {
                    //            label: "Flights from Vilnius",
                    //            svgPath: planeSVG,
                    //            left: 100,
                    //            top: 45,
                    //            labelShiftY: 5,
                    //            color: "#CC0000",
                    //            labelColor: "#CC0000",
                    //            labelRollOverColor: "#CC0000",
                    //            labelFontSize: 20
                    //        }, {
                    //            label: "show flights from London",
                    //            left: 106,
                    //            top: 70,
                    //            labelColor: "#000000",
                    //            labelRollOverColor: "#CC0000",
                    //            labelFontSize: 11,
                    //            linkToObject: "london"
                    //        } ]
                    //    }, {
                    //        svgPath: targetSVG,
                    //        title: "Brussels",
                    //        latitude: 50.8371,
                    //        longitude: 4.3676
                    //    }, {
                    //        svgPath: targetSVG,
                    //        title: "Prague",
                    //        latitude: 50.0878,
                    //        longitude: 14.4205
                    //    }, {
                    //        svgPath: targetSVG,
                    //        title: "Athens",
                    //        latitude: 37.9792,
                    //        longitude: 23.7166
                    //    }, {
                    //        svgPath: targetSVG,
                    //        title: "Reykjavik",
                    //        latitude: 64.1353,
                    //        longitude: -21.8952
                    //    }, {
                    //        svgPath: targetSVG,
                    //        title: "Dublin",
                    //        latitude: 53.3441,
                    //        longitude: -6.2675
                    //    }, {
                    //        svgPath: targetSVG,
                    //        title: "Oslo",
                    //        latitude: 59.9138,
                    //        longitude: 10.7387
                    //    }, {
                    //        svgPath: targetSVG,
                    //        title: "Lisbon",
                    //        latitude: 38.7072,
                    //        longitude: -9.1355
                    //    }, {
                    //        svgPath: targetSVG,
                    //        title: "Moscow",
                    //        latitude: 55.7558,
                    //        longitude: 37.6176
                    //    }, {
                    //        svgPath: targetSVG,
                    //        title: "Belgrade",
                    //        latitude: 44.8048,
                    //        longitude: 20.4781
                    //    }, {
                    //        svgPath: targetSVG,
                    //        title: "Bratislava",
                    //        latitude: 48.2116,
                    //        longitude: 17.1547
                    //    }, {
                    //        svgPath: targetSVG,
                    //        title: "Ljubljana",
                    //        latitude: 46.0514,
                    //        longitude: 14.5060
                    //    }, {
                    //        svgPath: targetSVG,
                    //        title: "Madrid",
                    //        latitude: 40.4167,
                    //        longitude: -3.7033
                    //    }, {
                    //        svgPath: targetSVG,
                    //        title: "Stockholm",
                    //        latitude: 59.3328,
                    //        longitude: 18.0645
                    //    }, {
                    //        svgPath: targetSVG,
                    //        title: "Bern",
                    //        latitude: 46.9480,
                    //        longitude: 7.4481
                    //    }, {
                    //        svgPath: targetSVG,
                    //        title: "Kiev",
                    //        latitude: 50.4422,
                    //        longitude: 30.5367
                    //    }, {
                    //        svgPath: targetSVG,
                    //        title: "Paris",
                    //        latitude: 48.8567,
                    //        longitude: 2.3510
                    //    }, {
                    //        svgPath: targetSVG,
                    //        title: "New York",
                    //        latitude: 40.43,
                    //        longitude: -74
                    //    }
                    //]
                },

                areasSettings: {
                    unlistedAreasColor: "#8dd9ef"
                },

                imagesSettings: {
                    color: "#585869",
                    rollOverColor: "#585869",
                    selectedColor: "#000000"
                },

                linesSettings: {
                    arc: 0.1, // this makes lines curved. Use value from -1 to 1
                    arrow: "middle",
                    color: "#585869",
                    alpha: 0.3,
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
            //AmCharts.theme = AmCharts.themes.dark;
        }

    }
})();