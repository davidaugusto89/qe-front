const myPlugin = {
    install(app) {
        app.config.globalProperties.$validateCPF = (cpf) => {
            cpf = cpf.replaceAll('.', '').replaceAll('-', '')
            if (!cpf || cpf.length != 11
                || cpf == "00000000000"
                || cpf == "11111111111"
                || cpf == "22222222222"
                || cpf == "33333333333"
                || cpf == "44444444444"
                || cpf == "55555555555"
                || cpf == "66666666666"
                || cpf == "77777777777"
                || cpf == "88888888888"
                || cpf == "99999999999")
                return false
            var soma = 0
            var resto
            var i = 1
            for (i = 1; i <= 9; i++)
                soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
            resto = (soma * 10) % 11
            if ((resto == 10) || (resto == 11)) resto = 0
            if (resto != parseInt(cpf.substring(9, 10))) return false
            soma = 0
            for (i = 1; i <= 10; i++)
                soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
            resto = (soma * 10) % 11
            if ((resto == 10) || (resto == 11)) resto = 0
            if (resto != parseInt(cpf.substring(10, 11))) return false
            return true
        },

            app.config.globalProperties.$validateCNPJ = (cnpj) => {
                cnpj = cnpj.replaceAll('.', '').replaceAll('-', '').replaceAll('/', '')
                if (!cnpj || cnpj.length != 14
                    || cnpj == "00000000000000"
                    || cnpj == "11111111111111"
                    || cnpj == "22222222222222"
                    || cnpj == "33333333333333"
                    || cnpj == "44444444444444"
                    || cnpj == "55555555555555"
                    || cnpj == "66666666666666"
                    || cnpj == "77777777777777"
                    || cnpj == "88888888888888"
                    || cnpj == "99999999999999")
                    return false
                var tamanho = cnpj.length - 2
                var numeros = cnpj.substring(0, tamanho)
                var digitos = cnpj.substring(tamanho)
                var soma = 0
                var pos = tamanho - 7
                var i = 1
                for (i = tamanho; i >= 1; i--) {
                    soma += numeros.charAt(tamanho - i) * pos--
                    if (pos < 2) pos = 9
                }
                var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
                if (resultado != digitos.charAt(0)) return false;
                tamanho = tamanho + 1
                numeros = cnpj.substring(0, tamanho)
                soma = 0
                pos = tamanho - 7
                for (i = tamanho; i >= 1; i--) {
                    soma += numeros.charAt(tamanho - i) * pos--
                    if (pos < 2) pos = 9
                }
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
                if (resultado != digitos.charAt(1)) return false
                return true;
            },

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