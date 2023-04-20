let element = {
    fixDrawerClose: (_this, drawerRefNameList, stopCloseWhen) => {
        if (typeof drawerRefNameList === 'string') {
            drawerRefNameList = [drawerRefNameList]
        }
        const _that = _this
        _that.$nextTick(() => {
            for (const name of drawerRefNameList) {
                const ref = _that.$refs[name]
                if (!ref) {
                    continue
                }
                if (!ref.handleClose) {
                    ref.handleClose = function () {
                        if (stopCloseWhen && stopCloseWhen()) {
                            return
                        }
                        ref.closeDrawer()
                    }
                }
            }
        })
    }
}

module.exports = element