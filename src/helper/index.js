const myPlugin = {
    install(app) {
        app.config.globalProperties.$formatDateBR = (key) => {
            return typeof key !== 'undefined' ? new Date(key).toLocaleDateString('pt-BR') : '';
        },
            app.config.globalProperties.$formatDateUS = (key) => {
                return typeof key !== 'undefined' ? new Date(key).toISOString().split('T')[0] : '';
            },
            app.config.globalProperties.$formatMoney = (key) => {
                return typeof key !== 'undefined' ? key.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : '';
            }
    }
}

export default myPlugin;