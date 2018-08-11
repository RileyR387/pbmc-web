
importScripts('pbmc.js');

var pb_gen   = new PBgenerator();
var my_numbs = [];
var lineCount = 10;

onmessage = function(e) {
   console.log('Message Received: ' + e.data.action );
   switch( e.data.action ){
      case 'Init':
         pb_gen.nMax = e.data.nMax;
         pb_gen.pMax = e.data.pMax;
         pb_gen.nCount = e.data.nCount;
         pb_gen.pCount = e.data.pCount;
         lineCount = e.data.lineCount;
         break;
      case 'RunSim':
         postMessage( RunSim() );
         break;
      case 'GenerateLines':
         console.log("Inside GenerateLines");
         postMessage( GenerateLines() );
         break;
      default:
         console.log("Inside default");
         postMessage( GenerateLines() );
         postMessage( RunSim() );
   }
}

function RunSim (){
   var i=0;
   var pb_numbs = new PBnumbers;

   do {
      pb_gen.Generate(pb_numbs);
      ++i;
      if( i % 1000000 == 0 ){
         postMessage( JSON.stringify( { 'caller' : 'RunSim', 'data': '<p>' + CommaDelmitNum(i) + ' Drawings Occured' } ) );
      }
   } while( ! pb_numbs.inArray( my_numbs ) );

   var html = '<p>Match found on the ' + CommaDelmitNum(i) + ' drawing with values:<br>' + LinesToTable( [ pb_numbs ] ) ;
   var returnObj = {
      'caller' : 'RunSim',
      'data'   : html,
      'lineId' : pb_numbs.lineId(),
      'finished': 1
   };

   return JSON.stringify( returnObj );
}

function GenerateLines(){
   console.log( "Generating " + lineCount + " lines");
   my_numbs = [];
   for(var i = 0; i < lineCount; ++i){
      my_numbs[i] = pb_gen.GenerateNew();
   }
   var returnObj = {
      'caller' : 'GenerateLines',
      'data'   : LinesToTable( my_numbs )
   };
   return JSON.stringify( returnObj );
}

function LinesToTable( lines ){
   var html = '<table class="lines table table-responsive table-striped table-condensed pre-scrollable" >';

   for(var i = 0; i < lines.length; ++i){
      if( i == 0 ){
         html += GetHeader(lines[i]) + '<tbody>';
      }
      html += MakeLine( i+1, lines[i]);
   }
   html += '</tbody></table>';
   return html;
}

function GetHeader( line ) {
   var balls = line.toString().split(" ");
   var th = '<thead><tr class="line_header" ><th>Line #</th>';
   var label = 'R';
   var rballs = 0;
   for( var i = 0; i < balls.length; ++i){
      if( balls[i] == 'P' ){
         label = 'P';
         th += '<th class="lineNum" >&nbsp;</th>';
         rballs=i+1;
      } else {
         th += '<th>' + label + (i+1-rballs) + '</th>';
      }
   }
   th += '</tr></thead>';
   return th;
}

function MakeLine( lineNum, line ){
   var balls = line.toString().split(" ");
   var tr = '<tr id="' + line.lineId() + '" ><td class="lineNum">' + lineNum + '</td>' ;

   for( var i = 0; i < balls.length; ++i){
      if( balls[i] == 'P' ){
         label = 'P';
         tr += '<td class="lineNum" >&nbsp;</td>';
      } else {
         tr += '<td>' + balls[i] + '</td>';
      }
   }
   tr += '</tr>';
   return tr;
}

function CommaDelmitNum( x ){
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
