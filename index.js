// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const PORT = 3000;



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Route to render the main page

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd'
      }
    });

    const data = response.data;

    // Render the HTML page with data
    res.render('index', { coins: data });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Route to handle form submission and fetch weather data
