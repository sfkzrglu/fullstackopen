

export default function Country(props) {
    const { country,
        setShowDetailsIndex,
        showDetailsIndex,
        arrayIndex,
        singleCountry
    } = props

    return (
        <div>
            {/*if not single country, than show 'country name' and 'show button'*/}
            {
                !singleCountry &&
                <div>
                    {country.name.common}
                    <button
                        onClick={() => setShowDetailsIndex(showDetailsIndex === arrayIndex ? null : arrayIndex)}
                    >
                        {showDetailsIndex === arrayIndex ? 'hide' : 'show'}
                    </button>
                </div>

            }
            {/*If selected country or single country, show details */}
            {
                (showDetailsIndex === arrayIndex || singleCountry) &&
                <div>
                    {singleCountry && <h2> {country.name.common} </h2>}
                    <div>Capital: {country.capital}</div>
                    <div>Area: {country.area}</div>
                    <h4>Languages:</h4>
                    {
                        Object.keys(country.languages).map(key => {
                            return <li key={key}>{country.languages[key]}</li>
                        })
                    }
                    <img src={country.flags.png}></img>

                    <h3>Weather in {country.capital}</h3>
                    <div></div>
                </div>
            }
        </div>
    )
}
