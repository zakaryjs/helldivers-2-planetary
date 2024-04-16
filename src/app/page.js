"use client"

import { useState, useEffect } from "react";
import Card from "./components/Card";

export default function Home() {

  const [currentPlanets, setCurrentPlanets] = useState([])
  const [currentMajorOrders, setCurrentMajorOrders] = useState([{order: 'test'}])

  async function fetchCurrentPlanets() {
    const request = await fetch('https://helldiverstrainingmanual.com/api/v1/war/campaign')
    const response = await request.json()
    console.log(response)
    setCurrentPlanets(response)
  }

  async function fetchCurrentMajorOrders() {
    const request = await fetch('https://helldiverstrainingmanual.com/api/v1/war/major-orders')
    const response = await request.json()
    console.log(response)
    setCurrentMajorOrders(response)
  }

  useEffect(() => {
    fetchCurrentPlanets()
  }, [])

  useEffect(() => {
    const interval = setInterval(fetchCurrentPlanets, 20000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    fetchCurrentMajorOrders()
  }, [])

  useEffect(() => {
    if (currentMajorOrders.length < 1) {
      setCurrentMajorOrders([{
        order: 'Stand by for further orders from Super Earth High Command.'
      }])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMajorOrders])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-5xl">Helldivers 2 Planetary</h1>
      <h2 className="text-4xl text-center mt-4">Stay up-to-date with the war effort from the sidelines! View the planets that are currently being liberated and plan your next move to assist your fellow Helldivers.</h2>
      
      <h3 className="text-3xl mt-4">Current Major Orders:</h3>
      {currentMajorOrders.map(order => (
        <div key={order.order} className="mb-4 flex flex-col items-center text-center w-[50%]">
          <p className="text-2xl mt-5">{order.order}</p>
        </div>
      ))}
      
      <h2 className="text-3xl mt-4">Currently Active Planets:</h2>
      {currentPlanets.map(planet => (
                        <div key={planet.planetIndex} className="mb-4 flex flex-col items-center text-center w-[50%] relative">
                          <Card planet={planet} />
                        </div>
                    ))}
    </main>
  );
}
