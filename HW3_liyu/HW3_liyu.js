// 1. Write a JavaScript function that reverse a number. 
// Example x = 32243;
// Expected Output: 34223 
function reverse_number(x){
    const ifNegative = x < 0;   //consider negative case
    let ret = 0;
    while(x > 0){
        let y = x % 10;
        ret *= 10;
        ret += y;
        x = Math.floor(x / 10);
    }
    return ifNegative ? ret * -1 : ret;
}
// let x = 23455;
// console.log(reverse_number(x));

// 2. Write a JavaScript function that checks whether a passed string is palindrome or not? 
// A palindrome is word, phrase, or sequence that reads the same backward as forward, e.g., madam or nurses run.
function if_palindrome(x){
    const trim = x.replace(/\s/g, '');
    const reverse = trim.split('').reverse().join('');
    return trim == reverse;
}
// let x = "nurses run ";
// console.log(if_palindrome(x));

// 3. Write a JavaScript function that generates all combinations of a string. 
// Example string: 'dog' 
// Expected Output: d, do, dog, o, og, g 
function all_combo(x){
    const ret = [];
    for(let i = 0; i < x.length; i++){
        for(let j = i + 1; j <= x.length; j++){
            ret.push(x.slice(i,j));
        }
    }
    return ret;
}
// let x = "dog";
// console.log(all_combo(x));

// 4. Write a JavaScript function that returns a passed string with letters in alphabetical order. 
// Example string: 'webmaster' 
// Expected Output: 'abeemrstw'
// Assume punctuation and numbers symbols are not included in the passed string.
function alphabetical_order(x){
    return x.split('').sort().join('');
}
// let x = 'webmaster';
// console.log(alphabetical_order(x));

// 5. Write a JavaScript function that accepts a string as a parameter and converts the first letter of each word of the string in upper case. 
// Example string: 'the quick brown fox' 
// Expected Output: 'The Quick Brown Fox '
function convert_firstletter_upper(x){
    const ret = x.split(' ');
    for(let i = 0; i < ret.length; i++){
        ret[i] = ret[i].charAt(0).toUpperCase() + ret[i].substring(1);
    }
    return ret;
}
// let x = 'the quick brown box'
// console.log(convert_firstletter_upper(x))

// 6. Write a JavaScript function that accepts a string as a parameter and find the longest word within the string. 
// Example string: 'Web Development Tutorial' 
// Expected Output: 'Development'
function longest_word(x){
    const arr = x.split(' ');
    let ret = arr[0];
    for(let i = 0; i < arr.length; i++){
        if(arr[i].length >= ret.length){
            ret = arr[i];
        }
    }
    return ret;
}
// let x = 'Web Development Tutorial';
// console.log(longest_word(x));

// 7. Write a JavaScript function that accepts a string as a parameter and counts the number of vowels within the string. 
// Note: As the letter 'y' can be regarded as both a vowel and a consonant, we do not count 'y' as vowel here. 
// Example string: 'The quick brown fox' 
// Expected Output: 5
function num_of_vowels(x){
    return x.match(/[aeiou]/gi).length;
}
// let x = 'The quick brown fox';
// console.log(num_of_vowels(x));

// 8. Write a JavaScript function that accepts a number as a parameter and check the number is prime or not. 
// Note: A prime number (or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.
function if_prime(x){
    if(x < 2) return false;
    for(let i = 2; i < x; i++){
        if(x % i == 0) return false;
    }
    return true;
}
// let x = 5;
// console.log(if_prime(x));

// 9. Write a JavaScript function which accepts an argument and returns the type. 
// Note: There are six possible values that typeof returns: object, boolean, function, number, string, and undefined.
function return_type(x){
    return typeof(x);
}
// console.log(return_type(x));

// 10. Write a JavaScript function which returns the n rows by n columns identity matrix. 
function identity(n){
    const ret = new Array(n).fill(0);
    for(let i = 0; i < n; i++){
        ret[i] = new Array(n).fill(0);
    }
    for(let i = 0; i < n; i++){
        ret[i][i] = 1
    }
    return ret;
}
// console.log(identity(4))

// 11. Write a JavaScript function which will take an array of numbers stored and find the second lowest and second greatest numbers, respectively. 
// Sample array: [1,2,3,4,5]
// Expected Output: 2,4 
function second_lowest_greatest(x){
    if(x.length==0 || x.length==1) return false;
    return [x.sort()[1], x.sort()[x.length-2]]
}
// console.log(second_lowest_greatest([1,2]))

