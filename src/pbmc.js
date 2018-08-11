// Author: Riley Raschke
// © 2016 rrappsdev.com
// DWTFYW Licensce - Just mention me

function PBgenerator(){
   this.nMax = 69;
   this.pMax = 26;
   this.nCount = 5;
   this.pCount = 1;

   this.GenerateNew = function () {
      var newPBnumbers = new PBnumbers();
      var nNums = [];
      var pNums  = [];
      var i;
      var j;
      var k;

      for(i = 0; i < this.nCount; ++i){
         nNums[i] = this.GetRand(1,this.nMax);
      }

      for(i = 0; i < this.nCount; ++i){
         for(j = i+1; j < this.nCount; ++j){
            if(nNums[i] == nNums[j]){
               i = -1;
               for(k = 0; k < this.nCount; ++k){
                  nNums[k] = this.GetRand(1,this.nMax);
               }
            }
         }
      }

      for(i = 0; i < this.pCount; ++i){
         pNums[i] = this.GetRand(1,this.pMax);
      }
      for(i = 0; i < this.pCount; ++i){
         for(j = i+1; j < this.pCount; ++j){
            if(pNums[i] == pNums[j]){
               i = -1;
               for(k = 0; k < this.pCount; ++k){
                  pNums[k] = this.GetRand(1,this.pMax);
               }
            }
         }
      }


      newPBnumbers.set( nNums, pNums );
      return newPBnumbers;
   };

   this.Generate = function( numbs_in ){
      var nNums = [];
      var pNums = [];
      var i;
      var j;
      var k;

      for(i = 0; i < this.nCount; ++i){
         nNums[i] = this.GetRand(1,this.nMax);
      }

      for(i = 0; i < this.nCount; ++i){
         for(j = i+1; j < this.nCount; ++j){
            if(nNums[i] == nNums[j]){
               i = -1;
               for(k = 0; k < this.nCount; ++k){
                  nNums[k] = this.GetRand(1,this.nMax);
               }
            }
         }
      }

      for(i = 0; i < this.pCount; ++i){
         pNums[i] = this.GetRand(1,this.pMax);
      }
      for(i = 0; i < this.pCount; ++i){
         for(j = i+1; j < this.pCount; ++j){
            if(pNums[i] == pNums[j]){
               i = -1;
               for(k = 0; k < this.pCount; ++k){
                  pNums[k] = this.GetRand(1,this.pMax);
               }
            }
         }
      }

      numbs_in.set( nNums, pNums );
   }

   this.GetRand = function(min,max){
      return Math.floor((Math.random()*max)+ min);
   };

}

function PBnumbers() {
   this.nNums = [];
   this.pNums = [];

   this.isEqual = function( nums ){
      var i;
      var max = this.nNums.length;
      for( i = 0; i < max; ++i){
         if( this.nNums[i] != nums.nNums[i] ){
            return false;
         }
      }
      max = this.pNums.length;
      for( i = 0; i < max; ++i){
         if( this.pNums[i] != nums.pNums[i] ){
            return false;
         }
      }
      return true;
   };

   this.set = function(nNumsArray, pNumsArray){
      this.nNums = nNumsArray;
      this.nNums.sort(function(a,b){ return a-b; });

      this.pNums = pNumsArray;
      this.pNums.sort(function(a,b){ return a-b; });
   };

   this.toString = function(){
      var result = "";
      for( var i = 0; i < this.nNums.length; ++i){
         if( i != 0 ){
            result += ' ';
         }
         result += this.nNums[i];
      }
      for( var i = 0; i < this.pNums.length; ++i){
         if( i != 0 ){
            result += ' ';
         } else {
            result += ' P ';
         }
         result += this.pNums[i];
      }
      return result;
   };

   this.inArray = function( PBnumbersArray ){
      var count = PBnumbersArray.length;
      for(var i = 0; i < count; ++i){
         if(this.isEqual( PBnumbersArray[i] )){
            return true;
         }
      }
      return false;
   };

   this.lineId = function(){
      return this.toString().replace(/\s+/g,'');
   }
};


