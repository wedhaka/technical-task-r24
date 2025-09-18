function parseNumberLocale(value: number, locale = "en") {
    return new Intl.NumberFormat(locale).format(value)
}

function selectLangBtn (key: string, lang: string) {
    switch (key) {
        case 'de':
            return lang == 'de';
        case 'en':
            return lang == 'en';
        default:
            return lang == 'de';
    }
}

function selectDimensBtn (key: string, dimens: string ) {
    switch (key) {
        case 'cm':
            return dimens == 'cm';
        case 'inch':
            return dimens == 'inch';
        default:
            return dimens == 'cm';
    }
}


export {
    parseNumberLocale,
    selectLangBtn,
    selectDimensBtn
}