$(document).ready(function() {
    'use strict';

    Modernizr.load({
        test : YUIUTIL.webGlTest(),
        yep : './Build/Cesium/Cesium.js',
            complete : function(){
                /*YuiSatTrack = new Yuisattrack();
                YuiSatTrack.init();
                alert("complete!!!")*/

                YUISETTINGS.setHaveWebGL(YUIUTIL.webGlTest());
                YUISETTINGS.setHaveCanvas(Modernizr.canvas);

                YUISPMENGINE.loadSPMEngine(function(){
                  YuiSatTrack = new Yuisattrack();
                  YuiSatTrack.init();

                  /*if (YUISETTINGS.getRequireEUCookieLaw()) {
                      jQuery.cookieCuttr({
                          cookieDeclineButton: true,
                          cookieAnalytics: false,
                          cookiePolicyLink: 'privacy_policy.html'
                      });
                  }*/

                });
            },
        nope : function(){}
    });

    /*Modernizr.load({
      test: AGUTIL.webGlTest(),
      yep : './Build/Cesium/Cesium.js',
      complete : function() {
          AGSETTINGS.setHaveWebGL(AGUTIL.webGlTest());
          AGSETTINGS.setHaveCanvas(Modernizr.canvas);

          AGSPMENGINE.loadSPMEngine(function(){
            AGSatTrack = new Agsattrack();
            AGSatTrack.init();

            if (AGSETTINGS.getRequireEUCookieLaw()) {
                jQuery.cookieCuttr({
                    cookieDeclineButton: true,
                    cookieAnalytics: false,
                    cookiePolicyLink: 'privacy_policy.html'
                });
            }

          });
      }
    });*/
});

var YuiSatTrack;
