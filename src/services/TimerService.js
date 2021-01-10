import { Utils } from './Utils';

export const TimerService = {
    loadSettings,
    updateSettings
}

let gSettings = Utils.load('settings') || {
    time: {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 10
    },
    font: 'barlow',
    color: 'peach',
    currentMode: 'pomodoro',
    sound: '01'
}

function loadSettings() {
    return gSettings;
}

function updateSettings(settings) {
    gSettings = settings;
    Utils.store('settings', settings);
}
