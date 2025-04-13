
import React from 'react';
import { 
  RadarChart as RechartsRadarChart, 
  PolarGrid, 
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer
} from 'recharts';

interface RadarChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const RadarChart = ({ data }: RadarChartProps) => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Learner"
            dataKey="value"
            stroke="#4CAF50"
            fill="#4CAF50"
            fillOpacity={0.6}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;
