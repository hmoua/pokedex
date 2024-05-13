import React, {useReducer} from "react";
import axios from "axios";
import Button from "./Button";
import Textbox from "./Textbox";
import "./stylesheet.css";
import Type_Bug from "./assets/images/Type_Bug.gif";
import Type_Dark from "./assets/images/Type_Dark.gif";
import Type_Dragon from "./assets/images/Type_Dragon.gif";
import Type_Electric from "./assets/images/Type_Electric.gif";
import Type_Fairy from "./assets/images/Type_Fairy.gif";
import Type_Fighting from "./assets/images/Type_Fighting.gif";
import Type_Fire from "./assets/images/Type_Fire.gif";
import Type_Flying from "./assets/images/Type_Flying.gif";
import Type_Ghost from "./assets/images/Type_Ghost.gif";
import Type_Grass from "./assets/images/Type_Grass.gif";
import Type_Ground from "./assets/images/Type_Ground.gif";
import Type_Ice from "./assets/images/Type_Ice.gif";
import Type_Normal from "./assets/images/Type_Normal.gif";
import Type_Poison from "./assets/images/Type_Poison.gif";
import Type_Psychic from "./assets/images/Type_Psychic.gif";
import Type_Rock from "./assets/images/Type_Rock.gif";
import Type_Steel from "./assets/images/Type_Steel.gif";
import Type_Water from "./assets/images/Type_Water.gif";

function Pokedex() {
	const initialState = {
		pokemonUrl: "",
		speciesUrl: "",
		loading: false,
		pokemon: 0,
		name: "",
		height: 0,
		weight: 0,
		sprite: [],
		spriteLabel: [],
		form: [],
		formLabel: [],
		type: [],
		ability: [],
		stat: [],
		evolution: []
	};

	function reducer(state, action) {
		switch (action.type) {
			case "AXIOS_SUCCESS":
			return {
				loading: false,
				name: action.pokemonPayload.data.name,
				height: action.pokemonPayload.data.height,
				weight: action.pokemonPayload.data.weight,
				sprite: [],
				spriteLabel: action.pokemonPayload.data.sprites,
				form: [],
				formLabel: [],
				type: action.pokemonPayload.data.types,
				ability: action.pokemonPayload.data.abilities,
				stat: action.pokemonPayload.data.stats,
				evolution: [action.evolutionPayload.data.chain.species.name, action.evolutionPayload.data.chain.evolves_to]
			};
			case "AXIOS_ERROR":
			return {
				pokemonUrl: "",
				speciesUrl: "",
				loading: false,
				pokemon: 0,
				name: "",
				height: 0,
				weight: 0,
				type: [],
				ability: [],
				stat: [],
				sprite: [],
				evolution: [],
				spriteLabel: [],
				formLabel: []
			}
		}
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	function getUrl() {
		state.pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${state.pokemon}`
		state.speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${state.pokemon}`
		axios.all([axios.get(state.pokemonUrl), axios.get(state.speciesUrl)])
		.then(
			axios.spread((pokemonRes, speciesRes) => {
				axios.get(speciesRes.data.evolution_chain.url).then((evolutionRes) => {
					dispatch({type: "AXIOS_SUCCESS", pokemonPayload: pokemonRes, evolutionPayload: evolutionRes})
				})
			})
		)
		.catch(() => {
			dispatch({type: "AXIOS_ERROR"})
		})
	}

	function randomNumber() {
		state.pokemon = Math.floor(Math.random() * 898) + 1
		getUrl()
	}

	function userInput() {
		state.pokemon = document.getElementById("textbox").value.trim().toLowerCase()
		getUrl()
	}

	// Return statements
	if (state.loading) return <h1>Loading...</h1>;
	return (
		<div id="Pokedex">
			<header>
				<h1>Pok&eacute;dex</h1>
				<Button randomNumber={randomNumber}/>
				<Textbox userInput={userInput}/>
			</header>
			<div id="sprites">
				<article>
					{
						(state.spriteLabel.length === 0 && state.formLabel.length === 0)
						? <h3>Pok&eacute;mon</h3>
						: Object.entries(state.spriteLabel).map(([s, i]) => {
							if (typeof(i) === "string") return <label key={ s }>{s.replaceAll("_", " ")}<img src={i} alt=""/></label>
						})
					}
					{state.formLabel.map((f, i) => {
						return <label key={f}>{f}<img src={state.form[i]} alt=""/></label>;
					})}
				</article>
			</div>

			<div id="data">
				<h2>{state.name}</h2>
				<section id="height">
					<h3>Height</h3>
					{
						(state.height === 0)
						? <ul><li>N/A</li></ul>
						: <ul><li>{state.height} m</li></ul>
					}
				</section>
				<section id="weight">
					<h3>Weight</h3>
					{
						(state.weight === 0)
						? <ul><li>N/A</li></ul>
						: <ul><li>{state.weight} lbs.</li></ul>
					}
				</section>
				<section id="type">
					<h3>Type</h3>
					<ul>
						{
							(state.type.length === 0)
							? <li>N/A</li>
							: Object.keys(state.type).map(t => {
									let type = state.type[t]["type"]["name"];
									let typeDict = {
										"bug": Type_Bug,
										"dark": Type_Dark,
										"dragon": Type_Dragon,
										"electric": Type_Electric,
										"fairy": Type_Fairy,
										"fighting": Type_Fighting,
										"fire": Type_Fire,
										"flying": Type_Flying,
										"ghost": Type_Ghost,
										"grass": Type_Grass,
										"ground": Type_Ground,
										"ice": Type_Ice,
										"normal": Type_Normal,
										"poison": Type_Poison,
										"psychic": Type_Psychic,
										"rock": Type_Rock,
										"steel": Type_Steel,
										"water": Type_Water
									}
									return <img key={type} src={typeDict[type]} alt=""/>
								})
						}
					</ul>
				</section>
				<section id="ability">
					<h3>Ability</h3>
					<ul>
						{
							(state.ability.length === 0)
							? <li style={{"list-style-type": "none"}}>N/A</li>
							: Object.keys(state.ability).map(a => {
									const name = state.ability[a]["ability"]["name"]
									const url = state.ability[a]["ability"]["url"]
									return <li key={name}>{name}</li>;
								})
						}
					</ul>
				</section>
				<section id="stats">
					<h3>Stats</h3>
					<ul>
					{
						(state.stat.length === 0)
						? <li>N/A</li>
						: Object.keys(state.stat).map(s => {
								const base_stat = state.stat[s]["base_stat"];
								const name = state.stat[s]["stat"]["name"];
								return <li key={name}>{name}: {base_stat}</li>
							})
					}
					</ul>
				</section>
				<section id="evolution">
					<h3>Evolution</h3>
						{
							(state.evolution.length === 0)
							? <ul><li>N/A</li></ul>
							: <ol>
								<li>{state.evolution[0]}</li>
								{
									(function checkEvolution(evolves_to) {
										let names = [];
										for (let obj of evolves_to) {
											const name = obj["species"]["name"];
											names.push(<li key={name}>{name}</li>);
											if (obj["evolves_to"].length > 0) {
												names.push(checkEvolution(obj["evolves_to"]));
											}
										}
										return names;
									})(state.evolution[1])
								}</ol>
						}
				</section>
			</div>
		</div>
	)
}
export default Pokedex;
