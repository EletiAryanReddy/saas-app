import admin, { bucket } from "./firebase.service";

export const uploadToFirebase = async (
  file: Express.Multer.File
) => {
  const fileName =
    `${Date.now()}-${file.originalname}`;

  const firebaseFile =
    bucket.file(fileName);

  await firebaseFile.save(
    file.buffer,
    {
      metadata: {
        contentType:
          file.mimetype,
      },
    }
  );

  await firebaseFile.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
};