/*************************************************************/
/* Name : Oleksandr Snurnikov                                */
/* login : int222_131a24                                     */
/*************************************************************/

/****************************************************************************/
/*              This function calculates the pizza price                    */
/****************************************************************************/
function calculatePizzaPrice(){

   var priceList    = new Array(0.00, 11.55, 15.25, 22.00, 25.00); // The price for the different sizes

   var HST          = 0.13;                                        // HST current rate
   var TOPPING      = 1.79;                                        // Cost of each topping - First two are free

   var sizePrice    = 0, toppingCount = 0, toppingCost  = 0;
   var subTotal     = 0, hst          = 0, finalTotal   = 0;

   var whichSize    = 0;

   whichSize = document.onlineOrder.pizzaSize.selectedIndex;      // Get the pizza size they selected

   if (whichSize > 0) {                                           // They selected a valid pizza size
      sizePrice = priceList[whichSize];
   }
   else { 
      sizePrice = 0;                                              // They did not select a pizza size
   }

   // Determine the number of toppings if any 


   for (var i = 0; i < 12;i++){                                       
       if (document.onlineOrder.toppings[i].checked == true)     // check and count how many toppings
          toppingCount++;  
   }

   if (toppingCount < 3) toppingCount=0; else toppingCount=toppingCount-2; // The first 2 are free
   
   // Pizza price calculation based on what they selected


   toppingCost = Math.floor(((1.79 * toppingCount) + 0.005)*100); toppingCost = toppingCost /100;
   subTotal    = Math.floor(((sizePrice + toppingCost) + 0.005)*100);subTotal = subTotal /100;
   hst         = Math.floor((((subTotal * HST) + 0.005)*100));hst = hst/100;  // HST calculation

   finalTotal = (subTotal + hst).toFixed(2);


   // Results from store calculation

   document.onlineOrder.hPizzaPrice.value     = sizePrice;
   document.onlineOrder.hToppings.value       = toppingCount;
   document.onlineOrder.hToppingsCost.value   = toppingCost;
   document.onlineOrder.hSubTotal.value       = subTotal;
   document.onlineOrder.hHst.value            = hst;
   document.onlineOrder.hFinalTotal.value     = finalTotal;
   document.onlineOrder.price.value           = "$ " + finalTotal; // update price on the form

} // End of calculatePizzaPrice function


/****************************************************************************/
/*         You are not allowed to change any of the above function.         */
/****************************************************************************/

/****************************************************************************/
/*                  Your JavaScript starts here                             */
/*                                                                          */
/****************************************************************************/
/****************************************************************************/
/* Function Description                                                     */
/*                                                                          */
/*                                                                          */
/*                                                                          */
/*                                                                          */
/****************************************************************************/
 function validateOrder(){
   var errorMessage = "";
   errorMessage = validateName(errorMessage);
   errorMessage = validateClient(errorMessage);
   errorMessage = validatePhone(errorMessage);
   errorMessage = validateDob(errorMessage);
   errorMessage += validateCheese(errorMessage);
   errorMessage += validateSauce(errorMessage);
   errorMessage += validateSize(errorMessage);
   errorMessage += validateCrust(errorMessage);
   calculatePizzaPrice();

   if(errorMessage != ""){
      showErrors(errorMessage);
      return false;
   }else{
      clearErrorsShow();
      return true;
   }
 } // End of function
/****************************************************************************/
/* Function name: validateName()                                            */
/* Called from validateOrder()                                              */
/****************************************************************************/
/****************************************************************************/
/* Function Description                                                     */
/*                                                                          */
/*  This function checks if user entered acceptable values to the 'surname' */
/*  field                                                                   */
/*                                                                          */
/****************************************************************************/
 function validateName(errorMessage){ // ---------------------------------------------------works fine
   var name = document.onlineOrder.surname.value;
   var name_l = name.length;
   var tmpMsg = "";
   var apoC = 0;
   var hiphC = 0;
   if(name.length == 0){
      tmpMsg = " <p>Name: Can't be empty!</p>"
   }else{
      if(name.length < 4){
         tmpMsg = " <p>Name: You didn't enter enough letters!</p>";
      }else{
         name = name.toUpperCase();
         var notAlpha = 0;
         var alpha = 0;
         for(var i = 0;i < name_l;i++){
            if((name.charCodeAt(i) > 64) && (name.charCodeAt(i) < 91)){
               alpha++;
            }else{
               if(name.charCodeAt(i) == 39){ // checks for apostroph
                  apoC++;
                  if(((name.charCodeAt(i+1) > 64) && (name.charCodeAt(i+1) < 91)) &&((name.charCodeAt(i-1) > 64) && (name.charCodeAt(i-1) < 91))){ //only numeric
                     if(apoC > 1) tmpMsg = "<p>Name: only 1 apostroph is allowed!</p>";
                  }else{
                     tmpMsg = "<p>Name: apostroph is not allowed here </p>";
                  } 
               }else if(name.charCodeAt(i) == 45){ // checks for hiphen
                  hiphC++;
                  if(((name.charCodeAt(i+1) > 64) && (name.charCodeAt(i+1) < 91)) &&((name.charCodeAt(i-1) > 64) && (name.charCodeAt(i-1) < 91))){
                     if(hiphC > 1) tmpMsg = "<p>Name: only 1 hiphen is allowed!</p>";
                  }else{
                     tmpMsg = "<p>Name: hyphen is not allowed here </p>";
                  }

               }else{
                  notAlpha++;   
               }
            }
         }//end of 'for loop'
         if(notAlpha > 0) {
            //alert(notAlpha);
            tmpMsg += "<p>Name: only alphabetic characters! </p>";
         }else if(alpha < 4){
            tmpMsg += "<p>Name: at least 4 alphabetic characters! </p>";
         }
      }
   }
   if(tmpMsg == ""){
      name = name.toLowerCase();
      name = name[0].toUpperCase() + name.substr(1,name.length);
      document.onlineOrder.surname.value = name;   
   }
   errorMessage = tmpMsg;
   return errorMessage;
 } // end of function

