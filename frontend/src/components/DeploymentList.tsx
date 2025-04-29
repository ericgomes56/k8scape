import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchDeployments = async () => {
  const { data } = await axios.get('/api/deployments');
  return data;
};

const DeploymentList = ({ namespace }: { namespace: string }) => {
  const { data, error, isLoading } = useQuery(['deployments'], fetchDeployments, { refetchInterval: 30000 });

  if (isLoading) return <div>Loading deployments...</div>;
  if (error) return <div>Error loading deployments!</div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Deployments</h2>
      <ul className="space-y-2">
        {data.items.map((deploy: any) => (
          <li key={deploy.metadata.uid}>{deploy.metadata.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DeploymentList;
