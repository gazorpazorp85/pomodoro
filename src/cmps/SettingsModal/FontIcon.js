function FontIcon({ fontType, selectedClassHandler, settingsUpdateHandler }) {
    return (
        <div
            className={`pointer font-option-icon ${selectedClassHandler('font', fontType)}`}
            onClick={() => settingsUpdateHandler('font', fontType)}
            style={{ fontFamily: fontType }}
        >Aa
        </div>
    )
}

export { FontIcon };