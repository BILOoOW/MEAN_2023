// Create a function that everytime you invoke it, it will print out the message 
// Congrats you earn the chance!", however it can only print out the message with the first 5 excutions. 
// all the rest invoke will print out the message "Sorry you missed the chance"
function funcA(x){
    function funcB(){
        if(x > 0){
            console.log("Congrats you earn the chance");
            x = x-1;
        }else{
            console.log("Sorry you missed the chance");
        }
    }
    return funcB;
}
const myFunc = funcA(5);
myFunc();
myFunc();
myFunc();
myFunc();
myFunc();
myFunc();
myFunc();
myFunc();
myFunc();
myFunc();
myFunc();