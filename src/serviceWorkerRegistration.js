import { Workbox } from 'workbox-window';

export default function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('service-worker.js');
    if (!wb) return;

    wb.addEventListener('installed', (event) => {
      if (event.isUpdate) {
        window.location.reload();
      }
    });

    wb.register();
  }
}
