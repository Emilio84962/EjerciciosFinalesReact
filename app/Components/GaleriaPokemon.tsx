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

            useEffect(() => {
                
            }, []);
}