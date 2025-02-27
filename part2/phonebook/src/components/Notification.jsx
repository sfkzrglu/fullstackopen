const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    return (
        <div className={notification.warningType}>
            {notification.message}
        </div>
    )
}

export default Notification