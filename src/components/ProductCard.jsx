import RatingStars from "./RatingStars";
function ProductCard({
	name,
	price,
	rating,
	reviews,
	inStock,
	category,
	image,
}) {
	function handleAddToCart() {
		if (inStock) {
			alert(`Added "${name}" to cart! Price: $${price.toFixed(2)}`);
		}
	}
	return (
		<div className={`product-card${!inStock ? " unavailable" : ""}`}>
			<div className={`badge ${inStock ? "badge-green" : "badge-red"}`}>
				{inStock ? "In Stock" : "Out of Stock"}
			</div>
			<img src={image} alt={name} className="product-img" />
			<span className="category">{category}</span>
			<h3>{name}</h3>
			<RatingStars reviews={reviews} rating={rating} />
			<div className="card-footer">
				<strong className="price">${price.toFixed(2)}</strong>
				<button
					onClick={handleAddToCart}
					disabled={!inStock}
					className="add-btn"
				>
					{inStock ? "Add to Cart" : "Unavailable"}
				</button>
			</div>
		</div>
	);
}
export default ProductCard;
