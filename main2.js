let titel = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.querySelector(".submit");
let temp;
let mood = 'create'
// get total

function gettotal(){
 
    if(price.value !=''){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
total.innerHTML = result;
total.style.background = "#040";
}else{
    total.style.background = "#a00d02";
    total.innerHTML = ''
}
}

// create product
let datapro;
 let local = localStorage.getItem('newproduct')
if(local !=null){
  datapro = JSON.parse(local)
}
else{
    datapro = [];
}
submit.onclick = function () {
    let newpro = {
      titel: titel.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLowerCase(),
      
    };
    if (mood == 'create') {
        
        if (newpro.count > 1) {
            for(let i = 0; i < newpro.count; i++){
              datapro.push(newpro);
            }
          }else{
            datapro.push(newpro);
        
          }

          total.style.background = 'red'
    }else{
        datapro[temp] = newpro;
        submit.innerHTML = 'create';
        mood = 'create';
        count.style.display = 'block'
        total.style.background = 'red'
    }
    
    localStorage.setItem('newproduct',JSON.stringify(datapro))
    showData()
    clearData()
}
// clearData
function clearData() {
    titel.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
  }

// show data
function showData(){
let table = '';
for(let i = 0; i < datapro.length;i++){
table +=`

        <tr> 
        <td>${i}</td>
        <td>${datapro[i].titel}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick = "updateData(${i}) " id="update">update</button></td>
        <td><button  id="delete" onclick =  deleteonepro(${i})>delete</button></td>
        </tr>
`
}
 document.getElementById('tbody').innerHTML = table;
 let clear = document.querySelector('.clear')
 if(datapro.length > 0){
    clear.innerHTML = `
    <button onclick = "clearALLData()"> Delete All (${datapro.length}) </button>    `
 }
 else{
    clear.innerHTML = '';
 }
}
showData();
// مهمة لسح جمع المنتجات
// clear All Data 
function clearALLData(){
    datapro.splice(0)
 localStorage.clear();
    showData()
}
// delete one product 
function deleteonepro(i) {
    datapro.splice(i,1);
    local = JSON.stringify(datapro);
    showData();
}

// updata
function updateData(i){
    titel.value = datapro[i].titel;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    total.innerHTML = datapro[i].total;
    category.value = datapro[i].category;
    gettotal();
    mood= 'updata' ;
    submit.innerHTML = 'updata' ;
    temp = i
    count.style.display = 'none'
    scroll({
        top:0,
        behavior: 'smooth',
    })
}
// search
let search= document.getElementById('search');
let searchmood = 'titel';
function getsearchmood(id) {
    if (id == 'searchtitle') {
        searchmood = 'titel';
        
    }else{
        searchmood = 'category'
        
    }
    search.placeholder = 'search by '+searchmood;
    search.focus()
    search.value = '';
}

// search data 
function searchData(value) {
    let table = '';
 for (let i = 0; i < datapro.length; i++) {
    if (searchmood == 'titel') {
        if (datapro[i].titel.includes(value.toLowerCase())) {
            table +=`

        <tr> 
        <td>${i}</td>
        <td>${datapro[i].titel}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick = "updateData(${i}) " id="update">update</button></td>
        <td><button  id="delete" onclick =  deleteonepro(${i})>delete</button></td>
        </tr>
`
        }
    }else{
        if (datapro[i].category.includes(value.toLowerCase())) {
            table +=`

        <tr> 
        <td>${i}</td>
        <td>${datapro[i].titel}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick = "updateData(${i}) " id="update">update</button></td>
        <td><button  id="delete" onclick =  deleteonepro(${i})>delete</button></td>
        </tr>
`
        }
        
    }
 }
 
        
document.getElementById('tbody').innerHTML = table;
}
