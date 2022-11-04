import React from 'react'
import { VectorMap } from '@south-paw/react-vector-maps'
import world from '../world.svg.json'
import styled from 'styled-components'

export default function MapDestribution() {
    return (
        <Container onClick={()=>{window.location = '/international_users'}}>
            <Title>Map Destribution of International Tourist</Title>
            <Map>
                <VectorMap  {...world} />
            </Map>
        </Container>
    )
}

const Title = styled.h3`
    font-size: 15px;
    font-weight: 500;
    margin-top: -1em;
    text-align: center;
`;

const Container = styled.div`
    margin: 1rem auto;
    width: 320px;

    &:hover{
        cursor: pointer;
    }
`;

const Map = styled.div`
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