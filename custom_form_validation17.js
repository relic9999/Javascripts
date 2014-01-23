
 hidehim = new String(" , "); 

function checkForm()
{document.forms[0].HideMe.value = hidehim; 
var FirstName = document.forms[0].FirstName.value;
var LastName = document.forms[0].LastName.value;
var Email = document.forms[0].Email.value;
var Company = document.forms[0].Company.value;
var Address1 = document.forms[0].Address1.value;
var City = document.forms[0].City.value;
var State = document.forms[0].State.options.selectedIndex;
var ZipCode = document.forms[0].ZipCode.value;
var Telephone = document.forms[0].Telephone.value;
var CouncilWebAddress = document.forms[0].CouncilWebAddress.value;
var NumberofScouts = document.forms[0].NumberofScouts.value;
var PopcornVendors = document.forms[0].PopcornVendors.options.selectedIndex;
if (((FirstName == '' ) || (FirstName == ' ' ) || (parseFloat(FirstName)))  )  {
window.alert('Please Enter a Valid Value for First Name'); 
document.forms[0].FirstName.focus();
return false;  }
else {  
if (((LastName == '' ) || (LastName == ' ' ) || (parseFloat(LastName)))  )  {
window.alert('Please Enter a Valid Value for Last Name'); 
document.forms[0].LastName.focus();
return false;  }
else {  
if ((!isEMailAddress(Email))   ) { 
  window.alert('Please Enter a Valid Value for E-mail Address in this format: you@somewhere.com');
  document.forms[0].Email.focus();
  return false; }
 else {  
if ((Company == '')   ) { 
window.alert('Please Enter a Value for Council Name');
document.forms[0].Company.focus();
return false; }
else {  
if ((Address1 == '')   ) { 
window.alert('Please Enter a Value for Address 1');
document.forms[0].Address1.focus();
return false; }
else {  
if (((City == '' ) || (City == ' ' ) || (parseFloat(City)))  )  {
window.alert('Please Enter a Valid Value for City'); 
document.forms[0].City.focus();
return false;  }
else {  
if (((State == 0 ) || (State == null ) || (State < 1))   ) { 
window.alert('Please Select a Value for State');
document.forms[0].State.focus();
return false; }
else {  
if((!isZipCode(ZipCode) ) ) 
{window.alert('Please Enter a Valid Value for Zip/Postal Code in either of these formats:#####-####  or #####');
document.forms[0].ZipCode.focus();
return false; }
else{
if ((!isPhoneNumber(Telephone))   ) { 
window.alert('Please Enter 12 digit Council Phone Number in this format:###-###-####');
document.forms[0].Telephone.focus();
return false; }
else { 
if ((CouncilWebAddress == '')   ) { 
window.alert('Please Enter a Value for Council Web Address');
document.forms[0].CouncilWebAddress.focus();
return false; }
else {  
if ((NumberofScouts == '')   ) { 
window.alert('Please Enter a Value for Number of Scouts');
document.forms[0].NumberofScouts.focus();
return false; }
else {  
if (((PopcornVendors == 0 ) || (PopcornVendors == null ) || (PopcornVendors < 1))   ) { 
window.alert('Please Select a Value for Select your Popcorn Vendor');
document.forms[0].PopcornVendors.focus();
return false; }
else {   
return true;}
}
}
}
}
}
}
}
}
}
}
}
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


function isEMailAddress(input) {
var emailLen = input.length;
if ((emailLen < 7) || (input.indexOf("@") < 1 ) ||(input.indexOf(".") < 1 ) || (input.indexOf(",") > 1 ) || (input.indexOf("'") > 1 ) || (input.indexOf('"') > 1 ) || (input.indexOf(";") > 1 ) || (input.indexOf(":") > 1 ) || (input.indexOf("*") > 1 ) || (input.indexOf("%") > 1 ) || (input.indexOf("+") > 1 ) || (input.indexOf(" ") > 1 ))
{ return false;  }
 else { return true;}
 } 

function checkName(input, response)
{
if (response != '')
{
   if (response != '1^') {
	message   = document.getElementById('nameCheckFailed');
	var activityCheckElements = response.split("^");
	var i = 0;
	while(activityCheckElements[i] != null) 
	{						
				var activityControlType = activityCheckElements[i];
				var activityFormElementName = activityCheckElements[i+1];
				var activityDisplayOrder = activityCheckElements[i+2];
				var activityValue = activityCheckElements[i+3];
				var activityText = activityCheckElements[i+4];
				i += 5;
				var posBracket = activityText.indexOf("<");
				if (posBracket > 0) 
				{
					activityText = activityText.substring(0,posBracket);
				}
				if((activityControlType == 2) || (activityControlType == 5))
				{
					var myControl = eval('document.getElementById("' + activityFormElementName + activityDisplayOrder + '")');
					if (myControl.checked == true)
					{
						alert("Sorry the capacity for "+ activityText +" has been exhausted. Kindly change your selection.");
						myControl.checked = false;
						myControl.focus();
					}
				}
				else if(activityControlType == 3) 
				{						
					var myControl = eval('document.forms[0].' + activityFormElementName  + '.options[document.forms[0].' + activityFormElementName  + '.selectedIndex].value');
					if(myControl == activityValue)
					{
						alert("Sorry the capacity for "+ activityText +" has been exhausted. Kindly change your selection.");
						var selectThis = eval('document.forms[0].'+ activityFormElementName);
						selectThis.selectedIndex = 0;
					} 
					}
			}
	}
}
else
{
	url  = 'PreSubmitcheck.aspx?site=www.fsiforms.com&q=' + input;
	loadXMLDoc(url);
}
}// end checkname
function processReqChange() 
{
if (req.readyState == 4)
{
	if (req.status == 200)
	{
		//alert("OK");
		//alert(req.responseText);
		var mystring = req.responseText;
		var listElements = mystring.split("|");
		var result = listElements[0];
		if(result != '') {
		checkName('',result);}
	} 
	else
	{
		alert("There was a problem retrieving the XML data:" + req.statusText);
	}
}
}// process request change
function handleResponse(mystring)
{
		var listElements = mystring.split("|");
		var result = listElements[0];
		if(result != '') {
		checkName('',result);}
}// handle response
var req;
function loadXMLDoc(url) 
{
	if (window.XMLHttpRequest) 
 { 
 req = new XMLHttpRequest();
	req.onreadystatechange = processReqChange;
	req.open("GET", url, true);
	req.send(null);
	}
	else if (window.ActiveXObject) 
 {
	req = new ActiveXObject("Microsoft.XMLHTTP");
	if (req) 
 {
		req.onreadystatechange = processReqChange;
		req.open("GET", url, true);
		req.send("a");
	}
}
 else 
 { 
 document.getElementById("RSIFrame").src = "IFrameCheck.aspx?q=17";}
}
function function19() {if(document.forms[0].PopcornVendors.selectedIndex == 0) { document.getElementById("tridTrailsEndFormQuantity").style.display = "NONE"; document.forms[0].TrailsEndFormQuantity.style.display = "NONE";  hidehim += "343 , ";document.getElementById("tridTrailsEndOrderFormsYN").style.display = "NONE";document.getElementById("TrailsEndOrderFormsYN147").style.display = "NONE";  hidehim += "344 , "; } }
 function function20() {if(document.forms[0].PopcornVendors.options[document.forms[0].PopcornVendors.selectedIndex].value == 'CM') { document.getElementById("tridTrailsEndFormQuantity").style.display = "NONE"; document.forms[0].TrailsEndFormQuantity.style.display = "NONE";  hidehim += "343 , ";document.getElementById("tridTrailsEndOrderFormsYN").style.display = "NONE";document.getElementById("TrailsEndOrderFormsYN147").style.display = "NONE";  hidehim += "344 , "; } }
 function function21() {if(document.forms[0].PopcornVendors.options[document.forms[0].PopcornVendors.selectedIndex].value == 'Peca') { document.getElementById("tridTrailsEndFormQuantity").style.display = "NONE"; document.forms[0].TrailsEndFormQuantity.style.display = "NONE";  hidehim += "343 , ";document.getElementById("tridTrailsEndOrderFormsYN").style.display = "NONE";document.getElementById("TrailsEndOrderFormsYN147").style.display = "NONE";  hidehim += "344 , "; } }
 function function22() {if(document.forms[0].PopcornVendors.options[document.forms[0].PopcornVendors.selectedIndex].value == 'TE') { document.getElementById("tridTrailsEndFormQuantity").style.display = "INLINE"; document.forms[0].TrailsEndFormQuantity.style.display = "INLINE";  hidehim = hidehim.replace(", 343 ,",","); hidehim = hidehim.replace(", 343 ,",","); hidehim = hidehim.replace(", 343 ,",","); hidehim = hidehim.replace(", 343 ,",","); hidehim = hidehim.replace(", 343 ,",",");document.getElementById("tridTrailsEndOrderFormsYN").style.display = "INLINE";document.getElementById("TrailsEndOrderFormsYN147").style.display = "INLINE";  hidehim = hidehim.replace(", 344 ,",","); hidehim = hidehim.replace(", 344 ,",","); hidehim = hidehim.replace(", 344 ,",","); hidehim = hidehim.replace(", 344 ,",","); hidehim = hidehim.replace(", 344 ,",","); } }
 
