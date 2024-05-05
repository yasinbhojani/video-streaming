export const getAllFolders = async () => {
  const req = await fetch("http://localhost:8000/videos");
  const folders = await req.json();
  return folders;
};