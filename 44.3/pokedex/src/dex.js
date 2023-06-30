import Pokecard from "./card";

const Pokedex = (props) => {
	let winMessage = null;
	if (props.isWinner) {
		winMessage = <p>this hand wins</p>;
	}
	return (
		<div>
			<h2> pokedex</h2>
			<div>
				{props.pokemon.map((p) => (
					<Pokecard
						id={p.id}
						name={p.name}
						type={p.type}
						exp={p.base_experience}
					/>
				))}
			</div>
			<h4>total experience: {props.exp}</h4>
			{winMessage}
		</div>
	);
};

export default Pokedex;
