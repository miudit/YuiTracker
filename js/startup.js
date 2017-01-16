$(document).ready(function() {
    'use strict';

    Modernizr.load({
        test : function(){
            YUIUTIL.webGlTest();
        },
        yep : './Build/Cesium/Cesium.js',
            callback : function( url, result, key ){
                console.log("callback");
                console.log( url ); /* ロードされたリソースのURL */
                console.log( result ); /* testの結果（true|false） */
                console.log( key ); /* yep|nope におけるインデックス（またはキー） */
            },
            complete : function(){
                /*YuiSatTrack = new Yuisattrack();
                YuiSatTrack.init();
                alert("complete!!!")*/

                console.log("compltere");
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
        nope : function(){
            console.log("nope");
        }
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
