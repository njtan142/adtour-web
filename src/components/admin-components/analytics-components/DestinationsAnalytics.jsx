import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import { firestore } from '../../../firebase';
import { doc, collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { async } from '@firebase/util';

export default function DestinationsAnalytics() {
    const [destinations, setDestinations] = useState([]);


    async function loadDestinations(type) {
        const destinationsReference = collection(doc(collection(firestore, 'LocationsData'), type), 'destinations');
        const additionalDestinations = [...destinations];
        await getDocs(destinationsReference).then((destinations) => {
            destinations.forEach((destination) => {
                const data = destination.data();
                const newDestination = {
                    name: data.name,
                    latestFeedback: data['latest_feedback'],
                    positive: data.positive,
                    negative: data.negative,
                    path: destination.path,
                }
                additionalDestinations.push(newDestination)
            })
            console.log(additionalDestinations.length)
        });
        return additionalDestinations
    }

    useEffect(() => {
        console.log(destinations.length)
    }, [destinations])

    useEffect(() => {
        async function fetchData() {
            const newDestinations = [...(await loadDestinations('cultural')), ...(await loadDestinations('manmade')), ...(await loadDestinations('specialinterest'))]
            setDestinations(newDestinations)
        }
        fetchData()

    }, [])

    return (
        <Container>
            {
                destinations.map((destination, index) =>
                (
                    <Destination key={index}>
                        <Name>{destination.name}</Name>
                        <LatestFeedback>{destination.latestFeedback}</LatestFeedback>
                        <Positive>{destination.positive == null ? 0 : destination.positive}</Positive>
                        <Negative>{destination.negative == null ? 0 : destination.negative}</Negative>
                        <Feedbacks>View Feedbacks</Feedbacks>
                    </Destination>
                )
                )
            }
            {console.log(destinations.length)}
        </Container>
    )
}

const Feedbacks = styled.button`
    margin-right: 1em;
    background-color: #1B71C1;
    border: none;
    border-radius: 10em;
    padding: 1em 2em;
    color: white;
    height: fit-content;
`;

const LatestFeedback = styled.p`
    width: 100px;

`;

const Negative = styled.p`
    
`;

const Positive = styled.p``;

const Name = styled.h3`
    font-weight: normal;
    width: 300px;
    white-space: nowrap;
    overflow: hidden;

    &:hover{
        overflow: visible;
        white-space: normal;
    }
`;

const Destination = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 5em;
    border-bottom: 1px solid #bababa;
    padding-bottom: 5px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: white;
    border-radius: 10px;
    margin: 5em;
    margin-top: 0em;
    padding: 1em;
    gap: 1em;
`;