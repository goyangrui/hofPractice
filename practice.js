// This repo is optional extra practice to use the underscore functions.
// Here we'll be writing new functions, but these functions will use
// the underscore functions within them.

/*
 *
 *  _.each
 *
 */

// use _.each to create a copy of the given array.
var moreFruits = function(fruits) {
  var results = [];

  _.each(fruits, function(fruit, index, collection) {
    results.push(fruit);
  });

  return results;
};

// use _.each to traverse the number array and determine
// which are multiples of five.
var multiplesOfFive = function(numbers) {
  var count = 0;

  _.each(numbers, function(number, index, collection) {
    if (number % 5 === 0) {
      count++;
    }
  });

  return count;
};

/*
 *
 *  _.filter
 *
 */

// use _.filter to return the fruits array with only the desired fruit.
var onlyOneFruit = function(fruits, targetFruit) {
  var desiredFruit = _.filter(fruits, function(fruit) {
    if (fruit === targetFruit) {
      return true;
    }
  });
  return desiredFruit;
};

// use _.filter to return the fruits array with only fruits
// starting with the letter 'P'.
var startsWith = function(fruits, letter) {
  var desiredFruits = _.filter(fruits, function(fruit) {
    if (fruit[0] === letter) {
      return true;
    }
  });
  return desiredFruits;
};

// return a filtered array containing only cookie-type desserts.
var cookiesOnly = function(desserts) {
  var cookieDesserts = _.filter(desserts, function(dessert) {
    if (dessert['type'] === 'cookie') {
      return true;
    }
  });
  return cookieDesserts;
};

/*
 *
 *  _.reduce
 *
 */

// return the total price of all products.
var sumTotal = function(products) {
  var totalPrice = _.reduce(products, function(accumulator, item) {
    var itemPrice = parseFloat(item['price'].substring(1));
    return accumulator + itemPrice;
  }, 0);
  return totalPrice;
};

// return an object consisting of dessert types and how many of each.
// exampleOutput: { dessertType: 3, dessertType2: 1 }
var dessertCategories = function(desserts) {
  var dessertTypes = _.reduce(desserts, function(accumulator, item) {
    var type = item['type'];
    accumulator[type] = (accumulator[type] || 0) + 1;
    return accumulator;
  }, {});
  return dessertTypes;
};

// given an array of movie data objects,return an array containing
// movies that came out between 1990 and 2000.
// TIP: use an array as your accumulator - don't push to an external array!
var ninetiesKid = function(movies) {
  var desiredMovies = _.reduce(movies, function(accumulator, item) {
    if (item['releaseYear'] >= 1990 && item['releaseYear'] <= 2000) {
      accumulator.push(item['title']);
    }
    return accumulator;
  }, []);
  return desiredMovies;
};

// return an boolean stating if there exists a movie with a shorter
// runtime than your time limit.
// timeLimit is an integer representing a number of minutes.
var movieNight = function(movies, timeLimit) {
  var existShorterMovie = _.reduce(movies, function(accumulator, item) {
    if (accumulator) {
      return true;
    } else {
      if (item['runtime'] < timeLimit) {
        return true;
      }
      return false;
    }
  }, false);
  return existShorterMovie;
};

/*
 *
 *  _.map
 *
 */

// given an array of strings, use _.map to return a new array containing all
// strings converted to uppercase letters.
var upperCaseFruits = function(fruits) {
  var upperCaseArray = _.map(fruits, function(fruit) {
    return fruit.toUpperCase();
  })
  return upperCaseArray
};

// given an array of dessert objects, return a new array of objects
// that have a new "glutenFree" property, with a boolean value.
// TIP: Items that contain flour are not gluten-free.
var glutenFree = function(desserts) {
  var glutenFreeDesserts = _.map(desserts, function(dessert) {
    var dessertCopy = Object.assign({}, dessert);
    if (dessert['ingredients'].includes('flour')) {
      dessertCopy['glutenFree'] = true;
    } else {
      dessertCopy['glutenFree'] = false;
    }
    return dessertCopy;
  });
  return glutenFreeDesserts;
};

// use _.map to return an array of items with their sale prices, with a new property
// containing the sale price. round any decimals to 2 places.
//
// having trouble with decimals? check out this article:
// http://adripofjavascript.com/blog/drips/avoiding-problems-with-decimal-math-in-javascript.html
//
/*

 example output:
  var salePrices = applyCoupon(groceries, 0.20);
  [
    {
      id: 1,
      product: 'Olive Oil',
      price: '$12.1',
      salePrice: '$9.68'
    }
  ];

*/
var applyCoupon = function(groceries, coupon) {
  var itemsWithSale = _.map(groceries, function(item) {
    // get retail price in cents by first parsing out the '$', parsing it as a float, and
    // converting it to cents (too bypass rounding issue), then rounding the cents to the
    // nearest integer
    var retailPriceCents = Math.round(parseFloat(item['price'].substring(1)) * 100);
    // calculate discounted price in cents as well, and round it to the nearest whole number
    var discountedPriceCents = Math.round((1.0 - coupon) * retailPriceCents);
    // create copy of item object so that the original object doesn't get altered
    var itemCopy = Object.assign({}, item);
    itemCopy['salePrice'] = '$' + (discountedPriceCents / 100);
    return itemCopy;
  });
  return itemsWithSale;
};