// 12. Write a JavaScript function which says whether a number is perfect. 
// According to Wikipedia: In number theory, a perfect number is a positive integer that is equal to the sum of its proper positive divisors, that is, the sum of its positive divisors excluding the number itself (also known as its aliquot sum). Equivalently, a perfect number is a number that is half the sum of all of its positive divisors (including itself).
// Example: The first perfect number is 6, because 1, 2, and 3 are its proper positive divisors, and 1 + 2 + 3 = 6. Equivalently, the number 6 is equal to half the sum of all its positive divisors: ( 1 + 2 + 3 + 6 ) / 2 = 6. The next perfect number is 28 = 1 + 2 + 4 + 7 + 14. This is followed by the perfect numbers 496 and 8128.
function if_perfect(x){
    let sum_of_divisors = 0;
    for(let i = 1; i <= x/2; i++){
        if(x%i == 0) sum_of_divisors += i;
    }
    return sum_of_divisors == x ? true : false;
}

// console.log(if_perfect(6));
// 13. Write a JavaScript function to compute the factors of a positive integer. 
// function factors(x){
//     let ret = [];
//     for(let i = 1; i <= x; i++){
//         if(x%i == 0) ret.push(i);
//     }
//     return ret;
// }
// console.log(factors(15));

// 14. Write a JavaScript function to convert an amount to coins. 
// Sample function: amountTocoins(46, [25, 10, 5, 2, 1])
// Here 46 is the amount. and 25, 10, 5, 2, 1 are coins. 
// Output: 25, 10, 10, 1
function amountTocoins(amount, coins){
    let ret = [];
    while(amount > 0){
        for(let i = 0; i < coins.length; i++){
            if(amount - coins[i] >= 0){
                amount = amount - coins[i];
                ret.push(coins[i]);
                break;
            }
        }
    }
    return ret;
}
// console.log(amountTocoins(46, [25, 10, 5, 2, 1]))

// 15. Write a JavaScript function to compute the value of bn where n is the exponent and b is the bases. Accept b and n from the user and display the result.
function bn(b,n){
    if(!n) return 1;
    let ret = 1;
    abs_n = Math.abs(n);
    while(abs_n >= 1){
        ret *= b;
        abs_n -= 1;
    }
    if(b < 0) ret = abs_n%2 ? -1 * ret : ret;
    if(n < 0) ret = 1 / ret;
    return ret;
} 
// console.log(bn(-3,2));

// 16. Write a JavaScript function to extract unique characters from a string. 
// Example string: "thequickbrownfoxjumpsoverthelazydog"
// Expected Output: "thequickbrownfxjmpsvlazydg"
function unique_char(x){
    x = new Set(x.split(''));
    return [...x].join('');
}
// console.log(unique_char('thequickbrownfoxjumpsoverthelazydog'));

// 17. Write a JavaScript function to get the number of occurrences of each letter in specified string. 
function occurrences_of_letter(x){
    x = x.match(/[a-zA-Z]/g);
    let map = new Map();
    for(let i = 0; i < x.length; i++){
        if(!map.has(x[i])) map.set(x[i],1);
        else map.set(x[i], map.get(x[i])+1);
    }
    return map;
}
// console.log(occurrences_of_letter("nihaoma, woaizhongguo"));

// 18. Write a function for searching JavaScript arrays with a binary search. 
// Note: A binary search searches by splitting an array into smaller and smaller chunks until it finds the desired value.
function binary_search(arr, x){
    let low = 0, high = arr.length-1;
    // let mid = low + Math.floor((high-low)/2); //left mid
    while(low < high){
        let mid = low + Math.floor((high-low)/2); //left mid
        if(x > arr[mid]) low = mid + 1;
        else high = mid;
        
    }
    return x == arr[high]? high : false;
}
// arr = [1,4,6,7,8,9,15,20]
// // arr = [7,8]
// x = 7;
// console.log(binary_search(arr,x));

// 19. Write a JavaScript function that returns array elements larger than a number. 
function larger_than_num(x){
    return x > 5;
}
// let x = [1,3,5,7,9,11];
// console.log(x.filter(larger_than_num));

// 20. Write a JavaScript function that generates a string id (specified length) of random characters. 
// Sample character list: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
function generate_id(x){
    const char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = '';
    for(let i = 0; i < x; i++){
        id += char_list.charAt(Math.floor(Math.random()*x));
    }
    return id;
}
// console.log(generate_id(20));

// 21. Write a JavaScript function to get all possible subset with a fixed length (for example 2) combinations in an array. 
// Sample array: [1, 2, 3] and subset length is 2 
// Expected output: [[2, 1], [3, 1], [3, 2]]
function all_possible_combo(arr,x){
    const ret = [];
    ret.push(1); 
}
console.log(all_possible_combo([1,2,3],2))