function ColorIcon({ selectedClassHandler, settingsUpdateHandler, type }) {
    return (
        <div
            className={`flex center align-center pointer ${type} color-option-icon`}
            onClick={() => settingsUpdateHandler('color', type)}
        >
            {selectedClassHandler('color', type)}
        </div>
    )
}

export { ColorIcon }