import './App.css';
import './index.css';
import React, { useState, useEffect } from 'react';
import App from './App';
import Server from './Server';
import Customer from './Customer';
import ReactDOM from 'react-dom/client';
import Manager from "./Manager";
import { Button, Select, Form, Input } from 'antd';

function Excess_Report() {
  var itemArr;
  var newItem;
  var isData = false

  
  const [data, setdata] = useState({
    QueryResult: ""
  });
  const [menu_ingredients, set_menu_ingredients] = useState({
    QueryResult: ""
  });

  const [ingredients_onhand, set_ingredients_onhand] = useState({
    QueryResult: ""
  });

  const [date, setPrice] = useState('');

  const handlePrice = event => {
    setPrice(event.target.value);
    get_ingredients();
  };


  useEffect(() => {
    
    var queryString2 = "https://cfa-flask.herokuapp.com/data/menutable"
    fetch(queryString2).then((res) =>
    res.json().then((menu_ingredients) => {
        // Setting a data from api
        set_menu_ingredients({
            QueryResult: menu_ingredients.QueryResult
        }); 
       
    })
    );
    
}, []);

  function get_ingredients(){
    var queryString3 = "https://cfa-flask.herokuapp.com/data/itemtable"
      fetch(queryString3).then((res) =>
      res.json().then((ingredients_onhand) => {
          // Setting a data from api
          set_ingredients_onhand({
              QueryResult: ingredients_onhand.QueryResult
          }); 
          
      })
      );
  }
  function getData(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var todayDate = yyyy + '-' + mm + '-' + dd;

    var queryString = "https://cfa-flask.herokuapp.com/data/SELECT * FROM ordertable WHERE time BETWEEN '" + date + "' AND '" + todayDate +"'"
    fetch(queryString).then((res) =>
    res.json().then((data) => {
        // Setting a data from api
        setdata({
            QueryResult: data.QueryResult
        }); 
        console.log(data.QueryResult)
    })
    );

  }
  
 
  itemArr = data.QueryResult;
  newItem = [];
  for (var i = 0; i < itemArr.length; i++){
    newItem.push(itemArr[i].replaceAll("'", "").replaceAll("(", "").replaceAll(")", "").trim().split(','));
  }
  var mapOfItems = {}
  for (var i = 0; i < newItem.length; i++){
    newItem[i][1] = newItem[i][1].split('|')
    for (var j = 0; j < newItem[i][1].length; ++j){
      newItem[i][1][j] = newItem[i][1][j].trim()
      if ( newItem[i][1][j] in mapOfItems){
        mapOfItems[newItem[i][1][j]] += 1
      }
      else{
        mapOfItems[newItem[i][1][j]] = 1
      }
      
    }      
  }


  var menu_ingredients_arr = menu_ingredients.QueryResult
  var new_menu_arr = []
  for (var i = 0; i < menu_ingredients_arr.length; i++){
    new_menu_arr.push(menu_ingredients_arr[i].replaceAll("'", "").replaceAll("(", "").replaceAll(")", "").trim().split(','));
  }
  
  var menu_composition = {}
  for( var i = 0; i < new_menu_arr.length; ++i){
    new_menu_arr[i][1]  = new_menu_arr[i][1].split('|')
    menu_composition[new_menu_arr[i][0]] = new_menu_arr[i][1]
  }
  var total_items_used = {}
  console.log(mapOfItems)
  for (var menu_item_used in mapOfItems){
    if (menu_item_used in menu_composition){
      for (var i = 0; i < menu_composition[menu_item_used].length; ++i){
        console.log(parseInt(mapOfItems[menu_item_used]))
        if (menu_composition[menu_item_used][i].trim() in total_items_used){
          total_items_used[menu_composition[menu_item_used][i].trim()] += parseInt(mapOfItems[menu_item_used]);
        }
        else{
          total_items_used[menu_composition[menu_item_used][i].trim()] = parseInt(mapOfItems[menu_item_used])
        }
      }
    }
    else{
      console.log(menu_item_used)
    }

  }
  console.log(total_items_used)
  var ingredients = ingredients_onhand.QueryResult

  var ingredient_map = {}
  for (var i = 0; i < ingredients.length; i++){
    try{
      ingredients[i] = ingredients[i].replaceAll("'", "").replaceAll("(", "").replaceAll(")", "").trim().split(',');
    }
    catch (TypeError){
    
    }
    
  }
  
  for (var i = 0; i < ingredients.length; ++i){
    ingredient_map[ingredients[i][0].trim()] = ingredients[i][3]
  }

  var itemList = []

  for (var key in ingredient_map){
    

    if ( !(key in total_items_used)){
      total_items_used[key] = 0
    }
    if (total_items_used[key] * 10  < ingredient_map[key]){
      
      itemList.push(
        {
        "Name" : key,
        "Used" : total_items_used[key],
        "On Hand" : ingredient_map[key]
        }
      )
    }
  }
  
  
  function ReturnToManager() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Manager />
      </React.StrictMode>
    );
  }
 
  return (
    
    <div id='body'>
      <div class="headerdiv">
        Chick-fil-A!
      </div>
      <header className="SelectRole">
        <div class="flex-container">
          <div class="pageHeader">Excess Report</div>
        </div>
      </header>
      <div className="scrollTab">
      <p>The following items have an excess:</p>
      <table cellpadding="2"cellspacing="15">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity Sold</th>
              <th>Quantity on Hand</th>
            </tr>
          </thead>
          <tbody>
            {itemList.map((item) => {
              return (
                <tr key={item.Name}>
                  <td>{item.Name}</td>
                  <td>{item.Used}</td>
                  <td>{item["On Hand"]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        <div>

      </div>
      <Form className="form">
        <label>Date (yyyy-mm-dd):
          <Input className="inputs" type="text"
          value = {date}
          onChange={handlePrice}/>
        </label>
        </Form>
      
      <div class="footerdiv">
        <Button class="returnButton" onClick={ReturnToManager}>Return</Button>
        <Button type="primary" onClick={getData}>Submit</Button>
      </div>
   
    </div>
    




  );
}

export default Excess_Report;