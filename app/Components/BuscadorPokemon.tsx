import axios from 'axios';
import React, { useEffect, useState } from 'react';


const BuscadorPokemon: React.FC = () => { 
    
    type Pokemon = { name: string;
    id: number;
    sprites: { front_default: string; }; 
    types: string[]; };
    
    const [search, setSearch] = useState(""); // texto del input 
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);  // estado para almacenar el pokemon buscado


        const axioPokemon = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)

                const data = response.data;
                const formated: Pokemon = {
                    name: data.name,
                    id: data.id,
                    sprites: { front_default: data.sprites.front_default },
                    types: data.types.map((typeInfo: any) => typeInfo.type.name),
                };
                setPokemon(formated);
                console.log(formated);
                

                

            } catch (error) {
                alert("Error fetching Pokémon data: " + error);
            }
        }



        


    

    
                


    return (
        <div>
            <h2 className='text-4xl p-6 text-center'>Buscador Pokemon</h2>
            <div className='flex justify-center mb-8'>
                <input type="search" value={search} className='border  ' onChange={(e) => setSearch(e.target.value)} placeholder="Buscar Pokémon..." />
                <button onClick={axioPokemon} className='ml-4 p-2 bg-blue-500 rounded-lg'>Buscar</button>
            </div>
            {pokemon && ( 
                <div className='flex justify-center'> 
                    <h2>{pokemon.name} (#{pokemon.id})</h2> 
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} className='w-50'/>
                    <p>Tipos: {pokemon.types.join(", ")}</p> 
                    </div> 
                    )}
                </div> );
    
}


export default BuscadorPokemon;