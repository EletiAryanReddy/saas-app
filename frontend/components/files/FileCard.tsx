export default function FileCard(
{
  file,
}: any
) {

  return (
    <div>

      <h3>
        {file.fileName}
      </h3>

      <a
        href={file.fileUrl}
        target="_blank"
      >
        Open
      </a>

    </div>
  );
}