import React from 'react';
import styled from 'styled-components';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Overview() {

  const [analyticsData, setAnalyticsData] = useState();
  const [day, setDay] = useState();
  const [logins, setLogins] = useState({});
  let loginsReference = {
    sunday: 0,
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thurdsday: 0,
    friday: 0,
    saturday: 0,
  }

  useEffect(() => {
    let analyticsReference = doc(collection(firestore, "admin"), "analytics");
    getDoc(analyticsReference).then((result) => {
      setAnalyticsData(result.data());
    })


    var today = new Date(Date.now());
    var month = today.getUTCMonth() + 1; //months from 1-12
    var day = today.getDate() - 7;
    var year = today.getUTCFullYear();
    var todayDate = year + "-" + month + "-" + day;
    today = new Date(todayDate)
    setDay(getDay(today.getDay()))

    let loginsDataReference = collection(doc(collection(firestore, "admin"), "analytics"), "logins");
    getDocs(loginsDataReference).then((results) => {
      console.log(results);
      results.forEach((result) => {
        if (logins != null) {
          loginsReference = logins;
        }
        console.log(Date.now(), today.getTime(), Date.now() - today.getTime())
        loginsReference[getDay(new Date(result.id).getUTCDay())] = result.data().logins;
        console.log(loginsReference);
        setLogins(loginsReference);
      })
    })

    console.log(Math.max(...Object.values(logins)));
  }, []);

  function getDay(day) {
    console.log(day)
    switch (day % 7) {
      case 0:
        return ("sunday");
      case 1:
        return ("monday");
      case 2:
        return ("tuesday");
      case 3:
        return ("wednesday");
      case 4:
        return ("thursday");
      case 5:
        return ("friday");
      case 6:
        return ("saturday");
      default:
        break;
    }
  }

  useEffect(() => {
    console.log(day);
    console.log(logins);
  }, [day, logins])




  return (
    <Container>
      <Header>
        <Title><h1>Overview</h1> <p>Improve your company's social profile</p></Title>
        <Profile>
          <Frame></Frame>
          <Name>Juan Dela Cruz</Name>
        </Profile>
      </Header>
      <Analytics>
        {/* <Data>
          <DataName>
            Daily App Visits
          </DataName>
          <DataInfo>
            <p>Total :  </p>
            <DataInfoVariable>{analyticsData && analyticsData.logins}</DataInfoVariable>
          </DataInfo>
          <DataInfo>
            <p>Today :  </p>
            <DataInfoVariable>{logins && logins[day] != null? logins[day] : 0}</DataInfoVariable>
            {
              console.log(logins)
            }
            {
              console.log(day)
            }
          </DataInfo>
        </Data> */}

        <DailyAppVisits>
          <h2>Daily App Visits</h2>
          <p></p>
          <DailyAppVisitsDays>
            <div className="dayContainer">
              <div className="bar">
                <div className="barCount">{logins && logins["sunday"] != null? logins["sunday"] : 0}</div>
                <div className="barDraw" style={{height: (logins && logins["sunday"] != null? logins["sunday"] : 0) * (170/(Math.max(...Object.values(logins)))) + 'px'}}></div>
              </div>
              <div className="day">Sun</div>
            </div>
            <div className="dayContainer">
              <div className="bar">
                <div className="barCount">{logins && logins["monday"] != null? logins["monday"] : 0}</div>
                <div className="barDraw" style={{height: (logins && logins["monday"] != null? logins["monday"] : 0) * (170/(Math.max(...Object.values(logins)))) + 'px'}}></div>
              </div>
              <div className="day">Mon</div>
            </div>
            <div className="dayContainer">
              <div className="bar">
                <div className="barCount">{logins && logins["tuesday"] != null? logins["tuesday"] : 0}</div>
                <div className="barDraw" style={{height: (logins && logins["tuesday"] != null? logins["tuesday"] : 0) * (170/(Math.max(...Object.values(logins)))) + 'px'}}></div>
              </div>
              <div className="day">Tue</div>
            </div>
            <div className="dayContainer">
              <div className="bar">
                <div className="barCount">{logins && logins["wednesday"] != null? logins["wednesday"] : 0}</div>
                <div className="barDraw" style={{height: (logins && logins["wednesday"] != null? logins["wednesday"] : 0) * (170/(Math.max(...Object.values(logins)))) + 'px'}}></div>
              </div>
              <div className="day">Wed</div>
            </div>
            <div className="dayContainer">
              <div className="bar">
                <div className="barCount">{logins && logins["thursday"] != null? logins["thursday"] : 0}</div>
                <div className="barDraw" style={{height: (logins && logins["thursday"] != null? logins["thursday"] : 0) * (170/(Math.max(...Object.values(logins)))) + 'px'}}></div>
              </div>
              <div className="day">Thu</div>
            </div>
            <div className="dayContainer">
              <div className="bar">
                <div className="barCount">{logins && logins["friday"] != null? logins["friday"] : 0}</div>
                <div className="barDraw" style={{height: (logins && logins["friday"] != null? logins["friday"] : 0) * (170/(Math.max(...Object.values(logins)))) + 'px'}}></div>
              </div>
              <div className="day">Fri</div>
            </div>
            <div className="dayContainer">
              <div className="bar">
                <div className="barCount">{logins && logins["saturday"] != null? logins["saturday"] : 0}</div>
                <div className="barDraw" style={{height: (logins && logins["saturday"] != null? logins["saturday"] : 0) * (170/(Math.max(...Object.values(logins)))) + 'px'}}></div>
              </div>
              <div className="day">Sat</div>
            </div>
          </DailyAppVisitsDays>
        </DailyAppVisits>
      </Analytics>
    </Container>
  )
}
const DailyAppVisitsDays = styled.div`
  margin: 5px;
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 200px;

  .dayContainer{
    display: flex;
    flex-direction: column;
    height: max-content;
    justify-content: space-between;
  }

  .bar{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-grow: 1;
  }

  .barDraw{
    background-color: #2759b6;
    width: 100%;
    min-height: 5px;
    border-radius: 3px;
  }

  .barCount{
    text-align: center;
  }

`;

const DailyAppVisits = styled.div``;

const DataInfoVariable = styled.p`
 
`;

const DataInfo = styled.div`
  display: flex;

  p{
    margin: 0px;
    padding: 0px;
  }
`;

const DataName = styled.h3`
  margin-bottom: 0px;
`;

const Data = styled.div``;

const Analytics = styled.div`
  display: flex;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
  padding-left: 1em;

  h1{
    margin-bottom: 0.1em;
  }
  p{
    margin-top: 0.1em;
  }
`;

const Profile = styled.div`
  display: flex;
  width: 200px;
  height: 3em;
  background-color: white;
  margin-right: 2em;
  border-radius: 10px;
  align-items: center;
  padding: 0px 10px;
  gap: 5px;
`;

const Frame = styled.div`
  width: 30px;
  height: 30px;
  background-color: gray;
  border-radius: 50%;
`;

const Name = styled.h3``;

