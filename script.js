const input = document.querySelector("#taskClass");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("#listItems");
let counter = 0 ;

/* load local storaged data */
const keys = [];
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key.startsWith("m")) keys.push(key);
}

// sort keys by number
keys.sort((a, b) => {
  return parseInt(a.slice(1)) - parseInt(b.slice(1));
});

keys.forEach((key) => {
  createItem(key, localStorage.getItem(key));
  const num = parseInt(key.slice(1));
  if (!isNaN(num) && num >= counter) counter = num + 1;
});
/************************* */

/* function show list item with delete button */
function createItem(key,value){
  const li =document.createElement("li") ;
  li.classList.add("listItem") ;
  li.textContent = value ;
  /*delete button */
  const btn = document.createElement("button") ;
  btn.classList.add("deleteBtn") ;
  btn.textContent = "delete" ;

  btn.addEventListener("click",()=> {
    li.remove() ;
    localStorage.removeItem(key);
  })

  li.appendChild(btn) ;
  list.appendChild(li) ;
}
 



addBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    if(input.value.trim()==="") return ;
    const key = `m${counter}` ;
    localStorage.setItem(key,input.value) ;
    createItem(key,input.value) ;   
    counter++ ;
    input.value ="";
  })