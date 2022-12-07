import React, {useState} from 'react';
import AWS from 'aws-sdk';
import {accessKey, secretAccessKey, sessionToken} from '../apiCalls/tempCreds';

const S3_BUCKET = 'cc-a3';
const REGION = 'us-east-1';

AWS.config.update({
  // Check that this works when on an ec2 instance.
  accessKeyId: accessKey,
  secretAccessKey: secretAccessKey,
  sessionToken: sessionToken,
});

const myBucket = new AWS.S3({
  params: {Bucket: S3_BUCKET},
  region: REGION,
});

export const UploadImageToS3WithNativeSdk: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | undefined | null>();

  const uploadFile = (file: File | undefined | null) => {
    if (!file) return;

    // const renamedFile = renameFile('BensRenamedFile', file);
    console.log(process.env);

    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    myBucket
      .putObject(params)
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <div>
      <div>Native SDK File Upload Progress is {progress}%</div>
      <input
        type='file'
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
        }}
      />
      <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
  );
};

export default UploadImageToS3WithNativeSdk;
