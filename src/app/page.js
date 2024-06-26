"use client"

import { useState, useEffect } from "react";
import Card from "./components/Card";
import Header from "./components/Header";

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
  const [stats, setStats] = useState({})

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
    if (currentMajorOrders.length > 0) {
      setCurrentMajorOrders(response)
    }
  }

  async function fetchCurrentWarStatus() {
    const request = await fetch('https://helldiverstrainingmanual.com/api/v1/war/status')
    const response = await request.json()
    setWarStatus(response)
    setTime(response.time - 345600)
  }

  async function fetchCurrentNews() {
    const request = await fetch('https://helldiverstrainingmanual.com/api/v1/war/news?from=' + time)
    const response = await request.json()
    setNews(response)
  }

  async function fetchStats() {
    const request = await fetch('https://helldiverstrainingmanual.com/api/v1/war/stats')
    const response = await request.json()
    setStats(response)
  }

  useEffect(() => {
    fetchCurrentPlanets()
    fetchAllPlanets()
    fetchCurrentWarStatus()
    fetchCurrentMajorOrders()
    fetchStats()
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
    <main className="flex min-h-screen flex-col items-center text-center m-4 mt-8">
      <h1 className="text-5xl">Helldivers 2 Mission Status</h1>
      <a className="text-2xl mt-2 underline" href="#stats">Stats</a>
      <a className="text-2xl mt-2 underline" href="#orders">Orders</a>
      <a className="text-2xl mt-2 underline" href="#news">News</a>
      <a className="text-2xl mt-2 underline" href="#planets">Planets</a>
      <h2 className="text-3xl text-center mt-4 w-[90%]">Stay up-to-date with the war effort from the sidelines! View the planets that are currently being liberated and plan your next move to assist your fellow Helldivers.</h2>
      
      <section className="flex flex-col items-center mt-4" id="stats">
        <Header title={'Latest Stats'} />
        {stats.missionsWon && <p className="text-2xl mt-4"> Total Missions Won: {stats.missionsWon.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>}
        {stats.missionsWon && <p className="text-2xl mt-4">Total Missions Lost: {stats.missionsLost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>}
        {stats.missionsWon && <p className="text-2xl mt-4">Mission Success Rate: {stats.missionSuccessRate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%</p>}
        {stats.missionsWon && <p className="text-2xl mt-4">Automaton Kills: {stats.automatonKills.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>}
        {stats.missionsWon && <p className="text-2xl mt-4">Terminid Kills: {stats.bugKills.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>}
        {/* <p>Illuminate Kills: {stats.illuminateKills.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p> */}
      </section>

      <section className="flex flex-col items-center mt-4" id="orders">
        <Header title={'Current Major Orders'} />
        {currentMajorOrders.map(order => (
          <div key={Math.random()} className="mb-4 flex flex-col items-center text-center">
            {currentMajorOrders[0].setting.overrideTitle && <p className="text-2xl mt-5">{order.setting.overrideTitle}</p>}
            {currentMajorOrders[0].setting.overrideBrief && <p className="text-2xl mt-5">{order.setting.overrideBrief}</p>}
            {currentMajorOrders[0].setting.taskDescription && <p className="text-2xl mt-5">{order.setting.taskDescription}</p>}
            {currentMajorOrders[0].setting.tasks?.values[2] && <p className="text-2xl mt-5">Affected Planets:</p>}
            {currentMajorOrders[0].setting.tasks?.values[2] && <p className="text-2xl mt-5">{allPlanets[order.setting.tasks[0].values[2]].name}</p>}
          </div>
        ))}
      </section>

      <section className="flex flex-col items-center" id="news">
        <Header title={'Latest News'} />
        {news.map(article => (
          <div key={article.id} className="flex flex-col items-center text-center w-[80%]">
            {article.message && <p className="text-2xl mt-5">{article.message.replace(/<.*?>/g, "").replace(/\n/g, "").replace(/WON/g, "WON: ").replace(/ORDER/g, "ORDER: ").replace(/BRIEF/g, "BRIEF: ")}</p>}
          </div>
        ))}
      </section>
      
      <section className="flex flex-col items-center mt-4" id="planets">
        <Header title={'Currently Active Planets'} />
        {currentPlanets.map(planet => (
                        <div key={planet.planetIndex} className="mb-4 flex flex-col items-center text-center w-[80%] relative">
                          <Card planet={planet} />
                        </div>
                    ))}
      </section>
    </main>
  );
}