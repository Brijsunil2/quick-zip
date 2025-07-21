import JSZip from "jszip";

self.onmessage = async (e) => {
  const { files } = e.data;
  const zip = new JSZip();

  for (const file of files) {
    const content = await file.arrayBuffer();
    zip.file(file.name, content);
  }

  zip.generateAsync({ type: "blob" }, (metadata) => {
    self.postMessage({ type: "progress", percent: metadata.percent });
  }).then((blob) => {
    self.postMessage({ type: "done", blob });
  });
};