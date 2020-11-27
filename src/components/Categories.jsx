import React, {useCallback} from "react";
import '../index.css';

function Categories({ parentProducts, filteredProducts, filterProducts }) {

    const CategoriesRow = (props) => (
        <tr>
            <td onClick={()=>getCategoryProducts(props.product.productCategory)}>{props.product.productCategory}</td>
        </tr>
    );

    function getCategoryProducts(productCategory){
        let products = [];

        for (let item of parentProducts) {
            if(item.productCategory === productCategory) {
                products.push(item)
            }
        }

        filterOutProducts(products);
    }

    const productCategories = Array.from(new Set(parentProducts.map(product => product.productCategory)))
        .map(productCategory => {
            return parentProducts.find(product => product.productCategory === productCategory)
        })

    const filterOutProducts = useCallback((products) => {
        filterProducts(products);
    }, []);

    return (
        <>
            <table className="table table-bordered" id="categories">
                <thead>
                <tr>
                    <th>
                        Categories
                        {filteredProducts.length !== 0 &&
                            <button onClick={() => filterOutProducts([])} type="button" className="btn btn-warning btn-sm">Reset
                                Categories
                            </button>
                        }
                    </th>
                </tr>
                </thead>
                <tbody>
                {productCategories.map(product =>
                    <CategoriesRow product={product} key={product.productId} />
                )}
                </tbody>
            </table>
        </>
    )
}

export default Categories;
