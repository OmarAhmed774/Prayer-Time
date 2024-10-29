export default function prayer({PrayerName , PrayerTime}) {
  return (
    <div className="prayer">
      <p className="name-prayer">{PrayerName}</p>
      <p className="time-prayer">{PrayerTime}</p>
    </div>
  )
}

