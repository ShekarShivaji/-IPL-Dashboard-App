import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'

class TeamCard extends Component {
  render() {
    const {eachItem} = this.props
    const {name, id, teamImageUrl} = eachItem

    return (
      <Link className="eachTeamContainer" to={`/team-matches/${id}`}>
        <li className="teamCard">
          <img className="eachCardLogo" src={teamImageUrl} alt={name} />
          <p className="name">{name}</p>
        </li>
      </Link>
    )
  }
}

export default TeamCard
