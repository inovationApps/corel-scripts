const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Serve the "src" folder as static files under the "/js" path
app.use('/js', express.static(path.join(process.cwd(), 'build')));

// Serve the "styles" folder as static files under the "/css" path
app.use('/css', express.static(path.join(process.cwd(), 'src', 'styles')));

// Route to send the HTML page that loads the JS file
app.get('/main', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Run JS from Server</title>
                <link rel="stylesheet" href="/css/shelf_styles.css">
            </head>
            <body>
                <h1>JavaScript from Server</h1>
                <div id='corel_container' data-skuId='489a8bef-d8f2-4af5-ac29-5fd24249c928' data-itemsFetched='20' data-imgSize='250-250' data-itemsPerPage='4' data-margin='10'></div>
                <script src="/js/bundle.js"></script> <!-- Correct path -->
            </body>
        </html> 
    `);
});

app.listen(3002, () => {
    console.log('Server is running on localhost:3002');
});
