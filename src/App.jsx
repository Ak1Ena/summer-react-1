import "./App.css";
import ProductCard from "./components/ProductCard";
import products from "./data/product";

function App() {
	const availableCount = products.filter((p) => p.inStock).length;
	return (
		<div className="app">
			<header className="app-header">
				<h1>Tech Shop</h1>
				<p>
					{products.length} products | {availableCount} available
				</p>
			</header>
			<div className="gallery-grid">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						name={product.name}
						price={product.price}
						rating={product.rating}
						reviews={product.reviews}
						inStock={product.inStock}
						category={product.category}
						image={product.image}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
