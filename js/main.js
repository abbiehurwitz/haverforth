// See the following on using objects as key/value dictionaries
// https://stackoverflow.com/questions/1208222/how-to-do-associative-array-hashing-in-javascript

/**
 * Your thoughtful comment here.
 */
function emptyStack(stack) {
    // ...
}
function emptyStack(stack){
  while(stack.length > 0){
    stack.pop();
  }
}
function add(stack){
  var first = stack.pop();
  var second = stack.pop();
  stack.push(first+second);
}
function subtract(stack){
  var first = stack.pop();
  var second = stack.pop();
  stack.push(first-second);
}
function multiply(stack){
  var first = stack.pop();
  var second = stack.pop();
  stack.push(first*second);
}
function divide(stack){
  var first = stack.pop();
  var second = stack.pop();
  stack.push(first/second);
}
function nip(stack){
  stack.pop()
}
function swap(stack){
  var first = stack.pop()
  var second = stack.pop()
  stack.push(first);
  stack.push(second);
}
function over(stack){
  var first = stack.pop()
  var second = stack.pop()
  stack.push(first);
  stack.push(second);
  stack.push(first);
}
function greaterThan(stack){
  var first = stack.pop()
  var second = stack.pop()
  if(first > second){
    stack.push(0);
  }
  else{
    stack.push(-1);
  }
}
function lessThan(stack){
  var first = stack.pop();
  var second = stack.pop();
  if(first < second){
    stack.push(0);
  }
  else{
    stack.push(-1);
  }
}
function equalTo(stack){
  var first = stack.pop()
  var second = stack.pop()
  if(first == second){
    stack.push(0);
  }
  else{
    stack.push(-1);
  }
}
function printS(stack){
  print(terminal, " <" + stack.length + "> " + stack.slice().join(" "));
}
var builtIn = {};
builtIn["+"] = add;
builtIn["-"] = subtract;
builtIn["*"] = multiply;
builtIn["/"] = divide;
builtIn["nip"] = nip;
builtIn["swap"] = swap;
builtIn["over"] = over;
builtIn["<"] = greaterThan;
builtIn[">"] = lessThan;
builtIn["="] = equalTo;
builtIn[".s"] = printS

var userDefined = {};

/**
 * Print a string out to the terminal, and update its scroll to the
 * bottom of the screen. You should call this so the screen is
 * properly scrolled.
 * @param {Terminal} terminal - The `terminal` object to write to
 * @param {string}   msg      - The message to print to the terminal
 */
function print(terminal, msg) {
    terminal.print(msg);
    $("#terminal").scrollTop($('#terminal')[0].scrollHeight + 40);
}

/**
 * Sync up the HTML with the stack in memory
 * @param {Array[Number]} The stack to render
 */
function renderStack(stack) {
    $("#thestack").empty();
    stack.slice().reverse().forEach(function(element) {
        $("#thestack").append("<tr><td>" + element + "</td></tr>");
    });
};

/**
 * Process a user input, update the stack accordingly, write a
 * response out to some terminal.
 * @param {Array[Number]} stack - The stack to work on
 * @param {string} input - The string the user typed
 * @param {Terminal} terminal - The terminal object
 */
 function uprocess(stack, key, terminal){
   var str = userwords[key];
   process(stack, str, terminal);
 }

var userfunction = [];

   
 function process(stack, input, terminal) {
   var inputs = input.trim().split(/ +/);
     var startFunc = false;
     var getName = false;
     for(var c = 0; c < inputs.length; c++) {
       //if number push onto stack
       if (!(isNaN(Number(inputs[c]))) && startFunc === false) {
           stack.push(Number(inputs[c]));
       } else if (inputs[c] == ":"){
         //start of user defined function
           var getName = true;
           var Username;
           //var userfunc = [];
       } else if (getName === true){
           Username = inputs[c];
           getName = false;
           startFunc = true;
       } else if (startFunc === true && inputs[c] != ";") {
         //create list of user function
           userfunc.push(inputs[c]);
       } else if (inputs[c] == ";"){
           var string = userfunc.join(" ");
           userDefined[name] = string;
           startFunc = false;
       } else if (builtIn.hasOwnProperty(inputs[c]) === true && startFunc === false) {
         //checks if built in function and runs
           words[inputs[c]](stack);
       } else if (userDefined.hasOwnProperty(inputs[c]) === true && startFunc === false) {
         //checks if user defined function and runs
           (stack, inputs[c], terminal);
       } else {
           print(terminal, ":-( Unrecognized input");
       }
     }
     renderStack(stack);
 };


function runRepl(terminal, stack) {
    terminal.input("Type a forth command:", function(line) {
        print(terminal, "User typed in: " + line);
        process(stack, line, terminal);
        runRepl(terminal, stack);
    });
};


// Whenever the page is finished loading, call this function.
// See: https://learn.jquery.com/using-jquery-core/document-ready/
$(document).ready(function() {
    var terminal = new Terminal();
    terminal.setHeight("400px");
    terminal.blinkingCursor(true);

    // Find the "terminal" object and change it to add the HTML that
    // represents the terminal to the end of it.
    $("#terminal").append(terminal.html);

    var stack = [];
    var resetbutton = $("#reset");
    renderStack(stack);
    $("#reset").click(function() { while(stack.length > 0) { stack.pop(); } });
    print(terminal, "Welcome to HaverForth! v0.1");
    print(terminal, "As you type, the stack (on the right) will be kept in sync");

    runRepl(terminal, stack);
});

