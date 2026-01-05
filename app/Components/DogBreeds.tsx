import { useEffect, useState } from "react";
import axios from "axios";

const DogBreeds = () => {
    
        //Listado de razas
        const [razas, setRazas] = useState<string[]>([]);
        const getData = async () => {
            let url = "https://dog.ceo/api/breeds/list/all";
            
                let response = await axios.get(url);
                    const listaRazas = Object.keys (response.data.message);
                    setRazas(listaRazas);




        }

        useEffect(function() {getData();}, []);


    return (
        <div className="p-20">
            <h2 className="text-3xl font-bold text-center mb-8">Listado de razas</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {razas.map((raza, index)=>(
                <li key={index}
                className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition capitalize"
                >
                    {raza}
                    </li>
                ))}
            </ul>
            
                
            
        </div>
    );

};

export default DogBreeds; 