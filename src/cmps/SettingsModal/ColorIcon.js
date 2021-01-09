function ColorIcon({ colorType, selectedClassHandler, settingsUpdateHandler }) {
    return (
        <div
            className={`flex center align-center pointer ${colorType} color-option-icon`}
            onClick={() => settingsUpdateHandler('color', colorType)}
        >
            {selectedClassHandler('color', colorType)}
        </div>
    )
}

export { ColorIcon }