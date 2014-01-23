//----------------------------------------------------//
//----------------------------------------------------//
//--			GENERIC VARIABLES								--//
//----------------------------------------------------//
//----------------------------------------------------//
var myString = String(document.location)
var passwordSyntax =	"<ul>"+
								"<li>at least one lower case letter</li>"+
								"<li>at least one upper case letter</li>"+
								"<li>at least one number</li>"+
								"<li>at least one special character<BR>"+
								"besides parentheses ( eg. !@#$%^&amp;*[] )</li>"+
								"<li>at least 8 characters, no more than 50</li>"+
								"<li>(eg TrustNo1!)</li>"+
								"</ul>"
								
var weakpasswordSyntax =	"<ul>"+
										"<li>at least 6 characters</li>"+								
										"</ul>"

//if (passwordType != "STRONG"){	passwordSyntax = weakpasswordSyntax;}

//----------------------------------------------------//
//----------------------------------------------------//
//--			BEGIN :: LOGIN JAVASCRIPT					--//
//----------------------------------------------------//
//---------------------------------------------------//
function Activate(){
	if (parent.document.getElementById('popup')){parent.document.getElementById('popup').style.height = "125px";}
	clearDivs();	
	if (document.login){	
	if (document.all){
		setAction = (document.login.document.forms[0].action);
	}else{
		setAction = (document.getElementById('login').contentDocument.forms[0].action);
	}		
	if (document.sendemail){document.sendemail.action = setAction}	
	}
	showPopup();
	
	//Verification login to activate account
	var emailprepopulate = QueryString('e');
	var activate = QueryString('a');	
	//alert(QueryString('success') +"|"+ emailprepopulate +"|"+ activate)
	if (emailprepopulate && activate == 'true'){	
		if (document.login.document.forms[0].Email) {document.login.document.forms[0].Email.value=emailprepopulate;}		
		document.login.document.forms[0].form.value="initiallogin";		
		definePopup('Activation!','welcome')	
		document.forms[0].action = parent.document.forms[0].action  +"?a=true&e="+ emailprepopulate;
	}
}

function QueryString(Query) {	
	//if (myLocation != ""){myString = String(myLocation);}
	if (myString && myString!=""){
	Query+="=";
	var pos=myString.indexOf(Query);
	if (pos!=-1){
		pos=pos+Query.length;
		var pos2=((myString.indexOf("&", pos)!=-1)? myString.indexOf("&", pos) : myString.length);
		return(myString.substring(pos, pos2));
	}
	} else return(false);
} 


function displayForgottenPassword(){
	parent.clearDivs();
	parent.document.getElementById('popup').style.height = "200px";
	if (document.forms[0].Email){
		parent.document.sendemail.emailaddress.value = document.forms[0].Email.value
	}
	parent.definePopup('Forgot Your Password?','sendforgotten')
}

function displayPasswordSyntax(){
	parent.clearDivs();	
	parent.document.getElementById('popup').style.height = "185px";
	var passwordType = document.forms[0].passwordType.value;		
	if (passwordType != 'STRONG'){passwordSyntax = weakpasswordSyntax;}				
	parent.document.getElementById('showpasswordSyntax').innerHTML = passwordSyntax;
	parent.definePopup('Password Syntax','passwordsyntax')
}

function showPopup(){				
	var sendval = QueryString('send');	
	if (sendval){
		if (sendval == 'failedpasswordsend'){
			resizePopup();
			parent.definePopup('Email Address Not Found!','notsent')
		}else{
			resizePopup();
			parent.definePopup('Password Sent!','sent')
		}	
	}
	
	var successval = QueryString('success');
	if (successval){
		switch (successval){
			case "exists":				
				parent.document.sendemail.emailaddress.value = QueryString('e');	
				parent.document.getElementById('popup').style.height = "300px";
				parent.definePopup('Duplicate e-Mail!','sendduplicate')	;
				history.go(-1);
				break;
			case "true":
				parent.window.location = document.forms[0].redirecturl.value +"&email="+ QueryString('EMail') +"&swltid="+ document.forms[0].WebLeadTypeID.value;
				break;
			default:
				resizePopup();
				parent.definePopup('Verification e-Mail Sent!','verification')				
				break;
		}			
	}	
		
	var errorval = QueryString('error');
	if (errorval){		
		resizePopup();	
		if (errorval == 'inactive'){parent.definePopup('Account not yet Activated!','errorinactive')}
		if (errorval == 'invalid'){	parent.definePopup('Login Failed!','errorinvalid')}
		if (errorval == 'badcode'){parent.definePopup('Incorrect Code!','errorbadcode');history.go(-1);}
		if (errorval == 'userexists'){parent.definePopup('Username Exists!','errorusername');history.go(-1);}
	}	
}

