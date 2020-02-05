function count(formula) {
  // This is to replace square and curly brackets to normal round bracket
  // I think it could be improved using Regex
  formula = formula.replace('[', '(');
  formula = formula.replace(']', ')');
  formula = formula.replace('{', '(');
  formula = formula.replace('}', ')');
  formula = breakDown(formula);
  //Here we initialize a stack and a dict
  const stack = [];
  var current_dict = {};
  for (var i = 0; i < formula.length; i++) {
    if (formula[i] == '(') {
      // If we encounter an open bracket, we store the current dictionary on the stack and initialize a new one
      stack.push(current_dict);
      current_dict = {};
    } else if (!isNaN(formula[i])) {
      if (formula[i - 1] == ')') {
        // If we encounter a number and it is the end of a bracket, we multiplyevery element of the dictionary by that number
        for (const k in current_dict) {
          current_dict[k] *= +formula[i];
        }
        // We take the last dictionary in the stack and we 'merge' it with the current one
        let last = stack.pop();
        for (const k in last) {
          current_dict[k] = current_dict[k] + last[k] || last[k];
        }
      } else {
        // If it is a number next to an element, we add this number to its entry in the dict
        // Here we need to substract 1 to the element because we incremented when we first encountered it
        current_dict[formula[i - 1]] += +formula[i] - 1;
      }
    } else if (formula[i] != ')') {
      // If we encounter an element we either create it or increment its count by 1 in the dict
      current_dict[formula[i]] = current_dict[formula[i]] + 1 || 1;
    }
  }
  return current_dict;
}

// This is to get an array of elements (ex: 'Mg, Ca, H, O), numbers and square brackets
// I think this could be improved by using Regex
function breakDown(formula) {
  element = '';
  res = [];
  for (i of formula) {
    if (i == '(' || i == ')') {
      if (element) {
        res.push(element);
        element = '';
      }
      res.push(i);
    } else if (i === i.toUpperCase()) {
      if (element) {
        res.push(element);
        element = '';
      }
      element += i;
    } else if (i === i.toLowerCase()) {
      element += i;
      res.push(element);
      element = '';
    } else if (!isNaN(i)) {
      if (element) {
        res.push(element);
        element = '';
      }
      res.push(i);
    }
  }
  if (element) {
    res.push(element);
  }
  return res;
}
console.log(count('H2O'));
console.log(count('Mg(OH)2'));
console.log(count('K4[ON(SO3)2]2'));

// The input 'H2O' must return {'H': 2, 'O': 1}

// The input 'Mg(OH)2' must return {'Mg': 1, 'O': 2, 'H': 2}

// The input 'K4[ON(SO3)2]2' must return {'K': 4, 'O': 14, 'N': 2, 'S': 4}
