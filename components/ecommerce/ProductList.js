"use client";

import React from "react";
import { Card, Rating } from "flowbite-react";
import Link from "next/link";

function ProductList({ product, pageId }) {
	return (
		<Card imgAlt={product.name} imgSrc={product.image}>
			<Link href={`/ecommerce/${pageId}/product-details/${product.slug}`}>
				<h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white p-0 my-0 cursor-pointer">
					<p>{product.name}</p>
				</h5>
			</Link>
			<div className="">
				<span className="mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800 ">
					{product.brand}
				</span>

				<Rating className="float-right">
					<Rating.Star />
					<p className="ml-1 mr-1 text-sm font-bold text-gray-900 p-0 my-0">
						{product.rating}
					</p>
					<p className="p-0 m-0">({product.numReviews})</p>
				</Rating>
			</div>
			<div className="flex items-center justify-between">
				<span className="text-xl font-bold text-gray-900 p-0 mb-3">
					${product.price}
				</span>
				<Link
					href={`/ecommerce/${pageId}/product-details/${product.slug}`}
				>
					<p className="rounded-lg cursor-pointer bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
						More Details
					</p>
				</Link>
			</div>
		</Card>
	);
}

export default ProductList;
