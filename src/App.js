import { useEffect,useState } from "react"

import "./index.css";
import "./bg.jpg"
import Prayer from "./components/Prayer";
function App() {

  let [prayerTimes , setPrayerTimes] = useState({});
  let [dateTime , setDateTime] = useState("");
  let [city, setCity] = useState("Cairo");

  let cities = [
    {name: 'القاهره', value:"Cairo"},
    {name: 'الأسكندريه', value:"Alexandria"},
    {name: 'الجيزه', value:"Giza"},
    {name: 'المنصوره', value:"Mansoura"},
    {name: 'أسوان', value:"Aswan"},
    {name: 'الأقصر', value:"Luxor"},
  ]

  useEffect(() => {
    let fetchPrayersTimes = async () => {
      try {
        let res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=Eg&country=${city}`)
        let dataPrayer = await res.json()
        setPrayerTimes(dataPrayer.data.timings)
        setDateTime(dataPrayer.data.date.gregorian.date)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPrayersTimes()
  }, [city])

  let formatTime = (time) => {
    if (!time) {
      return '00:00'
    }
    let [hours, minutes] = time.split(':').map(Number)
    let perd = hours >= 12? 'PM' : 'AM'
    hours = hours % 12 || 12
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${perd}`
  }

  return (
    <section>
      <div className='container'>
        <div className='top-sec'>
          <div className='city'>
          <h3>المدينه</h3>
          <select onChange={(e) => setCity(e.target.value)}>
            {cities.map((city) => (
              <option key={city.value} value={city.value}>{city.name}</option>
            ))}
          </select>
          </div>
          <div className='date'>
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>
        <Prayer PrayerName="الفجر" PrayerTime={formatTime(prayerTimes.Fajr)}/>
        <Prayer PrayerName="الظهر" PrayerTime={formatTime(prayerTimes.Dhuhr)}/>
        <Prayer PrayerName="العصر" PrayerTime={formatTime(prayerTimes.Asr)}/>
        <Prayer PrayerName="المغرب" PrayerTime={formatTime(prayerTimes.Maghrib)}/>
        <Prayer PrayerName="العشاء" PrayerTime={formatTime(prayerTimes.Isha)}/>
      </div>  
    </section>
  )
}
export default App;
