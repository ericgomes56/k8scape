import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import NodeList from './components/NodeList';
import PodList from './components/PodList';
import DeploymentList from './components/DeploymentList';
import PodDetails from './components/PodDetails';
import PodMetrics from './components/PodMetrics';
import NamespaceFilter from './components/NamespaceFilter';

const queryClient = new QueryClient();

function App() {
  const [selectedPod, setSelectedPod] = useState<any>(null);
  const [namespace, setNamespace] = useState<string>('');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold mb-8">k8scape</h1>
        <NamespaceFilter onSelect={setNamespace} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <NodeList />
          <DeploymentList namespace={namespace} />
          <PodList namespace={namespace} onPodClick={setSelectedPod} />
          <PodMetrics />
        </div>

        {selectedPod && <PodDetails pod={selectedPod} onClose={() => setSelectedPod(null)} />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
