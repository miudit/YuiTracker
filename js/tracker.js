var Yuisattrack = function() {
	'use strict';

	var _observers = [];
    var _tle = new YUITLE();
	var _ui = null;
	var refreshCounter = 0;
	var refreshInterval = 1;
	//var _planets = new AGPLANETS();
	var _initComplete = false; // Don't like this
	var _speed = 1;
	var _following = null;

    function bindEvents() {
        jQuery(document).bind('yuisattrack.tleloaded', function() {
            //_ui.updateInfoPane();
        });
        jQuery(document).bind('yuisattrack.satselected', function() {
            //_ui.updateInfoPane();
        });

		/**
		 * Listen for an event to load a new set of elements
		 */
		/*jQuery(document).bind('yuisattrack.loadelements', function(event, params) {
			_tle.load(params.filename);
		});*/
		jQuery(document).bind('yuisattrack.loadelements', function() {
			_tle.load();
		});

		/**
		 * Listen for an event indicating the observer position is now set. After it is
		 * start the calculation loop.
		 * TODO: Don't like the use of _initComplete in here. This is needed to stop the
		 * agsattrack.changeview event from firing a calculation before an observer is
		 * available. This is event is fired when the UI tabs are created.
		 *
		 */
		jQuery(document).bind('yuisattrack.locationAvailable', function() {
			//_initComplete = true;
			calculationLoop();
		});

		jQuery(document).bind('yuisattrack.locationUpdated', function() {
			//_initComplete = true;
			calculationLoop();
		});

		jQuery(document).bind('yuisattrack.satclicked', function(event, params) {
            var index = _tle.getSatelliteIndex(params.catalogNumber);
            if (index !== -1) {
                if (typeof params.state !== 'undefined') {
                    _tle.getSatellite(index).setSelected(params.state);
                } else {
                    var toggleSat = _tle.getSatellite(index);
                    if (typeof toggleSat !== 'undefined') {
                        toggleSat.toggleSelected();
                    } else {
                    }
                }

                var sat = _tle.getSatellite(index);
                if (sat.getSelected()) {
                    sat.requestOrbit();
                    var name = sat.getName();
                    //_ui.updateInfo('Orbit Requested For ' + name);
                }

                var _selected = _tle.getSelected();
			    calculate(true);
			    jQuery(document).trigger('yuisattrack.newsatselected', {satellites: _selected});
                //_ui.updateInfoPane();
            }
		});

		jQuery(document).bind('yuisattrack.forceupdate', function(event) {
			calculate(true);
		});

		/*jQuery(document).bind('yuisattrack.updatesatdata', function(event, selected) {
            if (_render) {
                if (YUISETTINGS.getHaveWebGL()) {
                    updateSatellites();
                }
            }
        });*/

		jQuery(document).trigger('yuisattrack.loadelements')
		console.log("loadelements triggered")
	}

    function calculationLoop() {
		console.log("in calculationLoop")
        function updateTime() {
            updateTimeInToolbar();
            setTimeout(updateTime, 1000);
        }
        setTimeout(updateTime, 1000);

		function calc() {
			calculate(false);
			setTimeout(calc, YUISETTINGS.getRefreshTimerInterval());
		}
		setTimeout(calc, YUISETTINGS.getRefreshTimerInterval());
	}

	function updateTimeInToolbar() {
        var julianDate;

        if (YUISETTINGS.getHaveWebGL()) {
            //jQuery('#currenttime').html(Cesium.JulianDate.toDate(Cesium.JulianDate.now()).toString());
        }

    }

    function calculate(forceRefresh) {
		var julianDate;

        //_ui.updateStatus('Calculating');

        if (YUISETTINGS.getHaveWebGL()) {
            var cDate = Cesium.JulianDate.now()
            julianDate = cDate.dayNumber + cDate.secondsOfDay;
        } else {
            julianDate = Date.Date2Julian(new Date());
        }

		//_planets.update(julianDate, _observers[0]);

		//if (_tle.getTotalDisplaying() > 0) {
		if(true) {
            /*var activeView = AGVIEWS.getCurrentView();
            if (typeof activeView.instance !== 'undefined' && typeof activeView.instance.calculate === 'function') {  // TODO: Move this
                activeView.instance.calculate(_observers[0], _observers[1]);
            } else {
                var date = new Date();
                _tles.calcAll(date, _observers[0], _observers[1]);
            }*/
			var date = new Date();
			_tle.calcAll(date, _observers[0], _observers[1]);

			refreshCounter++;
			if (refreshCounter >= refreshInterval || forceRefresh) {
				refreshCounter = 0;
				jQuery(document).trigger('yuisattrack.updatesatdata', {});
				console.log("updatesatdata triggered")
			}
		} else {
			jQuery(document).trigger('yuisattrack.updatesatdata', {});
			console.log("updatesatdata triggered")
		}

        //_ui.updateStatus('Idle');

    }

	function addOrbitLine(sat) {
        var orbit = sat.getOrbitData();
        if (typeof orbit !== 'undefined' && typeof orbit.points[0] !== 'undefined') {
            if (sat.isGeostationary() && sat.get('elevation') > 0) {
                plotLine(orbit.points, 'green', passLines, 1, false);
            } else {
                var pass = sat.getNextPass();
                plotLine(orbit.points, 'red', passLines, 1, false);
                if (parseInt(sat.get('orbitnumber'),10) === parseInt(pass.orbitNumber,10)) {
                    plotLine(pass.pass, 'green', passLines, 2, true);
                }
            }
        }
	}

	function resetOrbit() {
        /*orbitLines.removeAll();
        passLines.removeAll();
        footprintCircle.removeAll();*/
    }

    function setupOrbit() {
        resetOrbit();
        var selected = YuiSatTrack.getTle().getSelected();
        for (var i=0; i< selected.length; i++) {
            addOrbitLine(selected[i]);
        }
        drawFootprint();
    }

	function updateSatellites() {
        /*var now = new Cesium.JulianDate();
        var newpos, bb;
        var following = AGSatTrack.getFollowing();
        var target;
        var up = new Cesium.Cartesian3();
        var satellites;
        var okToUpdate = false;
        var eye;

        if (_mode !== AGVIEWS.modes.SINGLE) {
            satellites = AGSatTrack.getSatellites();
            okToUpdate = true;
        } else {
            if (_singleSat !== null) {
                satellites = [_singleSat];
                okToUpdate = true;
            }
        }

        for ( var i = 0; i < satBillboards.length; i++) {

            bb = satBillboards.get(i);

            var offset = 4;
            var visibility = satellites[bb.satelliteindex].get('visibility');
            if ( visibility === 'Daylight' || visibility === 'Visible') {
                offset = 0;
            }

            if (satellites[bb.satelliteindex].getSelected()) {
                if (satellites[i].getCatalogNumber() === '25544') {
                    bb.image = satImages[3];
                } else {
                    bb.image = satImages[1 + offset];
                }
            } else {
                if (satellites[i].getCatalogNumber() === '25544') {
                    bb.image = satImages[2];
                } else {
                    bb.image = satImages[0 + offset];;
                }
            }
			newpos = Cesium.Cartesian3.fromDegrees(satellites[bb.satelliteindex].get('longitude'), satellites[bb.satelliteindex].get('latitude'), satellites[bb.satelliteindex].get('altitude')*1000);
        }*/
        setupOrbit();
    }

	function loadAvailablesatellites(item) {
        if (typeof item === 'undefined') {
            item = jQuery("#sat-group-selector-listbox").jqxListBox('getSelectedItem');
        }
        jQuery(document).trigger('yuisattrack.loadelements', {
            filename : item
        });
    }

	function setAjaxCallers() {
		$('#submit').click(function(){
			var data = {
				lon : $('#lon').val(),
				lat : $('#lat').val(),
				data : $('#data').val(),
				comment : $('#comment').val(),
			};
			$.ajax({
				type: "POST",
				url: "./php/add-report.php",
				data: data,
				success: function(data, dataType){
	  				console.log("SUCCESS! data = ", data);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
	  				alert('Error : ' + errorThrown);
	  				$("#XMLHttpRequest").html("XMLHttpRequest : " + XMLHttpRequest.status);
	  				$("#textStatus").html("textStatus : " + textStatus);
	  				$("#errorThrown").html("errorThrown : " + errorThrown);
				}
  			});
  			return false;
		});
	}

    return {

        getTles : function() {
			return _tle;
		},

        getSatellite : function(index) {
			return _tle.getSatellite(index);
		},

        init : function() {
			var _active = 0;

            bindEvents();
			setAjaxCallers();

			_observers[0] = new YUIOBSERVER(YUIOBSERVER.types.HOME).init(YUISETTINGS.getObserver());
			var _3dview = new YUI3DVIEW()
			_3dview.init()
            /*AGVIEWS.switchView(AGVIEWS.getCurrentViewName());

            AGVIEWS.resizeLayout();

            _observers[0] = new AGOBSERVER(AGOBSERVER.types.HOME).init(AGSETTINGS.getObserver());
            _observers[1] = new AGOBSERVER(AGOBSERVER.types.MUTUAL).init(AGSETTINGS.getMutualObserver());*/

		}
    }
}
