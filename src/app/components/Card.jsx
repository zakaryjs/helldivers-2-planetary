

export default function Card( {planet} ) {

    return (
        <div className="Card mb-4 flex flex-col items-center text-center">
            <h1 className="text-3xl">{planet.name}</h1>
            <h2 className="text-2xl">{planet.biome.description}</h2>
            <div className={planet.faction}>
                <div className="Super-Earth" style={{width: `${planet.percentage}%`}}>
                </div>
            </div>
            <p className="text-2xl mt-4">{planet.percentage}% Liberated</p>
        </div>
    )
}