// Node script to read arrays of integerss from a csv and find
// all pairs which satisfy the compound probability assumptions
// listed in the accompanying readme.txt file.
// This code ran in 3.85 seconds on a 2.5Ghz i7 Macbook Pro OSX 10.11.


require('runtimer');
var PROBABILITY_1 = 0.7;
var PROBABILITY_2 = 0.7;
var stringArray = [];
var intArray= [];
var countsArray = [];
var maxInt = 0;



function readFile(callback) {
  var fs = require('fs'),
  readline = require('readline');
  var rd = readline.createInterface({
    input: fs.createReadStream('./Array_List.txt'),
    stringArray: process.stdout,
    terminal: false
  });
  rd.on('line', function getLine(line) {
    stringArray.push(line);

  })
  rd.on('close', function endRead(){
    callback(stringArray);
    process.exit(0);
  })
}

function casttoInt(callback) {
  var arrayLength = stringArray.length;
  for (var i = 0; i < arrayLength; i++) {
    var line = (stringArray[i])
                .split(',')
                .map(function(item) {
      return parseInt(item, 10);
    });
    intArray.push(line);
    var largest = Math.max.apply(Math, line);
    if (largest > maxInt){
      maxInt = largest;
    }
  }
  callback(intArray);
}

function analyzeLines(callback) {
  var arrayLength = intArray.length;
  var count = (maxInt * (maxInt - 1))/2;
  for (var i = 0; i < count; i++) {
    countsArray.push([0, 0, 0]);
  }
  for (var i = 0; i < arrayLength; i++) {
    var n = 0;
    for (var j = 2; j <= maxInt; j++) {
      for (var k = 1; k < j; k++) {
        countsArray[n][0] += intArray[i].indexOf(j) > -1;
        countsArray[n][1] += intArray[i].indexOf(k) > -1;
        countsArray[n][2] += intArray[i].indexOf(j) > -1 &&
                             intArray[i].indexOf(k) > -1;
        n++;
      }
    }
  }
  for (var i = 0; i < count; i++) {
    countsArray[i][0] /= parseFloat(arrayLength);
    countsArray[i][1] /= parseFloat(arrayLength);
    countsArray[i][2] /= parseFloat(arrayLength);
  }
  callback(countsArray);
}

function analyzeArray(callback) {
  var n = 0;
  console.log('\nWith PROBABILITY_1 = '+ PROBABILITY_1 + ' and PROBABILITY_2 = '
               + PROBABILITY_2 + ',\nthe following pairs lie within the same group:\n');
  for (var j = 2; j <= maxInt; j++) {
    for (var k = 1; k < j; k++) {
      if (countsArray[n][0] * PROBABILITY_1 < countsArray[n][2] &&
        countsArray[n][1] * PROBABILITY_2 < countsArray[n][2]){
        console.log(j,k);
        }
    n++;
    }
  }
  callback();
}

function main(callback) {
  readFile(function() {
    casttoInt(function() {
      analyzeLines(function(){
        analyzeArray(function(){
          callback();
        });
      });
    });
  });
}

main(function(){});
