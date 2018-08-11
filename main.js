
var results     = $("div#collapseResults");
var myNumbers   = $("div#collapseYourNumbers");
var lineCountIn = $("input#num_lines");
var nCountIn    = $("input#nCount");
var nMaxIn      = $("input#nMax");
var pCountIn    = $("input#pCount");
var pMaxIn      = $("input#pMax");

var drawBtn     = $("button#gen_now");
var runBtn      = $("button#run_sim");
var stopBtn     = $("button#stop");
var clearBtn    = $("button#clear");

var spinner = new Spinner();
var spinTarget = document.getElementById("primary_container");

if( window.Worker ){

   var WorkerScriptSrc = "simulator.js";
   var sim = new Worker( WorkerScriptSrc );
   //sim.addEventListener("message", ResponseHandler, false);

   $("button#play_now").click(function(){
      CloseSettings();
      myNumbers.html( '' );
      lineCountIn.val( 20 );
      InitSim();
      sim.postMessage( { 'action' : 'GenerateLines'}  );
      runBtn.click();
   });

   drawBtn.click(function(){
      if( ! drawBtn.hasClass('disabled') ){
         EnableRun();
         CloseSettings();
         myNumbers.html( '' );
         InitSim();
         sim.postMessage( { 'action' : 'GenerateLines' }  );
      }
   });

   runBtn.click(function(){
      if( ! runBtn.hasClass('disabled') ){
         DisableRun();
         DisableDraw();
         EnableStop();
         DisableClear();
         CloseSettings();
         spinner.spin(spinTarget);
         sim.postMessage( { 'action' : 'RunSim' }  );
      }
   });

   stopBtn.click(function(){
      DisableRun();
      spinner.stop(spinTarget);
      sim.terminate();
   });

   clearBtn.click(function(){
      DisableRun();
      OpenSettings();
      nMaxIn.val( '' );
      pMaxIn.val( '' );
      pCountIn.val( '' );
      nCountIn.val( '' );
      lineCountIn.val( '' );
      myNumbers.html( '' );
      results.html( '' );
      InitSim();
   });

   function InitSim(){
      spinner.stop(spinTarget);
      sim.terminate();
      sim = new Worker( WorkerScriptSrc );
      sim.addEventListener("message", ResponseHandler, false);
      results.html( '' );
      console.log('Posting init message');
      sim.postMessage(
         {
            'action' : 'Init',
            'nMax'   : nMaxIn.val() || 69,
            'pMax'   : pMaxIn.val() || 26,
            'nCount' : nCountIn.val() || 5,
            'pCount' : pCountIn.val() || 1,
            'lineCount': lineCountIn.val() || 10
         }
      );
   }

   function ResponseHandler( e ){

      var result = JSON.parse(e.data);

      switch( result.caller ){
         case 'GenerateLines':
            myNumbers.html( result.data );
            OpenNumbers();
            break;
         case 'RunSim':
            $("#" + result.lineId).addClass('success');
            results.html( result.data );
            if( result.finished ){
               spinner.stop(spinTarget);
               //CloseNumbers();
            }
            OpenResults();
            break;
      }
   }

} else {
   results.html("Your browser doesn't support web workers - Please try another browser.");
}

function OpenSettings(){
   if( ! $("#collapseSettings").hasClass('in') ){
      $("#SettingsTarget").click();
   }
}

function CloseSettings(){
   if( $("#collapseSettings").hasClass('in') ){
      $("#SettingsTarget").click();
   }
}

function OpenResults(){
   if( ! $("#collapseResults").hasClass('in') ){
      $("#ResultsTarget").click();
   }
}

function CloseResults(){
   if( $("#collapseResults").hasClass('in') ){
      $("#ResultsTarget").click();
   }
}

function OpenNumbers(){
   if( ! $("#collapseYourNumbers").hasClass('in') ){
      $("#NumbersTarget").click();
   }
}

function CloseNumbers(){
   if( $("#collapseYourNumbers").hasClass('in') ){
      $("#NumbersTarget").click();
   }
}

function EnableRun(){
   if( runBtn.hasClass('disabled') ){
      runBtn.removeClass('disabled');
   }
}
function DisableRun(){
   if( ! runBtn.hasClass('disabled') ){
      runBtn.addClass('disabled');
   }
}
function EnableStop(){
   if( stopBtn.hasClass('disabled') ){
      stopBtn.removeClass('disabled');
   }
}
function DisableStop(){
   if( ! stopBtn.hasClass('disabled') ){
      stopBtn.addClass('disabled');
   }
}

function EnableClear(){
   if( clearBtn.hasClass('disabled') ){
      clearBtn.removeClass('disabled');
   }
}
function DisableClear(){
   if( ! clearBtn.hasClass('disabled') ){
      clearBtn.addClass('disabled');
   }
}
function EnableDraw(){
   if( drawBtn.hasClass('disabled') ){
      drawBtn.removeClass('disabled');
   }
}
function DisableDraw(){
   if( ! drawBtn.hasClass('disabled') ){
      drawBtn.addClass('disabled');
   }
}
