import './App.css';
import './index.css';
import App from './App';
import Server from './Server';
import Customer from './Customer';
import ReactDOM from 'react-dom/client';
import Manager from "./Manager";
import React, { useState, useEffect } from 'react';
import { Button, Select, Input } from 'antd';

//TO DELETE ITEM: DELETE FROM menutable WHERE name like 'SI:%';
// psql -h csce-315-db.engr.tamu.edu -U <username> -d <database>
// Username = csce315_[section no.]_[last name in lowercase]
// Multiple last names: Del Potro becomes del_potro 
// Database = csce315_[section no.]_[team number]
// Password: first name


function Add_Seasonal_Menu_Item() {

  var itemArr;
  var newItem;
  var listOfItems;
  var newItemIngredientList = "";


  const [data, setdata] = useState({
    QueryResult: "n/a"
  });
//https://cfa-flask.herokuapp.com/data/itemtable
  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    fetch("https://cfa-flask.herokuapp.com/data/itemtable").then((res) =>
        res.json().then((data) => {
            // Setting a data from api
            setdata({
                QueryResult: data.QueryResult
            });
        })
    );
}, []);
itemArr = data.QueryResult;
newItem = [];
for (var i = 0; i < itemArr.length; i++){
  newItem.push(itemArr[i].replaceAll("'", "").replaceAll("(", "").replaceAll(")", "").trim().split(','));
}
listOfItems = [];
for (var i = 0; i < newItem.length; i++){
  listOfItems.push(
    {"Name":newItem[i][0],
    "Type":newItem[i][1],
    "Cost":newItem[i][2],
    "Quantity":newItem[i][3],
    "Reorder_Threshold":newItem[i][4]
  }
  )
}

  function handleChange() {

  }

  function submitNewMenuItem(){
    var queryToRun = "INSERT INTO menutable (name, composition, cost) VALUES ('SI: " + newMenuItemName + "', '" + inputItems + "', '$" + newMenuItemPrice + "')";
    fetch("https://cfa-flask.herokuapp.com/resutl/" + queryToRun);

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <Manager />
      </React.StrictMode>
    );
  }

  

  

  const [first, setFirst] = useState(true);


  function addMenuItemIngredient(){
    if (first){
      setFirst(false);
      setInputItems(inputItems + dropdownInput);
    } else {
      setInputItems(inputItems + "|" + dropdownInput);
    }

  }
  function addMenuItemNewIngredient(){
    if (first){
      setFirst(false);
      setInputItems(inputItems + newItemInput);
    } else {
      setInputItems(inputItems + "|" + newItemInput);
    }

    var queryToRun = "INSERT INTO itemtable (name, type, cost, quantity, reorder_threshold) VALUES ('" + newItemInput + "', 'Ingredient', '$0.10', '0', '0')";
    fetch("https://cfa-flask.herokuapp.com/result/" + queryToRun);
  }

  const [selected, setSelected] = useState('Chicken Sandwich');

  const [inputItems, setInputItems] = useState('');

  const [testVal, setTest] = useState(0);

  const [dropdownInput, setDropdownInput] = useState('American Cheese');

  const [newItemInput, setNewItemInput] = useState('');

  const [newMenuItemName, setNewMenuItemName] = useState('');

  const [newMenuItemPrice, setNewMenuItemPrice] = useState('');

  const handleNewMenuItemName = event => {
    setNewMenuItemName(event.target.value);
  }

  const handleNewMenuItemPrice = event => {
    setNewMenuItemPrice(event.target.value);
  }

  const handleNewDropdownSelection = (event) => {
    setDropdownInput(event);
  }

  const handleNewItemInput = event => {
    setNewItemInput(event.target.value);
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
          <div className="flex-container">
            <div class="pageHeader">Add Seasonal Item</div>
          </div>
        </header>

        <div>
          <table className="margin-from-left">
            <tr>
              <td>New Menu Item Name:</td>
              <td><Input className="inputs-large" type="text" value={newMenuItemName} onChange={handleNewMenuItemName}/></td>
            </tr>

            <tr>
              <td>New Menu Item Price:</td>
              <td><Input className="inputs-large" type="text" value={newMenuItemPrice} onChange={handleNewMenuItemPrice}/></td>
            </tr>

            <tr>
              <td>
                <Select value={dropdownInput} onChange={handleNewDropdownSelection}>
                  {listOfItems.map((option) => (
                  <option value={option.Name}>{option.Name}</option>
                  ))}
                </Select>
              </td>

              <td/>

              <td>
                <Button type="primary" onClick={addMenuItemIngredient}>Add Ingredient</Button>
              </td>
            </tr>

            <tr>
              <td>
                <Input className="inputs-large" type="text" value={newItemInput} onChange={handleNewItemInput}/>
              </td>

              <td/>

              <td>
                <Button type="primary" onClick={addMenuItemNewIngredient}>Add New Ingredient</Button>
              </td>
            </tr>
          </table>
          
          <table className="margin-from-left">
            <tr>
              <td>Menu Item Contents:</td>
              <td>{inputItems}</td>
            </tr>
          </table>
      </div>

      
      <div class="footerdiv">
        <Button class="returnButton" onClick={ReturnToManager}>Return</Button>
        <Button type="primary" onClick={submitNewMenuItem}>Submit Seasonal Item</Button>
      </div>
      </div>      
    );
  }
  
export default Add_Seasonal_Menu_Item;