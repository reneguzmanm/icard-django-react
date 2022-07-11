import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { size } from 'lodash';
import { getProductsCart} from "../../api/cart";
import { useProduct } from "../../hooks"
import { Button } from 'semantic-ui-react';
import { ListProductCart } from '../../components/Client/';

export function Cart() {
    const [products, setProducts] = useState(null)
    const { getProductById } = useProduct();
    const {tableNumber} = useParams();
    const [reloadCart, setReloadCart] = useState(false);

    useEffect(() => {
      (async () =>{
          const idProductsCart = getProductsCart();
          const productsArray = [];
          for await (const idProduct of idProductsCart){
            
            const response = await getProductById(idProduct);
            productsArray.push(response);
          }
          setProducts(productsArray);
      })()
    }, [reloadCart]);

    const onReloadCart = () => setReloadCart((prev) => !prev);
    

  return (
    <div>
        Carrito
        {!products ? (
            <p>Cargando...</p>
        ): size(products) === 0 ? (
            <div style={{textAlign:"center"}}>
                <p>Tu carrito está vacío</p>
                <Link to={`/client/${tableNumber}/orders`}>
                    <Button primary >Ver pedidos</Button>
                </Link>
            </div>
        ):(
            <ListProductCart products={products} onReloadCart={onReloadCart} />
        )}
    </div>
  )
}
