import { mapSettingsModalDynamicComponent } from './mapSettingsModalDynamicComponent';

function SettingsModalSectionTemplate({ selectedClassHandler, settingName, settingsUpdateHandler, types }) {

    const Cmp = mapSettingsModalDynamicComponent[settingName];

    return (
        <div className={`flex modal-section ${settingName}-setting`}>
            <div className="uppercase section-title">{settingName}</div>
            <div className="flex">
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