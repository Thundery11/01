"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const products = [{ id: 1, title: 'tomatto' }, { id: 1, title: 'orange' }];
const adress = [{ id: 1, value: 'Dimitrova70' }, { id: 2, value: 'Polosy20' }];
app.get('/products', (req, res) => {
    res.send(products);
});
app.get('/products/:id', (req, res) => {
    req.params.id;
    let product = products.find(s => s.id === +req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
app.get('/adress/:id', (req, res) => {
    req.params.id;
    let street = adress.find(s => s.id === +req.params.id);
    if (street) {
        res.send(street);
    }
    else {
        res.send(404);
    }
});
// app.get('/adress/leninsky', (req, res)=>{
//   let street = adress.find(s => s.value === 'Polosy 20')
//   res.send(street)
// })
// app.get("/courses", (req, res) => {
//     res.json([
//       {id: 1, title: 'front'},
//       {id: 2, title: 'Back'},
//       {id: 3, title: 'devOps'},
//       {id: 3, title: 'qa'},
//     ]);
// });
// app.get("/courses/:id", (req, res) => {
//   res.json([
//     {id: 1, title: 'front'},
//     {id: 2, title: 'Back'},
//     {id: 3, title: 'devOps'},
//     {id: 3, title: 'qa'},
//   ].find(c => c.id === +req.params.id));
// });
// app.get("/samurais", (req, res) => {
//   res.send("Hello samsdsdei!");
// });
// app.post("/samurais", (req, res) => {
//   res.send("We hav created samurais!!!!@!@!");
// });
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
