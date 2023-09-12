import express from "express";
import bodyParser from "body-parser";
export const app = express();
const port = 3000;


let products = [{id: 1, title: 'tomatto'}, {id: 2, title: 'orange'}]
const adress = [{ id: 1, value: 'Dimitrova70'}, {id: 2, value: 'Polosy20'}]
const jsonBodyMiddleware = express.json()
const parserMiddleware = bodyParser({})
app.use(jsonBodyMiddleware)
app.use(parserMiddleware)
// app.use
app.get('/products', (req, res)=>{
  if(req.query.title){
      let searchString = req.query.title.toString()
      res.send(products.filter(p => p.title.indexOf(searchString) > -1))
  }else{
  res.send(products)
  }
})
app.get('/products/:id', (req, res)=>{
  req.params.id
  let product = products.find(s => s.id === +req.params.id)
  if(product){
    res.send(product);
  } else{
    res.send(404);
  }

  
})
app.get('/adress/:id', (req, res)=>{
  req.params.id
  let street = adress.find(s => s.id === +req.params.id)
  if(street){
    res.send(street)
  } else{
    res.send(404)
  }
  
})
app.delete('/products/:id', (req, res)=>{
  for(let i = 0; i < products.length; i++){
    if(products[i].id === +req.params.id){
      products.splice(i, 1);
      res.send(204)
      return;
    }
  }
  }
)
app.post("/products", (req, res)=>{
const newProduct = {
  id: +(new Date()),
  title: req.body.title
}
products.push(newProduct)
res.status(201).send(newProduct)

})  
app.put('/products/:id', (req, res)=>{
 if(!req.body.title){
  res.send(400)
  return;
 }
  let product = products.find(s => s.id === +req.params.id)
  if(!product){
    res.send(404);
    return;
  } 
  product.title = req.body.title
  res.send(204)
  

  
})


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
