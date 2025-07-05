export const zipFiles = async (files) => {
  const zip = new JSZip();
  files.forEach((file) => {
    zip.file(file.name, file.content);
  });
  return await zip.generateAsync({ type: "blob" });
}
