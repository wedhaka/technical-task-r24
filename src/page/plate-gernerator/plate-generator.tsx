import styled from "styled-components"
import { PanelCard } from "../../components/card/panel-card";
import { Trans, useTranslation } from "react-i18next";

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
            <PlateContainer>
                <PlateBoxContainer>
                    <PlatePanel $flex="2" $bg="#F00">
                        <LeftBox />
                    </PlatePanel>
                    <PlatePanel $flex="1" $bg="#FFF">
                        <RightBox>
                            <Title><Trans>title</Trans></Title>
                            <PanelCard />
                        </RightBox>
                    </PlatePanel>
                </PlateBoxContainer>
            </PlateContainer>
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

const PlateContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const PlateBoxContainer = styled.div`
    background-color: #ff0;
    display: flex;
    flex-direction: row;
    width: 100%;
`

const PlatePanel = styled.div`
    background-color: ${(p: any) => p.$bg};
    flex: ${(p: any) => p.$flex};
    max-width: 100%;
`

const LeftBox = styled.div`
    background-color: #F3F3F3;
    border: 1px solid #CCC;
    height: 400px;
    max-width: 100%;
`

const RightBox = styled.div `
    background-color: #FFF;
    border: 1px solid #FFF;
    height: 400px;
    max-width: 100%;
    overflow-y: auto;
    padding-right: 10px;
    margin-left: 40px;
    scroll-behavior: smooth;
`

const Title = styled.p`
    background-color: white;
    color: black;
    font-size: 20px;
    margin: 0;
    padding: 0 15px 15px 15px;
    position: sticky;
    top: 0px;
    z-index: 10;
`