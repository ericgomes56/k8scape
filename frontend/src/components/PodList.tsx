import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPods = async (namespace: string) => {
  const url = namespace ? `/api/pods?namespace=${namespace}` : '/api/pods';
  const { data } = await axios.get(url);
  return data;
};

const PodList = ({ namespace, onPodClick }: { namespace: string; onPodClick: (pod: any) => void }) => {
  const { data, error, isLoading } = useQuery(['pods', namespace], () => fetchPods(namespace), { refetchInterval: 30000 });

  if (isLoading) return <div>Loading pods...</div>;
  if (error) return <div>Error loading pods!</div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Pods</h2>
      <ul className="space-y-2">
        {data.items.map((pod: any) => (
          <li
            key={pod.metadata.uid}
            className="cursor-pointer hover:text-blue-600"
            onClick={() => onPodClick(pod)}
          >
            {pod.metadata.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PodList;