function definePopup(title,field){	
	parent.clearDivs();
	document.getElementById('popuptitle').innerHTML = title
	document.getElementById(field).style.display = 'block';
	if (field == 'sendduplicate' || field == 'sendforgotten'){
		if (document.getElementById('sendemaildiv')) document.getElementById('sendemaildiv').style.display = 'block';				
	}
	displaySent();
}

function displaySent(){
	if (document.getElementById('popup').style.display == "none"){
		document.getElementById('popup').style.display = "block";
	}else{
		document.getElementById('popup').style.display = "none";
	}
}

function clearMsg(){	
	if (document.getElementById('errorinvalid')){document.getElementById('errorinvalid').style.display = 'none';}
}

function resizePopup(){
	if (parent.document.getElementById('popup')){parent.document.getElementById('popup').style.height = "125px";}
}

function goSubmit(){	
	var CreateUser = document.forms[0].CreateUserFlag.value;
	var gocontinue = false;	
	var passwordType = document.forms[0].passwordType.value;
    var prefix = eval("document.forms[0]")
    var VERIFY = new Array(7)		
    if (prefix.firstname) {if (prefix.firstname.value == "") {		VERIFY[1] = "First Name\r\n"} else {VERIFY[1] = ""}}
    if (prefix.lastname) {if (prefix.lastname.value == "") {		VERIFY[2] = "Last Name\r\n"} else {VERIFY[2] = ""}}
	if (CreateUser.toLowerCase() == "n" && document.forms[0].form.value=="signup")
	{
		//do not check for username and pwd
		VERIFY[3] = "";
		VERIFY[6] = "";
		VERIFY[7] = "";
	}
	else
	{	
		if (prefix.username) {if (prefix.username.value == "") {		VERIFY[3] = "Username\r\n"} else {VERIFY[3] = ""}}	
		if (prefix.password.value == "") {VERIFY[6] = "Password\r\n"} else {VERIFY[6] = ""}
		if (prefix.password0.value == "") {VERIFY[7] = "Confirm Password\r\n"} else {VERIFY[7] = ""}	
	}	
	if (prefix.companycode) {if (prefix.companycode.value == "") {	VERIFY[4] = "Client Org ID\r\n"} else {VERIFY[4] = ""}}
	
	if (prefix.Email.value == ""){	VERIFY[5] = "Email Address\r\n"} else {VERIFY[5] = ""}
		
	
	if (VERIFY[5] == "") {if (!ValidEmail(prefix.Email.value)){VERIFY[5] = "Please enter a valid e-Mail address!\r\n"} else {VERIFY[5] = ""}}
	if (prefix.companycode) {
	if (VERIFY[4] == "") {if (isNaN(parseInt(prefix.companycode.value))){VERIFY[4] = "Client Org ID must be a number\r\n"} else {VERIFY[4] = ""}}
	if (VERIFY[4] == "") {if (prefix.companycode.value.length < 1){VERIFY[4] = "Client Org ID must be at least 1-digit\r\n"} else {VERIFY[4] = ""}}
	if (VERIFY[4] != "") {if (prefix.companycode.value == "tcode"){VERIFY[4] = ""}}
	}

				
	var str = ""
	for (var i=1 ;i < VERIFY.length;i++){
		if (VERIFY[i] != "" && VERIFY[i] != null){ str += VERIFY[i]; }
	}	
	
	if (str != ""){
		alert("The following fields must be filled out correctly to continue:\r\n\r\n"+ str +"\r\n Click OK to continue")
		return false		
	}	
	
	if ((VERIFY[6] == "" || VERIFY[6] == null) && (VERIFY[7] == "" || VERIFY[7] == null)) {
		if (CreateUser.toLowerCase() == "n" && document.forms[0].form.value=="signup")
		{
			//do not validate pwd type			
			gocontinue = true;
		}
		else
		{			
			if (passwordType == "STRONG"){gocontinue = ValidatePassword();}else{gocontinue = ValidateWeakPassword();}
		}
	}					
	
	if(gocontinue){	
		if (CreateUser.toLowerCase() == "n" && document.forms[0].form.value=="signup")
		{prefix.submit();return true;}
		else if (VerifyPassword())
		{
			prefix.submit();
			return true;
		}
		else
		{ 
			return false; 
		}
	}else{		
		return false;
	}
}

