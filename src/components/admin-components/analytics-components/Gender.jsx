import { useState, useEffect } from 'react';
import { firestore } from '../../../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

//  function TouristType() {
//   const [localCount, setLocalCount] = useState();
//   const [internationalCount, setInternationalCount] = useState();
//   const [data, setData] = useState();
//   const [activeIndex, setActiveIndex] = useState(0);

//   function onPieEnter(_, index) {
//     setActiveIndex(index);
//   }

//   useEffect(() => {
//     getDoc(doc(collection(firestore, 'admin'), 'analytics')).then((result) => {
//       const analytics = result.data();
//       setLocalCount(analytics['local'] == null ? 1 : analytics['local']);
//       setInternationalCount(analytics['international'] == null ? 1 : analytics['international']);
//     });
//   }, [])

//   const renderActiveShape = (props) => {
//     const RADIAN = Math.PI / 180;
//     const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
//     const sin = Math.sin(-RADIAN * midAngle);
//     const cos = Math.cos(-RADIAN * midAngle);
//     const sx = cx + (outerRadius + 10) * cos;
//     const sy = cy + (outerRadius + 10) * sin;
//     const mx = cx + (outerRadius + 30) * cos;
//     const my = cy + (outerRadius + 30) * sin;
//     const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//     const ey = my;
//     const textAnchor = cos >= 0 ? 'start' : 'end';

//     return (
//       <g>
//         <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
//           {payload.name}
//         </text>
//         <Sector
//           cx={cx}
//           cy={cy}
//           innerRadius={innerRadius}
//           outerRadius={outerRadius}
//           startAngle={startAngle}
//           endAngle={endAngle}
//           fill={fill}
//         />
//         <Sector
//           cx={cx}
//           cy={cy}
//           startAngle={startAngle}
//           endAngle={endAngle}
//           innerRadius={outerRadius + 6}
//           outerRadius={outerRadius + 10}
//           fill={fill}
//         />
//         <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
//         <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
//         <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
//         <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
//           {`(Rate ${(percent * 100).toFixed(2)}%)`}
//         </text>
//       </g>
//     );
//   };


//   useEffect(() => {
//     setData([{ international: internationalCount }, { local: localCount }])
//   }, [localCount, internationalCount])

//   return (
//     <div>
//       {
//         console.log(data)
//       }
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart width={400} height={400}>
//           <Pie
//             activeIndex={activeIndex}
//             activeShape={renderActiveShape}
//             data={data}
//             cx="50%"
//             cy="50%"
//             innerRadius={60}
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="value"
//             onMouseEnter={onPieEnter}
//           />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>

//   )
// }


import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={"#2CDDC7"}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={"#2CDDC7"}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={'fill'} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Count: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default class Gender extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-active-shape-y93si';

  state = {
    activeIndex: 0,
    localCount: 0,
    internationalCount: 0,
    data: [
      { name: 'male', value: 1 },
      { name: 'female', value: 1 },
    ]
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  componentDidMount(){
    this.updateData();
  }



  updateData = () => {
    getDoc(doc(collection(firestore, 'admin'), 'analytics')).then((result) => {
      const analytics = result.data();
      this.setState({
        localCount: analytics['male'] == null ? 1 : analytics['local'],
        internationalCount: analytics['female'] == null ? 1 : analytics['international']
      }, () => {
        this.setState({
          data: [
            { name: 'Male', value: this.state.internationalCount },
            { name: 'Female', value: this.state.localCount },
          ]
        })
      })
    });
  }

  render() {
    return (
      <div>
        <Title>Statistics By Gender</Title>
        <Container>
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={this.state.data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#59A7FF"
            dataKey="value"
            onMouseEnter={this.onPieEnter}
          />
        </PieChart>
        </Container>
      </div>

    );
  }
}

const Title = styled.h2`
  font-size: 16px;
  font-weight: 500;
  margin-top: 0px;
  text-align: center;
`;

const Container = styled.div`
  margin-top: -5em;
`;