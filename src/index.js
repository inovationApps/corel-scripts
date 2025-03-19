const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Serve the "src" folder as static files under the "/js" path
app.use('/js', express.static(path.join(process.cwd(), 'src')));

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
                <div id='corel_container'></div>
                <script src="/js/main.js"></script> <!-- Correct path -->
            </body>
        </html> 
    `);
});

app.listen(3002, () => {
    console.log('Server is running on localhost:3002');
});
