const PodDetails = ({ pod, onClose }: { pod: any; onClose: () => void }) => {
  if (!pod) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded p-6 w-full max-w-lg shadow-lg relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>✖️</button>
        <h2 className="text-2xl font-bold mb-4">Pod: {pod.metadata.name}</h2>
        <div className="space-y-2">
          <p><strong>Namespace:</strong> {pod.metadata.namespace}</p>
          <p><strong>Status:</strong> {pod.status.phase}</p>
          <p><strong>Node:</strong> {pod.spec.nodeName}</p>
          <p><strong>Labels:</strong> {JSON.stringify(pod.metadata.labels)}</p>
          <p><strong>Start Time:</strong> {pod.status.startTime}</p>
        </div>
      </div>
    </div>
  );
};

export default PodDetails;
