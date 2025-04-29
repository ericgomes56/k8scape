import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchNodes = async () => {
  const { data } = await axios.get('/api/nodes');
  return data;
};

const NodeList = () => {
  const { data, error, isLoading } = useQuery(['nodes'], fetchNodes, { refetchInterval: 30000 });

  if (isLoading) return <div>Loading nodes...</div>;
  if (error) return <div>Error loading nodes!</div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Nodes</h2>
      <ul className="space-y-2">
        {data.items.map((node: any) => (
          <li key={node.metadata.name}>{node.metadata.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default NodeList;
