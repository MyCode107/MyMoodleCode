// JavaScript Document
// Contains OFR function re Moodle cloze questions

	//Check whether an OFR box should be shaded to highlight that extra marks should be added - move to OFR file ***************************************
	function OFRCheck(OFRInfo) {
		//Cycle through all input boxes in question
		var i;
		var OFRTrue;
		var OFRValue;
		var OFRCount = 0;  //Count of all OFR boxes, correct or incorrect
		for (i = 0; i < allBoxes.length; i++) {
			//Check to see if the box is an OFR box
			OFRTrue = hasSomeParentTheClass(allBoxes[i], 'OFR');
			if (OFRTrue) {
				console.log("OFR box number " + OFRCount + " is ");
				//Check to see if the OFR box is incorrect
				if (allBoxes[i].classList.contains("incorrect")) {
					console.log("incorrect");
					//If box is an OFR and incorrect, use OFRInfo to determine if background colour should change
					//But first check that an OFR calculation has been entered by user
					if (!(typeof OFRInfo[OFRCount] == 'undefined')) {
						OFRValue = calculateValue(OFRInfo[OFRCount]);
						console.log("OFRValue = " + OFRValue + " versus Box Value = " + allBoxes[i].value);
						//If input box value and OFR calculated value are the same, change background colour
						if (allBoxes[i].value == OFRValue && (!(allBoxes[i].value == ''))) {
							allBoxes[i].style.backgroundColor = "rgba(253, 212, 5, 0.3)";	
						}  //End colour change IF statement
					}
					else {
						console.log("No valid OFR calculation given.");
					} //End of IF statement that checks whether an OFR calculationn has been entered
				}
				else {
					console.log("correct");
				}  //End of IF statment that checks if OFR box is incorrect
				//Increment OFR count
				OFRCount = ++OFRCount;
			}  //End of IF statement that checks if input box is an OFR box
		}  //End of FOR loop working through all input boxes in question
	}  //End of OFRCheck function