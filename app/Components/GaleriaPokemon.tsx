import axios from 'axios';
import React, { useEffect, useState } from 'react';




const GaleriaPokemon= () => {
    type Pokemon = {
        name : string;
        id: number;
        sprites: { 
            front_default: string; 
                    };
            types: string[]; };

            const [pokemons, setPokemons] = useState<Pokemon[]>([]);

            const axioPokemons = async () => {
                try {
                    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');

                    const data = response.data;
                    const axioPokemons = await Promise.all(data.results.map(async (pokemonInfo: any) => {
                        const pokemonResponse = await axios.get(pokemonInfo.url);
                        const pokemonData = pokemonResponse.data;
                        const formated: Pokemon = {
                            name: pokemonData.name,
                            id: pokemonData.id,
                            sprites: { front_default: pokemonData.sprites.front_default },
                            types: pokemonData.types.map((typeInfo: any) => typeInfo.type.name),
                        };
                        return formated;
                    }));

                    setPokemons(axioPokemons);
                } catch (error) {
                    
                }
            }

            useEffect(() => {
                axioPokemons();
            }, []);
    return (
        <div>
            <h2 className='text-4xl p-6 text-center'>Galeria de Pokemones</h2>
            <div className='grid grid-cols-4 gap-4'>
                {pokemons.map((pokemon) => (
                    <div key={pokemon.id} className='border p-4 rounded-lg text-center'>
                        <h3 className='text-2xl mb-2'>{pokemon.name} (#{pokemon.id})</h3>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} className='w-32 mx-auto mb-2'/>
                        <p>Tipos: {pokemon.types.join(", ")}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default GaleriaPokemon;