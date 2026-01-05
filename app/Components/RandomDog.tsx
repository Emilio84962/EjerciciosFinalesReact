import { useEffect, useState} from "react";



const RandomDog = () => {

        //Almacenara el url para la imagen
        const [imageUrl, setImageUrl] = useState(null);
        //Estado para controlar la carga
        const[loading, setLoading] = useState(true);

        useEffect(()=> {
            //Ahora se realiza la peticion a la api para
            //para conseguir la imagen

            fetch("https://dog.ceo/api/breeds/image/random")
            .then((response) => response.json())
            .then((data) => {
                //Cuando la imagen llegue deja de estar en estado loading
                setImageUrl(data.message);
                setLoading(false); 
            })
            //Se maneja el error en caso de que la peticion falle
            .catch((error) => {
                console.error("Error al traer la imagen", error);
                setLoading(false)
            })
        }, []);

        
    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-3xl p-15 block mb-6">Imagen traida desde la API</h2>
            {loading ? (
                <p>Cargando ...</p>
            ):(
                imageUrl && (
                    <img src={imageUrl} alt="Imagen desde la API" className="w-125 rounded-4xl shadow-2xl "/>
                )
            )}
        </div>
    );
    }

    



export default RandomDog;