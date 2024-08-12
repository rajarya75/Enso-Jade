//////////
//function to make the GET parameter work
//////////
var url = window.location.href;

//console.log(url);
function getAllUrlParams(url) {
  // get query string from url (optional) or window
  var queryString = url ? url.split("?")[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {
    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split("#")[0];

    // split our query string into its component parts
    var arr = queryString.split("&");

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split("=");

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1, -1);
        return "";
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof a[1] === "undefined" ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === "string") {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === "undefined") {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }
  return obj;
}

//get variable name is "page"
// The button has the id of returnBtn
pageParam = getAllUrlParams().page;
console.log(pageParam);
console.log(window.location.hostname);
var backLink;
function activateReturnBtn(param) {
  document.getElementById("returnBtn").style.display = "flex";
  document.getElementById("returnBtn").addEventListener("click", function() {
    backLink = "https://" + window.location.hostname + "/" + param;
    window.location.href = backLink;
  });
}

if (pageParam) {
  if (sessionStorage.getItem("fromSalesKit") === null) {
    sessionStorage.setItem("fromSalesKit", true);
  }
  activateReturnBtn(pageParam);
  //console.log(backLink);
}
if (sessionStorage.getItem("fromSalesKit") ==="sales-kit") {
  activateReturnBtn("sales-kit/");
}
if (sessionStorage.getItem("fromSalesKit") === "neurosales") {
  activateReturnBtn("neurosales/");
}
if (sessionStorage.getItem("fromSalesKit") === "emotions") {
  activateReturnBtn("emotions/");
}
//console.log(window.location.hostname+"/"+getAllUrlParams().page);
//console.log(window.location);
//console.log(getAllUrlParams().page);

/*
---------------------------------------------------------------------------------------------------------------------------------
*/

//////////
//virtual keyboard
//////////

// //modifica dimensioni per ipad
// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
// //don't show keyboard
// }
// else{
//     $('#name, #email').keyboard({
//         layout: 'custom',
//         customLayout: {
//             'normal': [
//                 '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
//                 '{tab} q w e r t y u i o p [ ] \\',
//                 'a s d f g h j k l ; \' {enter}',
//                 '{shift} z x c v b n m , . / {shift}',
//                 '{accept} {space} {left} {right} {sp:.2} {del} {combo} {toggle} {extender}'],
//                 'shift': [
//                 '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
//                 '{tab} Q W E R T Y U I O P { } |',
//                 'A S D F G H J K L : " {enter}',
//                 '{shift} Z X C V B N M < > ? {shift}',
//                 '{accept} {space} {left} {right} {sp:.2} {del} {combo} {toggle} {extender}']
//         },
//         usePreview: false,
//         acceptValid: true,
//         validate: function (kb, val) {
//             return val.length > 3;
//         }
//     })
//     // activate the typing extension
//     .addTyping({
//         showTyping: true,
//         delay: 250
//     }).addExtender({
//         layout: 'numpad',
//         showing: false,
//         reposition: true
//     });
// }
