/**
* Loosetime.js
*
*	Author: Bruce Taylor
*	URL: www.loosetime.com
*	Date: 07/06/2014
*	License: MIT License, open source
*
*/
/*
 * Parses datetime given by user
 * Not implemented
 */
function parseDateTime(parseStr)
{

	var res = parseStr.split(/[\/:.\s]/g);
	var valid = "";
	for (var i = 0; i < res.length; i++)
	{
		// console.log(res[i]);

	}
	// build a string with max values e.g. for DD/MM/YYYY
	// HH24:mm:SS.s 31/12/2999 23:59:59:9999

}

/*
 * Sets the cursor position on user click of input element
 *
 */
function resetCursosPos()
{
	$(this).prop(
	{
		selectionStart : 0,
		selectionEnd : 0
	}
	);
}



/*
 * Validates user input against constraints given in time format
 */
function dateTimeRules(event, f)
{

	// if user does not enter tab or backspace then move input
	// cursor pos
	if (event.charCode >= 48 && event.charCode <= 57)
	{
		var delims = new Array('/', '-', '_', '.', '|', ',', ' ', ':');
	
		// get input cursor position
		var sel = $(this).prop('selectionStart');
		var val = $(this).val();
		explode = val.split("");
		if(sel <= $(this).prop('maxlength')+1)
		{
			// get value of char pos in loosetime attribute
			var thisChar = $(this).attr('loosetime').charAt(sel);
			// if position is on delimiter, jump to next position
			
			if ($.inArray(explode[sel], delims) != -1)
			{
				 explode = val.split("");
				 explode[sel+1] = event.charCode - 48;
				 val = explode.join("");
				 newsel = sel + 2;
			}
				
			//move cursor to next position
			else
			{
				// if input value > loosetime char, prevent movement
			
				//replace char infront of cursor pos
				explode = val.split("");
				explode[sel] = event.charCode - 48;
				val = explode.join("");
				newsel = sel + 1;
					
			
			}			
				
			$(this).prop({
							value : val,
							selectionStart : newsel,
							selectionEnd : newsel
							
						});
			}
			// non numeric chars will be ignored, input cursor pos will stay		
		}	
}

// takes datetime format, append location, name, value
function loosetime(a, b, c, d)
{
	var format = a;
	var appendLoc = b;
	var newName = c;
	var newVal = d;
	var newSize;
	

	// parse the time format passed in
	try
	{

		if (typeof(format) == 'undefined')
		{
			format = "HH24:MM:SS.s";
		}

		// check newVal given
		try
		{
			if (typeof(newVal) == 'undefined')
			{
				newVal = 'DD/MM/YY 00:00.0';
				newSize = 13;
			}

			// construct input element
			var input = $("<input>",
				{
					name : newName,
					maxlength : newSize,
					size : newSize,
					type : 'text',
					value : newVal,
					keypress : dateTimeRules,
					click : resetCursosPos,
					loosetime : format
				}
				);

			// append loosetime to the designated element in the DOM
			try
			{
				var col = document.getElementById('demotime');
				input.appendTo(col);
			}
			// catch omition of append location
			catch (e)
			{
				window.alert("Error, no Element given to append loosetime to.")

			}
		}

		// catch newVal exception
		catch (e)
		{
			window.alert("Error, Value is invalid." + e.toString());
		}
	}
	// catch format exception
	catch (e)
	{
		window.alert("Error, Date format missing or invalid.");
	}
}