// //get requirements
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');
// const mongoose = require('mongoose');
// const shortUrl = require('./models/shortUrl')
// app.use(bodyParser.json());
// app.use(cors());  

// // connect to database 
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortUrls');



// // allows node to find static public files
// app.use(express.static(__dirname + '/public'))

// // creates the database entry
// app.get('/new/:urlToShorten', (req, res, next) => {
//        // es5 var urlToShorten = req.params.urlToShorten
//     var { urlToShorten } = req.params;
//         // console.log(urlToShorten);

//         //regex for url 
// let expression = /[-a-zA-Z0-9@:%._\.~#?g//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

// let regex = expression;

// if(regex.test(urlToShorten) === true) {
//     let short = Math.floor(Math.random() * 1000000).toString();

//     const data = new shortUrl({
//         originalUrl: urlToShorten,
//         shorterUrl: short
        
//     });

    
//     data.save((err, data) => {
//         if(err) {
//             return res.send('Error saving to database');
//         }
//         // console.log(data);
//     });
    
//     // console.log('valid url');  
//     //return res.json({urlToShorten});  
//     return res.json(data);  
// }

// const data = new shortUrl({
//     originalUrl: urlToShorten,
//     shorterUrl: 'invalid'
// })
//    //return res.json({urlToShorten : 'failed'})
//    return res.json({data})

    
// });

// //query database and fwd to originalURL
// app.get('/:urlToForward', (req, res, next) => {
//     //stores the value of param
//     let shorterUrl = req.params.urlToForward;

//     shortUrl.findOne({'shorterUrl': shorterUrl}, (err, data) => {
//         if(err) {
//             return res.send('Error reading the database');
//         }
        
//         let re = new RegEsp("^(http[https)://", "i");
//         let strToCheck = data.originalUrl;
//         if(re.test(strToCheck)){
//             res.redirect(201, data.originalUrl);
//         } else {
//             res.redirect(301, 'http://' +  data.originalUrl);
//         }
//     })
// })














// // listen to port verify everything is working
// app.listen(3000, () => {
//     console.log('this is working');
// })   

// //using heroku
// // app.listen(process.env.PORT || 3000, () => {}
// // );

// get requirements
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const shortUrl = require('./models/shortUrl');

// // middleware
// app.use(bodyParser.json());
// app.use(cors());  
// app.use(express.static(__dirname + '/public'));

// // connect to database 
//  mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://rmurphy:HumblePie!3@cluster0.pbswn.mongodb.net/?appName=Cluster0", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });


// // const { MongoClient, ServerApiVersion } = require('mongodb');
// // const uri = "mongodb+srv://rmurphy:HumblePie!3@cluster0.pbswn.mongodb.net/?appName=Cluster0";
// // // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// // const client = new MongoClient(uri, {
// //   serverApi: {
// //     version: ServerApiVersion.v1,
// //     strict: true,
// //     deprecationErrors: true,
// //   }
// // });
// // async function run() {
// //   try {
// //     // Connect the client to the server	(optional starting in v4.7)
// //     await client.connect();
// //     // Send a ping to confirm a successful connection
// //     await client.db("admin").command({ ping: 1 });
// //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
// //   } finally {
// //     // Ensures that the client will close when you finish/error
// //     await client.close();
// //   }
// // }
// // run().catch(console.dir);






// // Create the database entry
// app.get('/new/:urlToShorten', async (req, res) => {
//     let { urlToShorten } = req.params;

//     // regex for URL validation
//     let regex = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

//     if (regex.test(urlToShorten)) {
//         let short = Math.floor(Math.random() * 1000000).toString();

//         const data = new shortUrl({
//             originalUrl: urlToShorten,
//             shorterUrl: short
//         });

//         try {
//             const savedData = await data.save();
//             return res.json(savedData);
//         } catch (err) {
//             console.error(err);
//             return res.status(500).send('Error saving to database');
//         }
//     }

//     return res.json({ error: 'Invalid URL format' });
// });

// // Query database and forward to original URL
// app.get('/:urlToForward', async (req, res) => {
//     let shorterUrl = req.params.urlToForward;

//     try {
//         const data = await shortUrl.findOne({ shorterUrl });

//         if (!data) return res.status(404).send('No URL found');

//         let original = data.originalUrl;
//         let regex = /^https?:\/\//i;

//         if (regex.test(original)) {
//             return res.redirect(301, original);
//         } else {
//             return res.redirect(301, 'http://' + original);
//         }

//     } catch (err) {
//         console.error(err);
//         return res.status(500).send('Database query error');
//     }
// });

// // Listen on port
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Mongoose schema
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  original_url: String,
  short_url: Number
});

const Url = mongoose.model('Url', urlSchema);

// Root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// In-memory counter (You could also replace this with a DB auto-increment or a nanoid generator)
let counter = 1;

// POST endpoint to shorten URL
app.post('/api/shorturl', async (req, res) => {
  const url = req.body.url;

  // Basic validation
  const urlRegex = /^https?:\/\/(.*)/;

  if (!urlRegex.test(url)) {
    return res.json({ error: 'invalid url' });
  }

  try {
    // Check if URL already exists
    let existing = await Url.findOne({ original_url: url });
    if (existing) {
      return res.json({
        original_url: existing.original_url,
        short_url: existing.short_url
      });
    }

    // Create and save new URL
    const newUrl = new Url({
      original_url: url,
      short_url: counter++
    });

    const saved = await newUrl.save();
    res.json({
      original_url: saved.original_url,
      short_url: saved.short_url
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// GET endpoint to redirect
app.get('/api/shorturl/:short_url', async (req, res) => {
  const shortUrl = parseInt(req.params.short_url);

  try {
    const found = await Url.findOne({ short_url: shortUrl });
    if (!found) {
      return res.json({ error: 'No short URL found for the given input' });
    }

    res.redirect(found.original_url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});