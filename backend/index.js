const express = require('express');
const cors = require('cors');
const k8s = require('@kubernetes/client-node');

const app = express();
app.use(cors());
const port = 4000;

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const appsApi = kc.makeApiClient(k8s.AppsV1Api);

app.get('/api/nodes', async (req, res) => {
  try {
    const result = await k8sApi.listNode();
    res.json(result.body);
  } catch (err) {
    res.status(500).send('Error fetching nodes');
  }
});

app.get('/api/pods', async (req, res) => {
  try {
    const namespace = req.query.namespace;
    const result = namespace
      ? await k8sApi.listNamespacedPod(namespace)
      : await k8sApi.listPodForAllNamespaces();
    res.json(result.body);
  } catch (err) {
    res.status(500).send('Error fetching pods');
  }
});

app.get('/api/deployments', async (req, res) => {
  try {
    const result = await appsApi.listDeploymentForAllNamespaces();
    res.json(result.body);
  } catch (err) {
    res.status(500).send('Error fetching deployments');
  }
});

app.get('/api/namespaces', async (req, res) => {
  try {
    const result = await k8sApi.listNamespace();
    res.json(result.body);
  } catch (err) {
    res.status(500).send('Error fetching namespaces');
  }
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
