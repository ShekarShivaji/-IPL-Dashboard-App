import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import PieChart from '../PieChart'

class TeamMatches extends Component {
  state = {
    latestMatchDetailes: [],
    teamBannerUrl: '',
    recentMatchDetails: [],

    isLoading: true,
  }

  componentDidMount() {
    this.getMatchDetails()
  }

  getMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    console.log(data)
    const latestMatch = data.latest_match_details
    const latestMatchDetails = {
      competingTeam: latestMatch.competing_team,
      competingTeamLogo: latestMatch.competing_team_logo,
      date: latestMatch.date,
      firstInnings: latestMatch.first_innings,
      id: latestMatch.id,
      manOfTheMatch: latestMatch.man_of_the_match,
      matchStatus: latestMatch.match_status,
      result: latestMatch.result,
      secondInnings: latestMatch.second_innings,
      umpires: latestMatch.umpires,
      venue: latestMatch.venue,
    }
    const teamBanner = data.team_banner_url
    const recentmatch = data.recent_matches
    const recentMatch = recentmatch.map(eachItem => ({
      umpires: eachItem.umpires,
      result: eachItem.result,
      manOfTheMatch: eachItem.man_of_the_match,
      id: eachItem.id,
      date: eachItem.date,
      venue: eachItem.venue,
      competingTeam: eachItem.competing_team,
      competingTeamLogo: eachItem.competing_team_logo,
      firstInnings: eachItem.first_innings,
      secondInnings: eachItem.second_innings,
      matchStatus: eachItem.match_status,
    }))

    this.setState({
      latestMatchDetailes: latestMatchDetails,
      teamBannerUrl: teamBanner,
      recentMatchDetails: recentMatch,
      isLoading: false,
    })
  }

  getNumberOfMatches = value => {
    const {recentMatchDetails, latestMatchDetailes} = this.state
    const currantMatch = latestMatchDetailes.matchStatus === value ? 1 : 0
    const result =
      recentMatchDetails.filter(match => match.matchStatus === value).length +
      currantMatch
    return result
  }

  genaratePieChartData = () => [
    {name: 'Won', value: this.getNumberOfMatches('Won'), id: 'WON'},
    {name: 'Lost', value: this.getNumberOfMatches('Lost'), id: 'LOST'},
    {name: 'Drawn', value: this.getNumberOfMatches('Drawn'), id: 'DRAWN'},
  ]

  renderTeamMatches = () => {
    const {latestMatchDetailes, teamBannerUrl, recentMatchDetails} = this.state
    return (
      <div className="teamMatch-Container">
        <div className="backbuttonContainer">
          <Link to="/">
            <button className="backButton" type="button">
              Back
            </button>
          </Link>
        </div>
        <img className="teamBanner" alt="team banner" src={teamBannerUrl} />
        <LatestMatch latestMatchDetailes={latestMatchDetailes} />
        <PieChart data={this.genaratePieChartData()} />
        <ul className="matchCards">
          {recentMatchDetails.map(eachItem => (
            <MatchCard key={eachItem.id} eachItem={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const {isLoading} = this.state
    return (
      <div className={`teamMatch-Container ${id}`}>
        {isLoading ? (
          <div className="loader">
            {' '}
            <Loader
              type="Oval"
              testid="loader"
              color="#ffffff"
              height={50}
              width={50}
            />{' '}
          </div>
        ) : (
          this.renderTeamMatches()
        )}
      </div>
    )
  }
}

export default TeamMatches