function submitenter(myfield,e){
	alert('go')
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return true;

	if (keycode == 13)
	   {
	   goSubmit();
	   return false;
	   }
	else
	   return true;
}
	
function sendForgottenPassword(){	
	if (document.forms[0].emailaddress.value != ''){
		document.forms[0].submit();
	}else{
		alert("Please enter your e-Mail address.")
		return false
	}
}


function VerifyPassword(){
	var prefix = document.signup ? "document.signup.document.forms[0]" : "document.forms[0]";
	var newpassword = eval(prefix +".password.value");
	var confirmpassword = eval(prefix +".password0.value");
	
	if (newpassword != ""){
		if (confirmpassword != newpassword){
		  window.alert("Your password does not match the confirmation.\nPlease re-enter your new password.");
		  confirmpassword = ""
		  newpassword = ""
		  return(false);
		}
		else{
		  return(true);
		}
	}
	else{
		window.alert("Your new password may not be blank");
		return(false);
	}
}

function ValidatePassword() {
	var x=1,s=''  
	var prefix = document.signup ? "document.signup.document.forms[0]" : "document.forms[0]";
	var val = eval(prefix +".password.value");
	var VArray = new Array(5)
	var DArray = new Array(5) 
	
	VArray[0] = "[a-z]+";
	VArray[1] = "[A-Z]+"	;
	VArray[2] = "[0-9]+";
	VArray[3] = "[^a-zA-Z_0-9]+";
	VArray[4] = ".{8,50}$";	
	VArray[5] = "\x20+";	
	DArray[0] = "-at least 1 lower case letter";
	DArray[1] = "-at least 1 upper case letter"	;
	DArray[2] = "-at least 1 number";
	DArray[3] = "-at least one special character besides parentheses or double quotes ( eg. !@'#$%^&*[] )"	
	DArray[4] = "-at least 8 characters, no more than 50.";
	DArray[5] = "-no spaces";
	
	for (var i = 0;i < 6;i++){
		var reg = eval("/"+ VArray[i] +"/")
		if (reg.test(val)) {
			if (i == 5){x=x-1;s = s + DArray[i] +'\r\n'}else{x=x+1}
			if (i == 3){
				if (val.indexOf('(') != -1 || val.indexOf(')') != -1 || val.indexOf('"') != -1){x=x-1;s = s + DArray[i] +'\r\n'}											}
		}else{
			if (i != 5){s = s + DArray[i] +'\r\n'}
		}		
	}
	s = 'Your password must adhere to the following pattern:\r\n\r\n'+ s +'\r\nClick the \'OK\' button below to re-enter your password.'	
	if (x < (6)){	alert(s);return false;}else{return true}	
	s=''	
}

function ValidateWeakPassword() {
	var prefix = document.signup ? "document.signup.document.forms[0]" : "document.forms[0]";
	var val = eval(prefix +".password.value");
	var s = 'Your password must adhere to the following pattern:\r\n\r\n-must be at least 6 characters long\r\n\r\nClick the \'OK\' button below to re-enter your password.'		
	if (val.length < 6){alert(s);return false;}else{return true}
}

function checkLoginFields(){
	if (document.forms[0].Email){
		var eCheck = document.forms[0].Email.value;
		var checkText = "e-Mail address";
	}else{
		var eCheck = document.forms[0].username.value;
		var checkText = "username";
	}
	var pCheck = document.forms[0].password.value
	if (eCheck == '' && pCheck == ''){alert('Please enter an '+ checkText +' and password!');return false;	}
	if (eCheck == '' && pCheck != ''){alert('Please enter an '+ checkText +'!');return false;}
	if (eCheck == '' && pCheck != ''){alert('Please enter an '+ checkText +'!');return false;}
	if(document.forms[0].Email){if (!ValidEmail(eCheck)){alert('Please enter a valid emailaddress!');return false;}}
	if (eCheck != '' && pCheck == ''){alert('Please enter a password!');return false;}	
	if (eCheck != '' && pCheck != ''){				
		document.forms[0].submit();
	}
}

