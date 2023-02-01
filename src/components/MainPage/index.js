import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import PackageCard from '../PackageCard'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class MainPage extends Component {
  state = {apiStatus: apiStatusConstants.initial, packagesList: []}

  componentDidMount() {
    this.getTravelPackages()
  }

  getTravelPackages = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const travelGuidePackagesApiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(travelGuidePackagesApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.packages.map(eachPackage => ({
        description: eachPackage.description,
        id: eachPackage.id,
        imageUrl: eachPackage.image_url,
        name: eachPackage.name,
      }))
      this.setState({
        packagesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {packagesList} = this.state
    return (
      <ul className="packages-card-container">
        {packagesList.map(eachPackage => (
          <PackageCard key={eachPackage.id} eachPackage={eachPackage} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div>
      <h1> Something went wrong, try again.</h1>
    </div>
  )

  renderPackages = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="app-container">
          <h1 className="heading">Travel Guide </h1>

          <hr />
          <div className="packages-container">{this.renderPackages()}</div>
        </div>
      </>
    )
  }
}

export default MainPage
