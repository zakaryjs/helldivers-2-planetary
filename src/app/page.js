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
      <h2 className="text-4xl text-center mt-4">Stay up-to-date with the war effort from the sidelines! View the planets that are currently being liberated and plan your next move to assist your fellow Helldivers.</h2>
      <h2 className="text-3xl mt-4">Currently Active Planets:</h2>
      {currentPlanets.map(planet => (
                        <div key={planet.planetIndex} className="mb-4 flex flex-col items-center text-center w-[50%]">
                          <p className="text-3xl mt-4">{planet.name}</p>
                          <p className="text-2xl">{planet.faction}</p>
                          <p className="text-2xl">{planet.biome.description}</p>
                          <div className="w-[80%] h-[1.5rem] bg-white mt-4">
                            <div className="bg-black h-full" style={{width: `${planet.percentage}%`}}>
                            </div>
                          </div>
                          <p className="text-2xl mt-4">{planet.percentage}% Liberated</p>
                        </div>
                    ))}
    </main>
  );
}
