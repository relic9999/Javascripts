// JavaScript Document

function checkReq() {
	var EmailAddress = document.forms[0].EmailAddress.value;
	var FirstName = document.forms[0].FirstName.value;
	var LastName = document.forms[0].LastName.value;
	var City = document.forms[0].City.value;
	var State = document.forms[0].StateCode.options.selectedIndex;
	var ZipCode = document.forms[0].PostalCode.value;	
	if (!ValidEmail(EmailAddress) ){		
		alert("You have entered an invalid or blank email address");		
		return false; }
	else {
		if (((FirstName == '' ) || (FirstName == ' ' ) || (parseFloat(FirstName)))  )  {
			alert('Please enter your First Name'); 
			document.forms[0].FirstName.focus();
			return false;  }
		else {  
			if (((LastName == '' ) || (LastName == ' ' ) || (parseFloat(LastName)))  )  {
				alert('Please Enter a Valid Value for Last Name'); 
				document.forms[0].LastName.focus();
				return false;  }
			else { 	  
				if ((City == '')   ) { 
					alert('Please Enter a Value for City');
					document.forms[0].City.focus();
					return false; }
				else {  
					if (((State == 0 ) || (State == null ) || (State < 1))   ) { 
						alert('Please Select a State');
						document.forms[0].StateCode.focus();
						return false; }
					else {  
						if ((!isZipCode(ZipCode))   ) { 
							alert('Please Enter a Value for Postal Code');
							document.forms[0].PostalCode.focus();
							return false; }	
						else {  
							len = document.forms[0].EmailType.length;
							for (i = 0; i <len; i++) {
								if (!document.forms[0].EmailType[i].checked) {
								alert("No Location Chosen");
								return false; }
							}
							else {
							document.forms[0].submit;
							}
						}
					}
				}
			}
		}
	}
}

function ValidEmail(strIn) {
	var reEmail = /^[\w-\.]{1,}\@([\da-zA-Z-]{1,}\.){1,}[\da-zA-Z-]{2,3}$/;
	return(reEmail.test(strIn + ""));
}
function isPhoneNumber(input) { 
var areaCode = input.substring(0,3); 
var dash1 = input.substring(3,4); 
var exchange = input.substring(4,7); 
var dash = input.substring(7,8); 
var line = input.substring(8,12); 
var plen = input.length; 
if ((isNaN(areaCode)) || (plen < 12) || (dash1 != "-") ||  ( dash != "-") || isNaN(line))
 { return false;  }
 else { return true;}
 } 

function isZipCode(input) { 
var ziplen = input.length;
if ((ziplen < 5) || ((ziplen > 5) && (ziplen < 10 )) ||(input.indexOf(".") > 1 ) || (input.indexOf(" ") > 1 ) || ((ziplen > 5) && (input.indexOf("-") < 1 )) ||(isNaN(input.replace("-","0"))))
{ return false;  }
 else { return true;}
 } 


