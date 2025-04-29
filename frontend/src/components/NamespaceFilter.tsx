import { useEffect, useState } from 'react';
import axios from 'axios';

const NamespaceFilter = ({ onSelect }: { onSelect: (namespace: string) => void }) => {
  const [namespaces, setNamespaces] = useState<string[]>([]);

  useEffect(() => {
    const fetchNamespaces = async () => {
      const { data } = await axios.get('/api/namespaces');
      setNamespaces(data.items.map((ns: any) => ns.metadata.name));
    };
    fetchNamespaces();
  }, []);

  return (
    <select onChange={(e) => onSelect(e.target.value)} className="p-2 rounded border">
      <option value="">All Namespaces</option>
      {namespaces.map(ns => (
        <option key={ns} value={ns}>{ns}</option>
      ))}
    </select>
  );
};

export default NamespaceFilter;
