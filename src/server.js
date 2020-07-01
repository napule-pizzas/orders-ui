const express = require('express');

const app = express();

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use(express.static('./dist/napule-orders-ui'));

// app.get('/*', (req, res) =>
//     res.sendFile('index.html', {root: 'dist/napule-orders-ui/'}),
// );

app.listen(process.env.PORT || 8080);
