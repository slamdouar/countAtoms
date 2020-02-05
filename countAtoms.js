// This function works but does not use recursion or regex and is not optimal
function count(formula) {
  //This function updates a counter of eleemtn with a formula without parenthesis and a multiplier
  function solve(formula, index) {
    var multiplier = 1;
    element = '';
    for (var i = 0; i < formula.length; i++) {
      if (formula[i] === formula[i].toUpperCase() && isNaN(formula[i])) {
        if (element) {
          if (element in res) {
            res[element] += multiplier * index;
          } else {
            res[element] = multiplier * index;
          }
          element = '';
          multiplier = 1;
        }
        element += formula[i];
      } else if (
        formula[i] === formula[i].toLowerCase() &&
        element.length === 1 &&
        isNaN(formula[i])
      ) {
        element += formula[i];
      } else if (!isNaN(formula[i])) {
        multiplier = parseInt(formula[i]);
        if (element in res) {
          res[element] += multiplier * index;
        } else {
          res[element] = multiplier * index;
        }
        element = '';
        multiplier = 1;
      }
    }
    if (element) {
      if (element in res) {
        res[element] += multiplier * index;
      } else {
        res[element] = multiplier * index;
      }
      element = '';
      multiplier = 1;
    }
  }
  //This function breaks down a formula into parts with parenthesis
  function breakDown(formula, m) {
    var i = 0;
    var p = 0;
    var element = '';
    parts = [];
    while (i < formula.length) {
      if (formula[i] == '(' || formula[i] == '[') {
        if (p === 0) {
          parts.push([element, 1 * m]);
          element = '';
          p++;
          i++;
          continue;
        }
        element += formula[i];
        p++;
        i++;
        continue;
      }

      if (formula[i] == ')' || formula[i] == ']') {
        p--;
        if (p === 0) {
          if (i < formula.length - 1 && !isNaN(formula[i + 1])) {
            parts.push([element, parseInt(formula[i + 1]) * m]);
            element = '';
            i += 2;
            continue;
          }
          parts.push([element, 1 * m]);
          element = '';
          i++;
          continue;
        }
        element += formula[i];

        i++;
        continue;
      }
      element += formula[i];
      i++;
    }
    if (element) {
      parts.push([element, 1 * m]);
    }
    return parts;
  }

  // Here we are dividing the for;ula into subfor;ulas without parenthesis,
  // each with a corresponding multiplier
  function flatDeep(arr) {
    return arr.reduce(
      (acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val) : val),
      []
    );
  }
  r = breakDown(formula, 1);
  parenthesis = true;
  while (parenthesis) {
    var y = 0;
    for (i in r) {
      if (r[i][0].includes('(') || r.includes('[')) {
        r[i] = breakDown(r[i][0], r[i][1]);
      }

      r = flatDeep(r).reduce(function(result, value, index, array) {
        if (index % 2 === 0) result.push(array.slice(index, index + 2));
        return result;
      }, []);
    }
    for (var i = 0; i < r.length; i++) {
      if (r[i][0].includes('(') || r.includes('[')) {
        var y = 0;
        break;
      }
      y = 1;
    }
    if (y == 1) {
      parenthesis = false;
    }
  }
  res = {};
  for (var i in r) {
    solve(r[i][0], r[i][1]);
  }
  return res;
}

console.log(count('H2O'));
console.log(count('Mg(OH)2'));
console.log(count('K4[ON(SO3)2]2'));

//console.log(count(formula));
