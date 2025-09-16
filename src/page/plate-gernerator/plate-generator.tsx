import styled from "styled-components"
import { PanelCard } from "../../components/card/panel-card";
import { useTranslation } from "react-i18next";

export const PlateGenerator = () => { 
    
    const { i18n } = useTranslation();
    
    const langToggleHandler = (lang: string) => {
        i18n.changeLanguage(lang)
    }

    return (
        <>
            <ToggleEl>
                <ToggleBtn onClick={() => langToggleHandler('en')}>EN</ToggleBtn>
                <ToggleBtn onClick={() => langToggleHandler('de')}>DE</ToggleBtn>
            </ToggleEl>
            <PanelCard />
        </>
    )
}

const ToggleEl = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
`

const ToggleBtn = styled.button`
    background-color: #E9E9E9;
    border: 1px solid #000;
    border-radius: 5px;
    color: #000;
    cursor: pointer;
    line-height: 25px;
    margin-bottom:  12px;
    margin-left: 5px;
    padding: 5px;
    text-align: center;
    width: 35px;
`
