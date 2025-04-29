import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPodMetrics = async () => {
  const { data } = await axios.get('/api/pod-metrics');
  return data;
};

const PodMetrics = () => {
  const { data, error, isLoading } = useQuery(['pod-metrics'], fetchPodMetrics, { refetchInterval: 30000 });

  if (isLoading) return <div>Loading pod metrics...</div>;
  if (error) return <div>Error loading metrics!</div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Pod Metrics</h2>
      <ul className="space-y-2">
        {data.items.map((pod: any) => (
          <li key={pod.metadata.name}>
            {pod.metadata.name}: CPU {pod.containers[0].usage.cpu}, Memory {pod.containers[0].usage.memory}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PodMetrics;
