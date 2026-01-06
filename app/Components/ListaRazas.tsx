import React, { useEffect, useState } from 'react';



const ListaRazas = () => {
    const [razas, setRazas] = useState<string[]>([]);
    const [selectedRaza, setSelectedRaza] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        const fetchRazas = async () => {
            try {
                const response = await fetch(`https://dog.ceo/api/breeds/list/all`);
                const data = await response.json();
                const dataRazas = Object.keys(data.message);
                setRazas(dataRazas);

            } catch (error) {
                console.error("Error fetching razas:", error);
            }
        };

        fetchRazas();
    },  []);
    
    //cargar imagen de la raza seleccionada
    useEffect(()=> {
        const fetchRazaImg = async () => {
            if (!selectedRaza) return;
            try {
                const response = await fetch(`https://dog.ceo/api/breed/${selectedRaza}/images/random`);
                const data = await response.json();
                setImageUrl(data.message);

                
            } catch (error) {
                console.error("Error fetching raza image:", error);
            }
        }
        fetchRazaImg();
    }, [selectedRaza]);


    return (
        <div className='m-8 p-6 flex flex-col items-center border rounded-lg shadow-lg'>
        <h2 className='text-center text-2xl font-semibold'>Selecciona una raza</h2>
        <select className='border mt-4' value={selectedRaza} onChange={(e) => setSelectedRaza(e.target.value)}
        >
            <option value="">-- Selecciona --</option>
            {razas.map((raza) => (
            <option key={raza} value={raza}>
                {raza}
            </option>
            ))}
        </select>

        {selectedRaza && (
            <div className='mt-5'>
            <h3 className='text-xl mb-7'>Raza seleccionada: {selectedRaza}</h3>
            {imageUrl ? (
                <img src={imageUrl} alt={selectedRaza} className='w-75 rounded-sm ' />
            ) : (
                <p>Cargando imagen...</p>
            )}
            </div>
        )}
    </div>
    );
}

export default ListaRazas;