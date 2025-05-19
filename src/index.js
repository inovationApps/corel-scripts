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
                <div id='corel_container' data-skuId='913' data-itemsFetched='20' data-imgSize='250-250' data-itemsPerPage='4' data-margin='10'></div>
                <script src="/js/bundle.js" 
                data-token0="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjYwYzAyZDM5LTkzYmEtNDU0Zi04ODEyLWMwNTNiNTk4Mjc1ZiIsIm5iZiI6MTc0MjkzMDEwNiwiZXhwIjoyNTM0MDIzMDA4MDAsImlhdCI6MTc0MjkzMDEwNn0.aJ61QUC31iwrVChLqN9se1P75fx1eQjMfJx_V7lH1Q4"
                data-token1="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImM0YzMyODM3LWEzNzUtNDg3Ni04NjI2LTkyYjhkMzRkMjA1OSIsIm5iZiI6MTc0Njc5ODg1MSwiZXhwIjoyNTM0MDIzMDA4MDAsImlhdCI6MTc0Njc5ODg1MX0.nRaRZY_0Dw8awAcNEHuA3Y_mBNukagm6My4NZekUU7U"
                data-version="b"
                ></script> <!-- Correct path -->
            </body>
        </html> 
    `);
});

app.listen(3002, () => {
    console.log('Server is running on http://localhost:3002');
});
