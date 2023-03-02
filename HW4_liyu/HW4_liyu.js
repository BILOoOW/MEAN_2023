//myMap function takes an callback function as input, and apply this callback function to every element of the array
Array.prototype.myMap = function(cb){
    newarr = new Array(this);
    for(let i = 0; i < this.length; i++){
        newarr[i] = cb(this[i])
    }
    return newarr;
}
arr = [1,4,9,16]
console.log('The array after myMap function is ', arr.myMap(Math.sqrt));
console.log('The original array is ', arr);


//myReduce function takes an reducer callback function and an initial value as input. Then apply the reducer function
//on each element of the array and return the accumulate result as a single value. If the initial value is not specified,
//then we set the initial value as this[0], and iterate from this[1]; if the initial value is specified, we iterate from
//this[0]
Array.prototype.myReduce = function(cb, initial){
    let accumulate_result = (initial == undefined) ? this[0] : initial;
    for(let i = (initial == undefined) ? 1 : 0; i < this.length; i++){
        accumulate_result = cb(accumulate_result, this[i])
    }
    return accumulate_result;
}
arr = [1,4,9,16]
function sum(total, cur){
    return total + cur;
}

console.log(arr.myReduce(sum))
console.log(arr.myReduce(sum,10))


