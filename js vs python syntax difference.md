===========================================
python:
```
x = map(func, iterable)
```

js
```
let x = iterable.map(func)
```
===========================================
python:
```
dict_variable = {'xKey': 'x_value', 'yKey': 'y_value'}
x, y = dict_variable.values()   // .values() is not nacessary except in dictionary in python. cause otherwise it gets the whole thing, key:value pair
```

js: Order Does Not Matter, but key names has to be exact same
```
const obj_variable = { xKey_Same_Name: 'x_value', yKey_Same_Name: 'y_value' };
let { xKey_Same_Name, yKey_Same_Name } = obj_variable;
let { xKey_Same_Name: x_your_choice, yKey_Same_Name: y_your_choice } = obj_variable;  //or, if you want to rename with your choice.


```
===========================================
python:
list comprehension

js
ternary op:
===========================================
Unused variables should start with underscore
