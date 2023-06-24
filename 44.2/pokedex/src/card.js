const base =
	"https://raw.githubusercontent.com/" +
	"PokeAPI/sprites/master/sprites/pokemon/";

const Pokecard = (props) => {
	let imgSrc = `${base}${props.id}.png`;
	return (
		<div key={props.id}>
			<h4>{props.name}</h4>
			<img src={imgSrc} />
			<p>{props.type}</p>
			<p>{props.exp}</p>
		</div>
	);
};

export default Pokecard;
