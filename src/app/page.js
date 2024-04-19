"use client"

import { useState, useEffect } from "react";
import Card from "./components/Card";

export default function Home() {

  const placeholder = [{
    setting: {
      overrideBrief: 'Stand by for further orders from Super Earth High Command.'
    }
  }]

  const [allPlanets, setAllPlanets] = useState([])
  const [currentPlanets, setCurrentPlanets] = useState([])
  const [currentMajorOrders, setCurrentMajorOrders] = useState(placeholder)
  const [warStatus, setWarStatus] = useState({})
  const [time, setTime] = useState(0)
  const [news, setNews] = useState([])

  async function fetchAllPlanets() {
    const request = await fetch('https://helldiverstrainingmanual.com/api/v1/planets')
    const response = await request.json()
    setAllPlanets(response)
  }

  async function fetchCurrentPlanets() {
    const request = await fetch('https://helldiverstrainingmanual.com/api/v1/war/campaign')
    const response = await request.json()
    console.log(response)
    setCurrentPlanets(response)
  }

  async function fetchCurrentMajorOrders() {
    const request = await fetch('https://helldiverstrainingmanual.com/api/v1/war/major-orders')
    const response = await request.json()
    if (currentMajorOrders.length > 1) {
      setCurrentMajorOrders(response)
    }
  }

  async function fetchCurrentWarStatus() {
    const request = await fetch('https://helldiverstrainingmanual.com/api/v1/war/status')
    const response = await request.json()
    setWarStatus(response)
    setTime(response.time - 100000)
  }

  async function fetchCurrentNews() {
    const request = await fetch('https://helldiverstrainingmanual.com/api/v1/war/news?from=' + time)
    const response = await request.json()
    setNews(response)
  }

  useEffect(() => {
    fetchCurrentPlanets()
    fetchAllPlanets()
    fetchCurrentWarStatus()
    fetchCurrentMajorOrders()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const interval = setInterval(fetchCurrentPlanets, 20000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (time > 0) {
      fetchCurrentNews()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-5xl">Helldivers 2 Planetary</h1>
      <h2 className="text-4xl text-center mt-4">Stay up-to-date with the war effort from the sidelines! View the planets that are currently being liberated and plan your next move to assist your fellow Helldivers.</h2>
      
      <h3 className="text-3xl mt-4">Current Major Orders:</h3>
      {currentMajorOrders.map(order => (
        <div key={Math.random()} className="mb-4 flex flex-col items-center text-center w-[50%]">
          {currentMajorOrders[0].setting.overrideTitle && <p className="text-2xl mt-5">{order.setting.overrideTitle}</p>}
          {currentMajorOrders[0].setting.overrideBrief && <p className="text-2xl mt-5">{order.setting.overrideBrief}</p>}
          {currentMajorOrders[0].setting.tasks?.values[2] && <p className="text-2xl mt-5">Affected Planets:</p>}
          {currentMajorOrders[0].setting.tasks?.values[2] && <p className="text-2xl mt-5">{allPlanets[order.setting.tasks[0].values[2]].name}</p>}
        </div>
      ))}

      <h3 className="text-3xl mt-4">Current News:</h3>
      {news.map(article => (
        <div key={article.id} className="flex flex-col items-center text-center">
          {article.message && <p className="text-2xl mt-5">{article.message.replace(/<.*?>/g, "").replace(/\n/g, "").replace(/WON/g, "WON: ").replace(/ORDER/g, "ORDER: ").replace(/BRIEF/g, "BRIEF: ")}</p>}
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
