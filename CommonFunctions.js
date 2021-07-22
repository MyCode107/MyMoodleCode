//JavaScript Document
//Contains common functions re Moodle Cloze Questions

//Function to check parent classes of element
	// Returns true if the element or one of its parents has the class classname
	// Used because no direct access to input boxes
	function hasSomeParentTheClass(element, classname) {
		if (element.className.split(' ').indexOf(classname)>=0) return true;
		try {
			return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
		} catch(Typeerror){return false;}	
	}

	//Create array of all input boxes in question
	function getBoxes(){	
		//Create array of all input boxes on page (not just question)
		var allBoxesOnPage = document.getElementsByClassName('form-control');
		//Create empty array of all input boxes just in question
		allBoxes = new Array(); //Not using var means global variable
		//Find just those boxes within question and populate allBoxes array
		var n;
		for (n = 0; n < allBoxesOnPage.length; n++) {
			var questionBoxTrue = hasSomeParentTheClass(allBoxesOnPage[n], 'formulation');
			if (questionBoxTrue) {
				allBoxes.push(allBoxesOnPage[n]);
			}
		}
	}

	//Using an array of strings denoting calculations, calculate a value for a given input box
	//Format = [sign, +, -, * or /] followed by either ["B" (or "b") and a number representing the input box number in question] or [simply a number]
	//However, last element in array (must be integer) represents number of decimal places to round calculated value
	function calculateValue(Calculation) {
		var ReturnValue = 0;
		var m;
		try {
			//For each calculation in the array 'Calculation'
			for (m = 0; m < Calculation.length-1; m++) {
				console.log("Step " + (m+1) + " " + Calculation[m]);
				if (Calculation[m].charAt(1) == "B" || Calculation[m].charAt(1) == "b") {
					//If rest of string contains only digits then convert to boxNum and update ReturnValue
					if (/^\d+$/.test(Calculation[m].substring(2))) {
						var boxNum = parseFloat(Calculation[m].substring(2));
						switch(Calculation[m].charAt(0)) {
							case "+":
								if (!(Number.isNaN(parseFloat(allBoxes[boxNum].value)))) {
									ReturnValue += parseFloat(allBoxes[boxNum].value);
								}
								break
							case "-":
								if (!(Number.isNaN(parseFloat(allBoxes[boxNum].value)))) {
									ReturnValue -= parseFloat(allBoxes[boxNum].value);
								}
								break
							case "/":
								if (!(Number.isNaN(parseFloat(allBoxes[boxNum].value)))) {
									ReturnValue /= parseFloat(allBoxes[boxNum].value);
								}
								break
							case "*":
								if (!(Number.isNaN(parseFloat(allBoxes[boxNum].value)))) {
									ReturnValue *= parseFloat(allBoxes[boxNum].value);
								}
								break
							default:
								ReturnValue += 0;
						}  //End Switch
					} //End of IF in IF statement
				} else {
					//If rest of string contains only digits then convert to number and update ReturnValue
					if (/^\d+$/.test(Calculation[m].substring(1))) {	
						var numberValue = parseFloat(Calculation[m].substring(1));
						switch(Calculation[m].charAt(0)) {
							case "+":
								ReturnValue += numberValue;
								break;
							case "-":
								ReturnValue -= numberValue;
								break;
							case "/":
								ReturnValue /= numberValue;
								break;
							case "*":
								ReturnValue *= numberValue;
								break;
							default:
								ReturnValue += 0;
						}  //End Switch
					}  //End of IF in ELSE statement
				}  //End IF ELSE
			} // End FOR Loop
		}
		catch(err) {
			//For errors such as invalid boxNum or out of range boxNum, or invalid absolute number
			//Whole calculation is stopped, need to change question code
			console.log("Error calculating value, check calculation array entered.")
		} // End of Try Catch statement
		
		//Round to given number of decimal places - if not given as integer between 0 and 5, then ignored
		var	DecPl = Calculation[Calculation.length - 1];
		if (Number.isInteger(DecPl) && (DecPl >=0 && DecPl <=5)) {
			var temp = parseFloat(ReturnValue.toFixed(DecPl));
			ReturnValue = temp;
		}
		return ReturnValue;
	}
