const Srch=document.querySelector("#search")
const Dishes=document.querySelector("#dishes")
const li_1=document.querySelector("#li_1")
const li=document.querySelectorAll("#li")
const sec=document.querySelector("#section")


// For search 
Srch.addEventListener('keyup', e=>{
    sec.style.display="none"
    Dishes.style.display="block"
    let Value=Srch.value;
    let search=Value.toLowerCase()
    console.log(search)
       Await()
    async function Await(){
        try{
        let name= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        let apiJson=await name.json()
        window.srchDishes=await apiJson.meals;
        let list=await lists()
        }catch{}
    }

    // For suggestions
    function lists(){
        Dishes.innerHTML="";
        for(let i=0; i<srchDishes.length; i++){
        if(srchDishes[i].strMeal.indexOf(search)){
        Dishes.innerHTML+=`<li align="center" id="li" style="background-color: rgba(255, 255, 255, 0.219); color:white; font-size:20px; margin:1% 30%; padding:5px 0px; border-radius:20px; cursor:pointer;">
        ${srchDishes[i].strMeal}</li>`
            }
          }
    }
})

// Display meal details
let item=Dishes.children;
Dishes.addEventListener("mouseover", e=>{
    for(let i=0; i<item.length; i++){
       item[i].addEventListener("click", e=>{
           Srch.value=item[i].textContent;
           sec.style.display="block"
           Dishes.style.display="none"
           if(srchDishes[i].strMeal != Srch.value){
               Srch.value=" ";
           ingredients(srchDishes[i])
              sec.innerHTML=`<div class="container">
                             <h1 style="font-family: cursive;" align="center">${srchDishes[i].strMeal}</h1>
                             <hr style="width:60%; margin:2vw 0 2vw 20%; ">
                             <div class="row">
                             <div class="col-12 col-sm-12 col-md-7" style="height:fit-content;">
                             <img src=${srchDishes[i].strMealThumb}></img>
                             </div>
                             <div class="col-12 col-sm-12 col-md-5" style="height:fit-content; margin-top:0.5vw;">
                             <button align="left" id="ingd-btn">Ingredient</button>
                             <ul style="margin-top:1vw;">
                             ${ingredient.map(ingre =>
                              `  <li>${ingre}</li>`
                                ).join("")}
                             </ul>
                             </div>
                             <div class="col-md-12" style="height:fit-content; margin-top:2.5vw;">
                             <hr>
                             <button align="left">Instructions: </button> 
                             <p style="margin-top:1vw;">${srchDishes[i].strInstructions}</p>
                             </div>
                             <div class="col-md-12" style="height:fit-content; margin-top:2vw;">
                             <hr>
                             <button  align="left">Watch </button> 
                             <iframe src="https://www.youtube.com/embed/${srchDishes[i].strYoutube.slice(-11)}"/>
                             </div>
                             </div>
                             </div>`;
           }
       })
    }
})

function ingredients(meal){
    window.ingredient=[];
    for (let i=1; i<=20; i++){
       if(meal[`strIngredient${i}`]){
           ingredient.push(
          `${meal[`strIngredient${i}`]} -
          ${meal[`strMeasure${i}`]}`
           )
       }
       else {
           break;
       }
    }
 }
