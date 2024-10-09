import { say } from "cowsay";

console.log("hola mundo");



console.log(cowsay.say({
    text : "Fuck",
    e : "ºº",
    T : "b "
}));

function get_cows(error, cow_names) {
    if (error) {
        console.log(error)
    }
    else if (cow_names) {
        console.log(`Number of cows available: ${cow_names.length}`);
    }
}

cowsay.list(get_cows);
