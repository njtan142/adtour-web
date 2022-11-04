import React from 'react'
import UserCount from './UserCount'
import { VectorMap } from '@south-paw/react-vector-maps'
import DailyAppVisits from './DailyAppVisits'
import world from '../world.svg.json'
import styled from 'styled-components'


export default function YearlyAnalytics() {
  return (
    <>
            <Countables>
                <UserCount />
            </Countables>
            <Map>
                <VectorMap  {...world} />
            </Map>
            <DailyAppVisits />
        </>
  )
}


const Map = styled.div`
  margin: 1rem auto;
  width: 50%;

  svg {
    stroke: #fff;

    path {
      fill: #b3d8e9;
      outline: none;

      &:hover {
        fill: #00aeff;
      }

      // When a layer is 'selected' (via currentLayers prop).
      &[aria-current='true'] {
        fill: #382ba8;
      }
    }
  }
`;

const Countables = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1em;
`;