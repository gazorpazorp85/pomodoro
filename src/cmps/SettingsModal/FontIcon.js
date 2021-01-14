function FontIcon({ selectedClassHandler, settingsUpdateHandler, type }) {
    return (
        <div
            className={`pointer font-option-icon ${selectedClassHandler('font', type)}`}
            onClick={() => settingsUpdateHandler('font', type)}
            style={{ fontFamily: type }}
        >Aa
        </div>
    )
}

export { FontIcon };