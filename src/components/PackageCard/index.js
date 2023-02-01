import './index.css'

function PackageCard(props) {
  const {eachPackage} = props
  const {name, description, id, imageUrl} = eachPackage
  return (
    <li key={id} className="package-card">
      <img src={imageUrl} alt={name} className="package-img" />
      <h1>{name}</h1>
      <p>{description}</p>
    </li>
  )
}

export default PackageCard
