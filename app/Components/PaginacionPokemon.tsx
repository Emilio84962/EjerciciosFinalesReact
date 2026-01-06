import { useState,useEffect } from "react";

interface Pokemon { name: string;
    image: string;
    types: string[]; }


const PaginacionPokemon = () => {
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [pokemons, setPokemons] = useState<any[]>([]);
    const limite = 20;

    useEffect(() => {
        const fetchTotalPaginas = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
                const data = await response.json();
                const total = data.count;
                setTotalPaginas(Math.ceil(total / limite));


            } catch (error) {
                console.error("Error fetching total paginas:", error);
            }
        }

        const fetchPokemons = async (pagina: number) => {
            const offset = (pagina - 1) * limite;
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limite}`);
                const data = await response.json();

                const detailedPokemons: Pokemon[] = await Promise.all(
                    data.results.map(async (p: { name: string; url: string }) => {
                        const res = await fetch(p.url);
                        const info = await res.json();
                        return { 
                            name: p.name,
                            image: info.sprites.front_default,
                            types: info.types.map((t: any) => t.type.name),  
                };
            })
        );
        
        setPokemons(detailedPokemons);
            } catch (error) {
                console.error("Error fetching pokemons:", error);
            }
        }
        fetchPokemons(pagina);

        fetchTotalPaginas();

    }, [pagina]);

    const manejarPaginaAnterior = () => {
        setPagina((prevPagina) => Math.max(prevPagina - 1, 1));
    };

    const manejarPaginaSiguiente = () => {
        setPagina((prevPagina) => Math.min(prevPagina + 1, totalPaginas));
    };  

    return (
        <div className="flex flex-col items-center my-4">
            <h2 className="text-4xl my-6">Paginación Pokemons React</h2>
            {/* Renderizamos los pokemons */}
            <ul className="grid grid-cols-5 gap-4 mb-4">
                {pokemons.map((pokemon) => (
                <li key={pokemon.name} className="p-4 border rounded flex flex-col items-center">
                    <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20 mb-2" />
                    <span className="font-bold capitalize">{pokemon.name}</span>
                    <span className="text-sm text-gray-600">
                    Tipos: {pokemon.types.join(", ")}
                    </span>
                </li>
                ))}
            </ul>

      {/* Paginación */}
            <div className="flex justify-center items-center space-x-4">
                <button onClick={manejarPaginaAnterior} disabled={pagina === 1} className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50" >
                Anterior
                </button>
                <span>
                Página {pagina} de {totalPaginas}
                </span>
                <button onClick={manejarPaginaSiguiente} disabled={pagina === totalPaginas} className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50" >
                Siguiente
                </button>
            </div>
    </div> 
    );
}

export default PaginacionPokemon;