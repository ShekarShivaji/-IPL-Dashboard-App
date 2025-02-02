import './index.css'
import {Component} from 'react'

class MatchCard extends Component {
  render() {
    const {eachItem} = this.props
    const {competingTeamLogo, matchStatus, competingTeam} = eachItem
    const classNames = matchStatus === 'Won' ? 'matchStatus-1' : 'matchStatus-2'
    return (
      <li className="eachCard">
        <img
          alt={`competing team ${competingTeam}`}
          className="matchCardLogo"
          src={competingTeamLogo}
        />
        <p className="team">{competingTeam}</p>
        <p className={classNames}>{matchStatus}</p>
      </li>
    )
  }
}

export default MatchCard
