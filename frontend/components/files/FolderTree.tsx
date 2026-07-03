export default function FolderTree({
  files,
}: any) {
  return (
    <div>
      {files.map(
        (file: any) => (
          <div
            key={file._id}
          >
            📄 {file.fileName}
          </div>
        )
      )}
    </div>
  );
}