import * as readlineSync from "readline-sync"
import {Tree} from "./tree.js";
import {Human} from "./human.js";

let tree: Tree<number, Human> = new Tree<number, Human>();

console.log('Работа с связным списком');

readlineSync.promptCLLoop({
    add: function(index, name, age, address) {
        let human =  new Human(name, Number(age), address);
        tree.insert(Number(index), human);
        console.log('В двоичное дерево на позицию [' + index + '] был вставлен человек "' + human + '"');
        tree.toString();
    },
    get: function(index) {
        const human = tree.get(Number(index))
        console.log('Человек из списка по индексу [' + index + '] : "' + human + '"');
    },
    remove: function(index) {
        console.log('Из списка был удален человек по индексу [' + index + ']');
        tree.remove(Number(index))
        console.log(tree.toString());
    },
    exit: function() { return true; }
});
console.log('Exited');