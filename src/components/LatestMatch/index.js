import './index.css'

const LatestMatch = props => {
  const {latestMatchDetailes} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    manOfTheMatch,
    matchStatus,
    result,
    secondInnings,
    umpires,
    venue,
  } = latestMatchDetailes

  return (
    <div className="latestDetails-Container">
      <div className="latestDetails-1">
        <h1 className="heading">{competingTeam}</h1>
        <p className="date">{date}</p>
        <p className="text">{result}</p>
      </div>
      <div className="latestDetails-2">
        <img
          alt={`latest match ${competingTeam}`}
          className="logoImage"
          src={competingTeamLogo}
        />
      </div>
      <div className="latestDetails-1">
        <p className="text-details">{firstInnings}</p>
        <p className="text-details">{matchStatus}</p>
        <p className="text-details">{manOfTheMatch}</p>
        <p className="text-details">{secondInnings}</p>
        <p className="text-details">{umpires}</p>
        <p className="text-details">{venue}</p>
      </div>
    </div>
  )
}

export default LatestMatch