function ValidEmail(strIn) {
	var reEmail = /^[\w-\.]{1,}\@([\da-zA-Z-]{1,}\.){1,}[\da-zA-Z-]{2,3}$/;
	return(reEmail.test(strIn + ""));
}

function placeEmail(){
	var eVal = QueryString('e')
	if (eVal){
		parent.document.sendemail.emailaddress.value = eVal
	}
}

function clearDivs(){		
	if (document.getElementById('welcome')){document.getElementById('welcome').style.display = 'none';}
	if (document.getElementById('sendduplicate')){document.getElementById('sendduplicate').style.display = 'none';}
	if (document.getElementById('sendforgotten')){document.getElementById('sendforgotten').style.display = 'none';}
	if (document.getElementById('verification')){document.getElementById('verification').style.display = 'none';}
	if (document.getElementById('sent')){document.getElementById('sent').style.display = 'none';}
	if (document.getElementById('notsent')){document.getElementById('notsent').style.display = 'none';}
	if (document.getElementById('sendemaildiv')){document.getElementById('sendemaildiv').style.display = 'none';}
	if (document.getElementById('errorinactive')){document.getElementById('errorinactive').style.display = 'none';}
	if (document.getElementById('errorinvalid')){document.getElementById('errorinvalid').style.display = 'none';}
	if (document.getElementById('passwordsyntax')){document.getElementById('passwordsyntax').style.display = 'none';}
	if (document.getElementById('badcode')){document.getElementById('badcode').style.display = 'none';}
	if (document.getElementById('errorusername')){document.getElementById('errorusername').style.display = 'none';}
	if (document.getElementById('errorbadcode')){document.getElementById('errorbadcode').style.display = 'none';}
	
}

//----------------------------------------------------//
//----------------------------------------------------//
//--			END :: LOGIN JAVASCRIPT						--//
//----------------------------------------------------//
//----------------------------------------------------//



//----------------------------------------------------//
//----------------------------------------------------//
//--			BEGIN :: CHANGES JAVASCRIPT				--//
//----------------------------------------------------//
//----------------------------------------------------//
function showPopupChange(){	//fires onLoad for the CHANGES pages
	if (document.getElementById('changeemailaddress')){document.getElementById('changeemailaddress').style.display = 'block';}
	if (document.getElementById('changepassword')){document.getElementById('changepassword').style.display = 'block';}
	if (document.getElementById('pUpdated')){document.getElementById('pUpdated').style.display = 'none';}
	if (document.getElementById('pNoupdate')){document.getElementById('pNoupdate').style.display = 'none';}
	if (document.getElementById('pInvalid')){document.getElementById('pInvalid').style.display = 'none';}
	if (document.getElementById('eUpdated')){document.getElementById('eUpdated').style.display = 'none';}
	if (document.getElementById('eNoupdate')){document.getElementById('eNoupdate').style.display = 'none';}
	if (document.getElementById('eInvalid')){document.getElementById('eInvalid').style.display = 'none';}
	if (document.getElementById('eNoMatch')){document.getElementById('eNoMatch').style.display = 'none';}
	if (document.getElementById('error')){document.getElementById('error').style.display = 'none';}
	if (document.getElementById('errorbuttons')){document.getElementById('errorbuttons').style.display = 'none';}
									
	var returneVal = QueryString('re')	
	//if (document.forms[0].emailaddress && returneVal){document.forms[0].emailaddress.value = returneVal;}
	
	var pVal = QueryString('p')		
	if (pVal){
		if (pVal != 'updated'){document.getElementById('errorbuttons').style.display = 'block';}
		switch(pVal){	
			case "updated":	
				document.getElementById('popup').style.display = 'block';			
				document.getElementById('popuptitle').innerHTML = "Password Updated!"
				document.getElementById('pUpdated').style.display = 'block';
			break
			case "noupdate":				
			document.getElementById('popup').style.display = 'block';			
				document.getElementById('popuptitle').innerHTML = "Technical Problem!"
				document.getElementById('pNoupdate').style.display = 'block';
			break
			case "invalid":						
			document.getElementById('popup').style.display = 'block';			
				document.getElementById('popuptitle').innerHTML = "Invalid Password!"
				document.getElementById('pInvalid').style.display = 'block';
			break		
			default:
				document.getElementById('errorbuttons').style.display = 'none';
				document.getElementById('emailaddress').value = pVal;
				//document.getElementById('popuptitle').innerHTML = "Change Password for: "+ pVal				
			break
		}
	}else{		
		var pError =true;		
	}

	var eVal = QueryString('email')
	if (!eVal) {eVal = QueryString('e')}

	if (eVal){
		if (eVal != 'updated'){document.getElementById('errorbuttons').style.display = 'block';}
		switch(eVal){	
			case "nomatch":
				document.getElementById('popup').style.display = 'block';
				document.getElementById('popuptitle').innerHTML = "Address not found..."
				document.getElementById('eNoMatch').style.display = 'block';
			break
			case "updated":
				document.getElementById('popup').style.display = 'block';
				document.getElementById('popuptitle').innerHTML = "e-Mail Updated!"								
				document.getElementById('eUpdated').style.display = 'block';
				refreshOpener( QueryString('o'), QueryString('n'));
			break
			case "noupdate":
				document.getElementById('popup').style.display = 'block';
				document.getElementById('popuptitle').innerHTML = "Address already in use..."
				document.getElementById('eNoupdate').style.display = 'block';
			break
			case "invalid":
				document.getElementById('popup').style.display = 'block';
				document.getElementById('popuptitle').innerHTML = "Invalid Password!"
				document.getElementById('eInvalid').style.display = 'block';
			break		
			default:
				document.getElementById('errorbuttons').style.display = 'none';
				//document.forms[0].emailaddress.value = eVal;
				//document.getElementById('popuptitle').innerHTML = "Change e-Mail Address for: "+ eVal
				//document.getElementById('changeemailaddress').style.display = 'block';
			break
		}
	}else{		
		var eError =true;		
	}

	if ((pVal ==  null && eVal == null) || (eError == true && pError == true )){throwError();}
}

