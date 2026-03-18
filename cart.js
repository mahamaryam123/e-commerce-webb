const label = document.querySelector("#label");
const shoppingcart = document.querySelector("#shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];
//console.log(basket);
let calculation = () => {
  let carticon = document.querySelector(".cartAmount");

  //from this we will got 1,3,4,5 and than 6,7,8 insted 1 /0 means the defult value is 0
  //x is the first value and y is the second
  //console.log(basket.map((x)=>x.item).reduce((x,y)=>x+y,0));
  carticon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();
//.......................Generating the add to card items ....................................
let generatecartitems = () => {
  if (basket.length !== 0) {
    //  here x is the locals item
    return (shoppingcart.innerHTML = basket
      .map((x) => {
        //console.log(x);

        let { id, item } = x;
        let search = shopitemdata.find((y) => y.id === id) || [];
        let { img, price, names } = search;
        return `
    <div class="cart-item">
        <img width="100" src='${img}' alt="" /> 
        <div class="details">

          <div class="title-price-x">
              <h4 class="title-price">
                <p>${names}</p>
                <p class="cart-item-price">$ ${price}</p>
              </h4>
              <i onclick="removeItem('${id}')" class="bi bi-x-lg"></i>
          </div>

          <div class="buttons">
              <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
          </div>

          <h3>${item * price}</h3>
        </div>
      </div>
`;
      })
      .join(""));
  } else {
    shoppingcart.innerHTML = ``;
    label.innerHTML = `
<h2>Cart is Emply</h2>
<a href="index.html">
<button class="HomeBtn">Back to Home</button>
</a>
`;
  }
};
generatecartitems();
//-----------------------increment--------------------------------------
let increment = (id) => {
  //    let selecteditem=id;
  let search = basket.find((x) => x.id === id);
  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item++;
  }
  //i want to save the data in local storage when i trigerd the increment and decrement function
  localStorage.setItem("data", JSON.stringify(basket));
  generatecartitems();
  //   console.log(basket);
  updateNum(id);
};
//--------------------------------decrement------------------------------------
let decrement = (id) => {
  let search = basket.find((x) => x.id === id);

  if (search === undefined || search.item === 0)
    return; //dont run the code furthur
  else {
    search.item--;
  }
  //pahly update ho num phir cancelho
  updateNum(id);
  //only except the card that have more than one item and no 0 item
  basket = basket.filter((x) => x.item !== 0);
  generatecartitems();
  //   console.log(basket);

  localStorage.setItem("data", JSON.stringify(basket));
};
//---------------------------------updatenumber-----------------------------------
let updateNum = (id) => {
  //jis cart ki id match ho gi selected id sy
  let search = basket.find((x) => x.id === id);
  //  console.log(search);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  Totalamount();
};
//-----------------------------removing the carts and updating the lS-------------------------
const removeItem = (id) => {
  console.log(id);
  select = id;
  basket = basket.filter((x) => x.id !== id);
  //console.log(basket);
  generatecartitems();
  Totalamount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};
//------------------------calculating total-----------------------------------
let Totalamount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopitemdata.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);

    // console.log(amount);
    label.innerHTML = `
<h2>Total Bill: $ ${amount}</h2>
<button class="checkout">Checkout</button>
<button onclick="clearcart()" class="removeAll">Clear Cart</button>
`;
  } else return;
};
//------------------clear all carts---------------------------
let clearcart = () => {
  basket = [];
  generatecartitems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

Totalamount();
