const pathGet = require("./pathGet");
const moment = require("moment");

function momentHumanizeForDatePicker(eventDuration, config) {
    const unit = pathGet(config, 'unit', "s")
    let eventMDuration = moment.duration(eventDuration, unit);
    if (eventMDuration.asMinutes() < 60 ){
        return `${eventMDuration.asMinutes()}分钟`
    }
    if (eventMDuration.asHours() < 24 ){
        return `${eventMDuration.asHours()}小时`
    }
    return `${eventMDuration.asDays()}天`
}

function todayLastSecond() {
    return new Date(new Date(new Date().toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 -1)
}

// 0 当天
const defaultShortcuts = [0,1800,3600*2,3600*3,3600*6,3600*12,3600*24,3600*48,3600*72, 3600*168, 3600*336,3600*504]
function datetimePickerOptionsPast(disableNext,shortcuts) {
    disableNext = disableNext===undefined?false:disableNext
    shortcuts = shortcuts || defaultShortcuts
    let options = {shortcuts:[]}
    for(const diff of shortcuts) {
        let option = []
        let text = ""
        if(diff === 0 ){
            const start = new Date(new Date().setHours(0,0,0));
            const end = new Date(start.getTime()+(24*60*60-1)*1000);
            text = "当天"
            // 不要提供第四个参数，第四个参数是diffFromNow的含义，获取到的start end将会是[now-diff，now]，now是当前时间
            option=[start,end,text]
        }else{
            const start = new Date();
            const end = new Date();
            start.setTime(end.getTime() - diff * 1000);
            text = `最近${momentHumanizeForDatePicker(diff,{unit:"s"})}`
            option=[start,end,text,diff]
        }
        options.shortcuts.push({text:text,onClick(picker) {picker.$emit('pick',option)}})
    }
    if(disableNext) {
        options.disabledDate = function (time) {
            return time.getTime() > todayLastSecond();
        }
    }
    return options
}

module.exports = datetimePickerOptionsPast