function throwError(){
	document.getElementById('popuptitle').innerHTML = "Error..."
	document.getElementById('error').style.display = 'block';
}

//----------------------------------------------------//
//--  For the Password Change Page						--//
//----------------------------------------------------//
function goSubmitChange(){	
	var passwordType = document.forms[0].passwordType.value;
	if (passwordType == "STRONG"){
		if(ValidatePassword()){
			if (VerifyPasswordChange()){return true;}else{return false;}}else{return false;
		}
	}else{
		if(ValidateWeakPassword()){
			if (VerifyPasswordChange()){return true;}else{return false;}}else{return false;
		}
	}
}

function VerifyPasswordChange(){
	if (document.forms[0].password.value != ""){
		if (document.forms[0].password.value != document.forms[0].password0.value){
		  window.alert("Your password does not match the confirmation.\nPlease re-enter your new password.");
		  document.forms[0].password.value = ""
		  document.forms[0].password0.value = ""
		  return(false);
		}
		else{
		  return(true);
		}
	}
	else{
		window.alert("Your new password may not be blank");
		return(false);
	}
}

//----------------------------------------------------//
//--  For the e-Mail Change Page							--//
//----------------------------------------------------//
function ConfirmAddress(){
	if (!ValidEmail(document.forms[0].email1.value) || !ValidEmail(document.forms[0].email2.value)){		
		alert("You have entered an invalid or blank email address!")		
		return false
	}
	
	if (document.forms[0].email1.value != '' && document.forms[0].email2.value != ''){
		if (document.forms[0].email1.value != document.forms[0].email2.value){
			alert("The e-Mail Addresses do not match.")			
			return false
		}else{
			if (document.forms[0].currpassword.value != ''){				
				//document.forms[0].submit();
				return true;
			}else{
				alert("Please enter your password.")		
				return false;
			}
		}
	}
}

function refreshOpener(oldval,newval){
	if (window.opener){	
 		var r = window.opener.location.href.toString();
 		results = r.replace(oldval, newval)	
 		if (r.indexOf("DisplayForm.aspx") == -1){
 			opener.document.forms[0].action = results;
 			opener.document.forms[0].submit();
 		}else{
			opener.document.location.href= results; 			
 		}
 		return true;
	}
}

function closeWindow(){
	if (opener){
		window.close();
	}else{
		document.getElementById('popup').style.display = "none";
	}
}
//----------------------------------------------------//
//----------------------------------------------------//
//--			END :: CHANGES JAVASCRIPT					--//
//----------------------------------------------------//
//----------------------------------------------------//

//----------------------------------------------------//
//----------------------------------------------------//
//--	Copyright 2003,2004 Cierant Corporation			--//
//----------------------------------------------------//
//----------------------------------------------------//