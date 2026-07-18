import express from "express";
import type {Router,Request, Response} from "express";
export const ProductRouter :Router = express.Router()



// send a json response 
interface JSON_object {
    id :number;
    name :string;
    price :number
}
const Dev_object :JSON_object[] = [
    {id: 1, name: "Laptop",price: 1299},
    {id: 2, name: "Mouse",price: 50}
];
ProductRouter.get("/", (req :Request,res :Response) => {
    res.json(Dev_object)
})

// more specific should be on top
ProductRouter.get('/special', (req :Request,res :Response) => {
    const specialProduct = {
        name: 'FerballRektz',
        price: 50
    }
    res.json(specialProduct)
})


// Route Parameters(also is more generic bottom of specific ones)
ProductRouter.get("/:id", (req :Request,res :Response) => {
    const id :number = Number(req.params.id)
    const requestedProduct = Dev_object.find((product) => product.id === id)
    res.json(requestedProduct)
})

// this will be ommited
ProductRouter.post('/',(req :Request, res :Response) => {
    const { name, price } = req.body
    const newProduct  = {
        name,
        price
    }
    console.log(newProduct)
    res.json({message: "New Product Added",product: newProduct})
})

export default ProductRouter;
