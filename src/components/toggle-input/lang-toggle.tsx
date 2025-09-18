import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { PageContext } from "../../App";
import styled from "styled-components";
import { selectLangBtn } from "../../util";

export const LangToggleBtn = () => {
    
    const { i18n } = useTranslation();
    const {lang, setLang} = useContext(PageContext);

    const langToggleHandler = (lang: string) => {
        i18n.changeLanguage(lang);
        setLang(lang)
    }

    return (
        <>
            <ToggleEl style={{marginRight: 10}}>
                <ToggleBtn onClick={() => langToggleHandler('en')} $isactive={selectLangBtn('en', lang)}>EN</ToggleBtn>
                <ToggleBtn onClick={() => langToggleHandler('de')} $isactive={selectLangBtn('de', lang)}>DE</ToggleBtn>
            </ToggleEl>
        </>
    )
}

const ToggleEl = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
`

const ToggleBtn = styled.button`
    background-color: ${(p: any) => p.$isactive ? '#000' : '#E9E9E9' };
    border: 1px solid #000;
    border-radius: 5px;
    color: ${(p: any) => p.$isactive ? '#FFF' : '#000' };
    cursor: pointer;
    font-size: 11px;
    line-height: 25px;
    margin-right: 5px;
    padding: 2px 6px;
    text-align: center;
    width: auto;
`