const shop = document.querySelector("#shop");


//for geting the data fom locls storage/ [] empty is when there is no data than return empty otherwise error will shown
let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateshop = () => {
  return (shop.innerHTML = shopitemdata
    .map((x) => {
      let { img, desc, names, id, price } = x;
      //agar id match hoti hy to else empty arry return//if find somthing than store here if not than empty[]
      let search = basket.find((x) => x.id === id) || [];


      return `
     <div id="product-id-${id}" class="item">
            <img width="200" src="${img}" alt="">
            <div class="details">
                <h3>${names}</h3>
                <p>${desc}</p>
                <div class="price-quantity"> 
                    <h2>$ ${price}</h2>
                </div>
               
                <div class="buttons">
                    <button onclick="decrement('${id}')" class="btn-minus">-</button>
                    <div id=${id} class="quantity"> ${search.item === undefined ? 0 : search.item}</div>
                    <button onclick="increment('${id}')"  class="btn-plus">+</button>
                </div>
            </div>
  </div>
       `;
    })
    .join(""));
};
generateshop();
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
  basket=basket.filter((x)=>x.item!==0)

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
};
let calculation = () => {
  let carticon = document.querySelector(".cartAmount");

  //from this we will got 1,3,4,5 and than 6,7,8 insted 1 /0 means the defult value is 0
  //x is the first value and y is the second
  //console.log(basket.map((x)=>x.item).reduce((x,y)=>x+y,0));
  carticon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();











// Firebase libraries ko import karein (CDN ke zariye)
import { initializeApp } from "https://www.gstatic.com";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com";

const firebaseConfig = {
  apiKey: "AIzaSyDG5yf1R5d7w_3u2Funbysnp9Irfe4LI3c",
  authDomain: "e-commerse-1e.firebaseapp.com",
  databaseURL: "https://e-commerse-1e-default-rtdb.firebaseio.com",
  projectId: "e-commerse-1e",
  storageBucket: "e-commerse-1e.firebasestorage.app",
  messagingSenderId: "848018332154",
  appId: "1:848018332154:web:387ac849e019fc74a06c43",
  measurementId: "G-9YPNDGTJ2E"
  // ... baaki config
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Data fetch karne ka function
async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    // Yahan aap apna HTML update karein products dikhane ke liye
  });
}

getProducts();
