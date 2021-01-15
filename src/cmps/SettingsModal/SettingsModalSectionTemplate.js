import { mapSettingsModalDynamicComponent } from './mapSettingsModalDynamicComponent';

function SettingsModalSectionTemplate({ selectedClassHandler, settingName, settingsUpdateHandler, types }) {

    const Cmp = mapSettingsModalDynamicComponent[settingName];
    const className = settingName === 'sound' ? 'sound-icons-container' : '';

    return (
        <div className={`flex modal-section ${settingName}-setting`}>
            <div className="uppercase section-title">{settingName}</div>
            <div className={`flex ${className}`}>
                {types.map(type => {
                    return (
                        <Cmp
                            key={type}
                            selectedClassHandler={selectedClassHandler}
                            settingsUpdateHandler={settingsUpdateHandler}
                            type={type}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export { SettingsModalSectionTemplate };