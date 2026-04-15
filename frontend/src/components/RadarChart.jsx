import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

export default function RadarGraph({ data }) {
  return (
    <RadarChart cx="50%" cy="50%" outerRadius="80%" width={500} height={400} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 1]} />
      <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
    </RadarChart>
  );
}
