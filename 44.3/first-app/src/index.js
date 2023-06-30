import fruits from "./foods";
import { choice, remove } from "./helpers";

let fruit = fruit(choice);
console.log(`i'd like one ${fruit}, please`);
console.log(`here you go: ${fruit}`);
console.log(`Delicious! May I have another?`);
let remaining = remove(fruit, fruits);
console.log(`I'm sorry, we're all out. We have ${remaining.length} left.</p>`);