/****************************************************************************/
/* Function name: validateClient()                                          */
/* Called from validateOrder()                                              */
/****************************************************************************/
/****************************************************************************/
/* Function Description                                                     */
/*                                                                          */
/*  This function checks if user entered acceptable values to the 'client'  */
/*  field                                                                   */
/*                                                                          */
/****************************************************************************/
function validateClient(errorMessage){
   var name = document.onlineOrder.client.value;
   var tmpMsg = "";
   var diff = 0;
   var sum1 = 0;
   var sum2 = 0;
   var notNum = 0;
   if(name.length == 0){
      tmpMsg = "<p>Client: can't be empty!</p>";
   }else{
      if((name.substr(0,3) == "416") || (name.substr(0,3) == "647") || (name.substr(0,3) == "905")){ //checks the area code
         for(var i = 3;i<7;i++){ //positions 4-8
            if(name.charCodeAt(i) > 47 && name.charCodeAt(i) < 58){
               if(name.charCodeAt(7) == 45){ //checks the hyphen
                  for(var j = 8;j<12;j++){ //poitions 9-12
                     if(name.charCodeAt(j) > 47 && name.charCodeAt(j) < 58){
                        //value difference
                        diff = name[3] - name[9];
                        if(name[2] == Math.abs(diff)){
                           sum1 = eval(name[3])+eval(name[4])+eval(name[5])+eval(name[6]);
                           sum2 = eval(name[8])+eval(name[9])+eval(name[10])+eval(name[11]);
                           if(sum1 > sum2){

                           }else{
                              tmpMsg = " <p>Client: the sum is different!";
                           }
                        }else{
                           tmpMsg = " <p>Client: the difference between "+name[3]+" & "+name[9]+" not equal to "+name[2]+"!</p>";
                        }
                     }else{
                        tmpMsg = " <p>Client: positions 9,10,11,12 must be numeric!</p>";
                     }
                  }  // end of 'for' loop 
               }else{
                  tmpMsg = " <p>Client: position 8 must be a hyphen!</p>";
               }
               
            }else{
               tmpMsg = " <p>Client: wrong 4,5,6,7 numbers! must be numeric!</p>";
            }
         } //end of 'for' loop
         
      }else{
         tmpMsg += " <p>Client: wrong area code!</p>";
      }
   }
   if(tmpMsg != ""){
      errorMessage += tmpMsg;
   }
   return errorMessage;
} // end of function

