const Filter = (props) => {
    const { search, setSearch } = props

    const handlSearchChange = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div>
            find countries <input value={search} onChange={handlSearchChange} />
        </div>
    )
}

export default Filter