import React, { Component } from 'react';
import { FaPlus } from "react-icons/fa";
import api from '../../services/api';

import './styles.css';

export default class Home extends Component {

    state = {
        pokemons: [],
        offset: 0
    };

    componentDidMount() {
        this.loadPokemons();
    };

    loadPokemons = async () => {
        var offset = this.state.offset;

        const response = await api.get(`/pokemon/?offset=${offset}&limit=40`);
        const { results } = response.data;

        results.map(pokemon => {
            this.pokemonInfo(pokemon.url);
            return 0;
        });

        offset += 40

        this.setState({
            offset
        });
    };

    pokemonInfo = async (url) => {
        const id = url.split("https://pokeapi.co/api/v2/pokemon/");
        const response = await api.get(`/pokemon/${id[1]}`);
        const pokemons = this.state.pokemons;

        pokemons.push(response.data);

        this.setState({
            pokemons
        });
    };

    search = (event) => {
        var search = document.getElementById('inputSearch').value;
        if (event.key === 'Enter') {
            window.location = `/search/name/${search}`;
        }
    };

    render() {

        const { pokemons } = this.state;

        return (
            <div id="home">
                <div id="home-content">
                    <h1>Pokemons</h1>

                    <div id="search">
                        <input onKeyPress={this.search} type="text" id="inputSearch" placeholder="Search" />
                    </div>

                    {pokemons.map(pokemon => (
                        <div className="pokemon" key={pokemon.name}>
                            <img alt={pokemon.name} src={pokemon.sprites.front_default} />
                            
                            <div className="base-xp">
                                <span>{pokemon.base_experience}</span>
                            </div>

                            <div className="pokemonInfo">
                                <h2>{pokemon.name}</h2>

                                <div className="item-Info">
                                    <p className="pokeForm">Height: <span>{pokemon.height}</span> | Weight: <span>{pokemon.weight}</span></p> 
                                </div>

                                <div className="item-Info">
                                    <p>Types: </p>
                                    {pokemon.types.map(types => (
                                        <span key={types.type.name}>{types.type.name}.</span>
                                    ))}
                                </div>

                                <div className="item-Info">
                                    <p>Abilities: </p>
                                    {pokemon.abilities.map(abilities => (
                                        <span key={abilities.ability.name}>{abilities.ability.name}.</span>
                                    ))}
                                </div>

                                <div className="item-Info">
                                    <p>Stats: </p>
                                    {pokemon.stats.map(stats => (
                                        <span key={stats.stat.name}>{stats.stat.name}.</span>
                                    ))}
                                </div>

                            </div>
                        </div>
                    ))}

                    <div id="loadMore">
                        <button onClick={this.loadPokemons}><FaPlus size={20} /></button>
                    </div>

                </div>
            </div>
        );
    }
}