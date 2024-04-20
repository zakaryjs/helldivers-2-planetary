import Image from 'next/image'

export default function Card( {planet} ) {

    return (
        <div className="Card mb-4 flex flex-col items-center text-center shadow-xl w-[100%]">
            <Image className="Card-Image" src="/helldivers_logo.jpg" height={50} width={50} alt='helldivers logo'/>
            <h1 className="text-3xl">{planet.name}</h1>
            <h2 className="text-2xl mt-5">{planet.biome.description}</h2>
            <div className={planet.faction}>
                <div className="Super-Earth" style={{width: `${planet.percentage}%`}}>
                </div>
            </div>
            <p className="text-2xl mt-4">{planet.percentage.toFixed(2)}% Liberated</p>
        </div>
    )
}