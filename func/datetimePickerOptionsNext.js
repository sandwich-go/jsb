function datetimePickerOptionsNext(disablePast=true) {
    let options =  {
        shortcuts: [{
            text: '后一周',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '后一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                end.setTime(end.getTime() + 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '后三个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                end.setTime(end.getTime() + 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
        }]
    }
    if(disablePast) {
        options.disabledDate=function(time) {
            return time.getTime() < Date.now();
        }
    }
    return options
}

module.exports = datetimePickerOptionsNext