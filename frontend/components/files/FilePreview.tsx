export default function FilePreview(
{
  url,
}: any
) {

  return (
    <iframe
      src={url}
      width="100%"
      height="600"
    />
  );
}