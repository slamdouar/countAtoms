# Count Atoms


These functions take a chemical formula as an input, and returns an object where keys correspond to atoms and values to the number of each atom in the molecule 

I solved this problem with two different methods. The first one (countAtoms.js) was very straightforward and looking back, it was way too complicated. The second way involved using a stack which I think is more elegant and is definitely more efficient as we go through the list once only

# countAtoms.js

For the first method, I used a breakDown function to divide the formula into subformulas until I have no parenthesis left while storing their multiplier. This function has a very big complexity as it goes to each subformula until we have an array of formulas without parenthesis. I then used a count function on each formula returning the count of atom for a simple string without parenthesis taking into account the multiplier stored

# countAtoms_stack.js

The second method is much more elegant as we only go through the formula once, giving us a complexity of O(n)
The idea is to initialize a stack and store the current dictionary in a stack whenever we encounter a bracket. That way we can count the number of elements in that bracket and multiply them by their value and then 'merge' these new values with the dictionary in the stack

# Other possible method

I belive it is possible to use a recursive method to solve this problem

# Constraints

* The formula needs to be valid
* the numbers in the formula need to be single-digits (i.e no number greater that 9)
