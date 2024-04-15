"use client"

import { useState, useEffect } from "react";

export default function Home() {

  const [currentPlanets, setCurrentPlanets] = useState([])

  async function fetchCurrentPlanets() {
    const request = await fetch('https://helldiverstrainingmanual.com/api/v1/war/campaign')
    const response = await request.json()
    console.log(response)
    setCurrentPlanets(response)
  }

  useEffect(() => {
    fetchCurrentPlanets()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-5xl">Helldivers 2 Planetary</h1>
      <h2 className="text-4xl mt-4">Currently Active Planets:</h2>
      {currentPlanets.map(planet => (
                        <div key={planet.planetIndex} className="mb-4 flex flex-col items-center">
                          <p className="text-3xl">{planet.name}</p>
                          <p className="text-2xl">{planet.faction}</p>
                          <p className="text-2xl">{planet.biome.description}</p>
                          <div className="w-full bg-white">
                            <div className="bg-black" style={{width: `${planet.percentage}%`}} >
                              <p>{planet.percentage}%</p>
                            </div>
                          </div>
                        </div>
                    ))}
    </main>
  );
}
