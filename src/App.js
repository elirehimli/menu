import './App.css';
import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import 'antd/dist/antd.css';
import { SyncOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import { Rate } from 'antd'
function App() {
  const [recipe, setRecipe] = useState([]);
  const [filterRecipe, setFilterRecipe] = useState([]);
  const [loading,setLoading] = useState(true)
  useEffect(
      ()=>{
        axios.get("https://my-json-server.typicode.com/Resulzadeemin/foodCategories/foodCategories")
        .then((response) => { setRecipe(response.data);setFilterRecipe(response.data);setLoading(false) })
        .catch(error => {alert("connect problem..")})
      },
      []
  )
    function filterRecipes(cat){
        const result = recipe.filter(
            (a)=> {return a.category === cat}
        )
        setFilterRecipe(result)
    } 
    
    let catDessert = "";
    let catFish  = "";
    let catMeat  = "";
    let catChicken  = "";
    let allRecipe = "";

    for(let i=0; i < recipe.length; i++) {
      if(recipe[i].category === 'dessert') { catDessert ++ }
      if(recipe[i].category === 'fish') { catFish ++ }
      if(recipe[i].category === 'meat') { catMeat ++}
      if(recipe[i].category === 'chicken') { catChicken ++}
      if(recipe[i]){ allRecipe ++}
    }

  return (
    <div className="App">
      <div>
      <div className="container">
        <div className="recipes-title">
          <h2>Categories</h2>
          <div className="recipes-display">
            <div className="recipes">
              <p onClick={()=>filterRecipes("dessert")}>Dessert ........... {loading ? <><SyncOutlined spin /></> : catDessert}</p>
              <p onClick={()=>filterRecipes("fish")}>Fish ........... {loading ? <><SyncOutlined spin /></> : catFish}</p>
              <p onClick={()=>filterRecipes("meat")}>Meat ........... {loading ? <><SyncOutlined spin /></> : catMeat}</p>
              <p onClick={()=>filterRecipes("chicken")}>Chicken ........... {loading ? <><SyncOutlined spin /></> : catChicken}</p>
              <p onClick={()=>setFilterRecipe(recipe)}>AllRecipe ........... {loading ? <><SyncOutlined spin /></> : allRecipe}</p>
            </div>
            <div className="recipes-products">
              {
                  filterRecipe.map(
                      (e)=>{return <div key={e.id}>
                        <img src={e.url} />
                        <h3>{e.name}</h3>
                        <div className="recipes-rate">
                          <Rate defaultValue={3} />
                        </div>
                      </div>}
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
