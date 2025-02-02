import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import TeamCard from '../TeamCard'

class Home extends Component {
  state = {
    teamList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamCardList()
  }

  getTeamCardList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const formattedData = data.teams.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      teamImageUrl: eachItem.team_image_url,
    }))

    this.setState({teamList: formattedData, isLoading: false})
  }

  render() {
    const {teamList, isLoading} = this.state
    return (
      <Link className="link-style" to="/">
        <div className="app-Container">
          <div className="headingandLogoContainer">
            <img
              alt="ipl logo"
              className="iplLogo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            />
            <h1 className="heading">IPL Dashboard</h1>

            {isLoading ? (
              <div data-testid="loader">
                {' '}
                <Loader
                  type="Oval"
                  color="#ffffff"
                  height={50}
                  width={50}
                  testid="loader"
                />{' '}
              </div>
            ) : (
              <ul className="teamCardsList-container">
                {teamList.map(eachItem => (
                  <TeamCard key={eachItem.id} eachItem={eachItem} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </Link>
    )
  }
}

export default Home
