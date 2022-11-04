import React from 'react'
import UserCount from './UserCount'
import { VectorMap } from '@south-paw/react-vector-maps'
import DailyAppVisits from './DailyAppVisits'
import world from '../world.svg.json'
import styled from 'styled-components'
import FeedbackCount from './FeedbackCount'
import MapDestribution from './MapDestribution'
import PositiveCount from './PositiveCount'
import NegativeCount from './NegativeCount'
import TouristType from './TouristType'
import Gender from './Gender'
import Performance from './Performance'

export default function MonthlyAnalytics() {
    return (
        <>
            <Countables>
                <UserCount />
                <PositiveCount />
                <NegativeCount />
                <FeedbackCount />
            </Countables>
            <Container>
                <Performance />
                <MapDestribution />
                <Gender />
                <DailyAppVisits />
                <TouristType />
            </Container>
        </>
    )
}

const Container = styled.div`
    display: flex;
    padding: 3em;
    flex-wrap: wrap;
    row-gap: 5em;
`;


const Countables = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1em;
  width: 100%;
`;
