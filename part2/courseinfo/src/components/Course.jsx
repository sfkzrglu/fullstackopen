const Header = (props) => {
    const { name } = props
    return <h2>{name}</h2>
}

const Total = (props) => {
    const { parts } = props
    const total = parts.reduce((s, p) => {
        return s += p.exercises
    }, 0)
    return <h4>Number of {total} exercises </h4>
}

const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    )
}

const Content = (props) => {
    const { parts } = props

    return (
        <div>
            {
                parts.map(item =>
                    <Part key={item.id} part={item.name} exercises={item.exercises} />
                )
            }

        </div>
    )
}


const Course = (props) => {
    const { courses } = props

    return courses.map(item => {
        return <div key={item.id}>
            <Header name={item.name} />
            <Content parts={item.parts} />
            <Total parts={item.parts} />
        </div>
    })

}

export default Course