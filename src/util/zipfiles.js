const zipFiles = (files) => {
  const zip = new JSZip();
  files.forEach((file) => {
    zip.file(file.name, file.content);
  });
  return zip.generateAsync({ type: "blob" });
}