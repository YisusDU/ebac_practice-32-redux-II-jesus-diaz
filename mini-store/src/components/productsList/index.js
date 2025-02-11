import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreContainer, ProductsArray, Product, LoadingOrError } from './styles.js';
import { addProduct, fetchProducts } from '../../state/products.slice';
import { FAILED, IDLE, LOADING, SUCCEDED } from '../../state/status';


const ProductsList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.cart.stock);
    const status = useSelector((state) => state.cart.status);


    //usamos useEffect para manejar la asincronicidad
    useEffect(() => {
        status === IDLE && dispatch(fetchProducts())
    }, [dispatch, status])


    /*
    if (isLoading)
        return (
            <LoadingOrError>
                <h2>Loading...................... 🥱</h2>
            </LoadingOrError>
        );
    if (error)
        return (
            <LoadingOrError>
                <h2>There was an error loading the products. 😖</h2>
            </LoadingOrError>
        );
    */
    // Manejar la acción de agregar al carrito
    const handleAddToCart = (product) => {
        dispatch(addProduct({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image
        }));
    };

    return (
        <StoreContainer>
            <ProductsArray>
                {
                    (products && status === SUCCEDED) && products.map(product => (
                        <Product key={product.id}>
                            <img src={product.image} alt={product.name} />
                            <figcaption>{product.title}</figcaption>
                            <p>${product.price}</p>
                            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </Product>
                    ))
                }
                {
                    status === LOADING &&
                    <LoadingOrError>
                        <h2>Loading...................... 🥱</h2>
                    </LoadingOrError>
                }
                {
                    status === FAILED &&
                    <LoadingOrError>
                        <h2>There was an error loading the products. 😖</h2>
                    </LoadingOrError>
                }

            </ProductsArray>
        </StoreContainer>


    );
};

export default ProductsList;