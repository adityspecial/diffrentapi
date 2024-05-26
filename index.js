// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
import express from "express"
import bodyParser from "body-parser"
import axios from "axios"
const app = express();
const port = 3000;

;
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",async (req, res) => {
    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const drinks = response.data.drinks;
    if (drinks && drinks.length > 0) {
        const drinkName = drinks[0].strDrink;
        const ingredients = [];
      for (let i = 1; i <= 15; i++) {
        const drink = drinks[0];
        const ingredient = drink[`strIngredient${i}`]; 
        const drinkThumb = drink.strDrinkThumb;
        if (ingredient) {
          ingredients.push(ingredient);
        }
         res.render("index.ejs",{drinkName: drinkName,ingredients:ingredients,drinkThumb:drinkThumb});
      }
          
      } else {
        console.log('No drinks found');
      } 

 

  });
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });