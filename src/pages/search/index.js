import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';

export default class Search extends Component {

    state = {
        pokemon: [],
        sprites: [],
        types: [],
        abilities: [],
        stats: [],
    };

    componentDidMount() {
        const { search } = this.props.match.params;
        this.searchPokemon(search);
    };

    searchPokemon = async (search) => {
        const response = await api.get(`/pokemon/${search}`);

        this.setState({
            pokemon: response.data,
            sprites: response.data.sprites,
            types: response.data.types,
            abilities: response.data.abilities,
            stats: response.data.stats,

        });
    };

    search = (event) => {
        var search = document.getElementById('inputSearch').value;
        if (event.key === 'Enter') {
            window.location = `/search/name/${search}`;
        }
    };

    render() {

        const { pokemon, sprites, types, abilities, stats} = this.state;     

        return (
            <div id="searchPage">
                <div id="search-content">
                    <h1>Pesquisa por: '{this.props.match.params.search}'</h1>

                    <div id="search">
                        <input onKeyPress={this.search} type="text" id="inputSearch" placeholder="Search" />
                    </div>

                    <div className={(pokemon.length === 0) ? 'pokemon, hide' : 'pokemon'}>
                        <img alt={pokemon.name} src={sprites.front_default} />
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
                                {types.map(types => (
                                    <span key={types.type.name}>{types.type.name}.</span>
                                ))}
                            </div>

                            <div className="item-Info">
                                <p>Abilities: </p>
                                {abilities.map(abilities => (
                                    <span key={abilities.ability.name}>{abilities.ability.name}.</span>
                                ))}
                            </div>

                            <div className="item-Info">
                                <p>Stats: </p>
                                {stats.map(stats => (
                                    <span key={stats.stat.name}>{stats.stat.name}.</span>
                                ))}
                            </div>

                        </div>
                    </div>

                    <p className={(pokemon.length !== 0) ? 'hide' : ''}>Nenhum dado encontrado! </p>


                </div>
            </div>
        );
    }
}