/****************************************************************************/
/* Function name: validatePhone()                                           */
/* Called from validateOrder()                                              */
/****************************************************************************/
/****************************************************************************/
/* Function Description                                                     */
/*                                                                          */
/*  This function checks if user entered acceptable values to the 'phone'   */
/*  field                                                                   */
/*                                                                          */
/****************************************************************************/
function validatePhone(errorMessage){
   var name = document.onlineOrder.phone.value;
   var nameC = document.onlineOrder.client.value;
   var tmpMsg = "";
   var ex = 0;
   var exL = 0;
   var notNum = 0;
   ex = parseInt(name.substr(4,3));
   exL = parseInt(name.substr(6,1));
   if(name.length <= 11){
      tmpMsg = "<p>Phone: Can't be empty or less than 12 digits!</p>";
   }else{
      if((name.substr(0,3) == "416") || (name.substr(0,3) == "647") || (name.substr(0,3) == "905")){
            if((name.substr(3,1) != "-") || (name.substr(7,1) != "-")){
               tmpMsg = "<p>Phone: phone format must be: nnn-nnn-nnnn </p>";
            }else{
               if(((ex > 202) && (ex < 420)) && ((ex-203)%3 == 0)){
                  for(var i = 8;i<12;i++){
                     if(name.substr(i,1) == "0"){
                        notNum++;
                        if(notNum == 4){
                           tmpMsg = "<p>Phone: can't be all zeros!</p>";
                        }
                     }else{
                        if((name.charCodeAt(i) < 48) || (name.charCodeAt(i) > 57)){
                           tmpMsg = "<p>Phone: last 4 must be numbers!</p>";
                        }
                     }
                  } // end of 'for' loop
               }else{
                  tmpMsg = "<p>Phone: '" + ex + "' part wrong!</p>";
               }
            }
      }
   }
   if((name.substr(0,3) != nameC.substr(0,3)) && (tmpMsg == "")){
            tmpMsg += "<p>Phone & Client area codes must be equal!</p>";
   }
   errorMessage += tmpMsg;
   return errorMessage;
} // end of function
/****************************************************************************/
/* Function name: validateDob()                                             */
/* Called from validateOrder()                                              */
/****************************************************************************/
/****************************************************************************/
/* Function Description                                                     */
/*                                                                          */
/*  This function checks if user entered acceptable values to the 'Date of Birth'   */
/*  field                                                                   */
/*                                                                          */
/****************************************************************************/
function validateDob(errorMessage){
   var name = document.onlineOrder.dob.value;
   var tmpMsg = "";
   var date = new Date();
   var dateYear = date.getFullYear();
   var year = parseInt(name.substr(3,4));
   var dig = 0, notDig = 0;
   var mon = new Array();
   var monU = new Array();
   mon = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
   monU = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
   if(name.length == 0){
      tmpMsg = " <p>Dob: Can't be empty!</p>";
   }else{
      for(var i = 0;i<12;i++){
         if(name.substr(0,3) == mon[i]){
            break;
         }else if(i == 11){
            for(var j = 0;j<12;j++){
               if(name.substr(0,3) == monU[j]){
                  break;
               }else if(j == 11){
                  tmpMsg = "<p>Dob: wrong month type/spelling (must be: jan,feb,etc.)!<p>";
               }
            } // end of 'for' loop
         }
         
      } // end of 'for' loop
      for(var k = 3;k < 7;k++){
         if((name.charCodeAt(k) > 47) && (name.charCodeAt(k) < 58)){
            dig++;
         }else{
            notDig++;
         }
      } // end of 'for' loop
      if(notDig > 0){
            tmpMsg +="<p>Dob: for year must be only digits!<p>";
      }else{
         if((dateYear - year) < 18){
            tmpMsg +="<p>Dob: you must be 18+ years old!<p>";
         }
      }
   }
   errorMessage += tmpMsg;
   return errorMessage;
} // end of function
/****************************************************************************/
/* Function name: validateCheese()                                          */
/* Called from validateOrder()                                              */
/****************************************************************************/
/****************************************************************************/
/* Function Description                                                     */
/*                                                                          */
/*  This function checks if user checked the cheese                         */
/*                                                                          */
/*                                                                          */
/****************************************************************************/
function validateCheese(errorMessage){
   var size = document.onlineOrder.cheese.length;
   for (var i = 0; i < size; i++) {
      if (document.onlineOrder.cheese[i].checked  == true) { // true  = checked 
            errorMessage = "";
            break;
      }else{
         errorMessage = " <p>Select cheese for your Pizza!</p>";
      } // end of if

   }
   return errorMessage;
} // end of function

/****************************************************************************/
/* Function name: validateSauce ()                                          */
/* Called from validateOrder()                                              */
/****************************************************************************/
/****************************************************************************/
/* Function Description                                                     */
/*                                                                          */
/*  This function checks if user checked the sauce                          */
/*                                                                          */
/*                                                                          */
/****************************************************************************/
function validateSauce(errorMessage){
   var size = document.onlineOrder.sauce.length;
   for (var i = 0; i < size; i++) {
      if (document.onlineOrder.sauce[i].checked  == true) { // true  = checked 
            errorMessage = "";
            break;
      }else{
         errorMessage = " <p>Select sauce for your Pizza!</p>";
      } // end of if

   }
   return errorMessage;
} // end of function

/****************************************************************************/
/* Function name: validateSize()                                            */
/* Called from validateOrder()                                              */
/****************************************************************************/
/****************************************************************************/
/* Function Description                                                     */
/*                                                                          */
/*  This function checks if user checked the pizza's size                   */
/*                                                                          */
/*                                                                          */
/****************************************************************************/
function validateSize(errorMessage){ 
   var index = document.onlineOrder.pizzaSize.selectedIndex;
   if(index == -1){
      errorMessage = "<p>Select the pizza's size!</p>";
   }else if(index == ""){
      errorMessage = "<p>Select the pizza's size!</p>";
   }else errorMessage = "";
   return errorMessage;
} // end of function

/****************************************************************************/
/* Function name: validateCrust()                                           */
/* Called from validateOrder()                                              */
/****************************************************************************/
/****************************************************************************/
/* Function Description                                                     */
/*                                                                          */
/*  This function checks if user checked the pizza's crust                  */
/*                                                                          */
/*                                                                          */
/****************************************************************************/
function validateCrust(errorMessage){ 
   var index = document.onlineOrder.pizzaCrust.selectedIndex;
   if(index == -1){
      errorMessage = "<p>Select the pizza's crust!</p>";
   }else errorMessage = "";
   return errorMessage;
} // end of function

function showErrors(messages) { // adding errors to the html file
   messages = "<ul>" + messages + "</ul>";    
   document.getElementById('errors').innerHTML = messages;
}  // end of function

function  clearErrorsShow() {  // removing all the error from the html file
   document.getElementById('errors').innerHTML = "";
}  // end of function 

