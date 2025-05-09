import axios from 'axios';
import config from '../../config/config';

export async function exportProject(projectId: string) {
  const url = `${config.apiAddressV2}/export-project/${projectId}/tickets`;

  const response = await axios.get(url, {
    responseType: 'blob'
  });

  const contentDisposition = response.headers['content-disposition'];
  const fileName = contentDisposition
    ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
    : `tickets_${projectId}_${Date.now()}.csv`;

  const blob = new Blob([response.data], { type: 'text/csv' });
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
}
