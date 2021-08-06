// JavaScript Document
// Contains function for TOTALS in Moodle cloze questions

	//Function to update totals in each total box
	function updateTotals(TotalInfo) {
		//Find just the total boxes, and for each one, calculate new total (value)
		var m;
		var countTotalBoxes = 0;  //Count of all TOTAL boxes
		for (m = 0; m < allBoxes.length; m++) {
			//Check to see if the box is a TOTAL box
			var totalBoxTrue = hasSomeParentTheClass(allBoxes[m], 'TOTAL');
			if (totalBoxTrue) {
				//console.log("TOTAL box number " + countTotalBoxes + " is ");
				//Format total boxes 
				allBoxes[m].style.backgroundColor = "rgba(0, 168, 81, 0.3)";
				allBoxes[m].style.color = "black;";
				allBoxes[m].style.fontWeight = "bold";
				//Update total value
				allBoxes[m].value = calculateValue(TotalInfo[countTotalBoxes]);
				//Increment Total Boxes count
				countTotalBoxes = ++countTotalBoxes;				
			}
		}
	}
