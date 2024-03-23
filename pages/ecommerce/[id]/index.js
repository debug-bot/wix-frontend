import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../../components/ecommerce/ProductList";
import { listProducts } from "../../../actions/productActions";
import AlertMessage from "../../../components/ecommerce/Alert";
import Loader from "../../../components/ecommerce/Loader";
import Footer from "../../../components/ecommerce/Footer";
import { useRouter } from "next/router";
import Header from "../../../components/ecommerce/Header";
import Hero from "../../../components/ecommerce/Hero";

function Ecommerce() {
	const router = useRouter();
	const { id } = router.query;
	const dispatch = useDispatch();
	const productsList = useSelector((state) => state.productsListReducer);
	const { error, loading, products } = productsList;

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);


	return (
		<div>
			<Header/>
			<Hero/>
			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
					<h2 className="text-2xl font-bold tracking-tight text-cyan-800 mb-8">
						LATEST PRODUCTS
					</h2>
					{loading ? (
						<h2>
							<Loader />
						</h2>
					) : error ? (
						<div>
							<AlertMessage message={error} color="warning" />
						</div>
					) : (
						<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
							{products.map((product) => (
								<ProductList
									product={product}
									key={product._id}
									pageId={id}
								/>
							))}
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Ecommerce;
