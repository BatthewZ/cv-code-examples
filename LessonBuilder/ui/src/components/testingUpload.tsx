import {useEffect, useState} from 'react';
import {apiCall} from '../apiCalls/apiCalls';
import UploadImageToS3WithNativeSdk from '../testing/UploadImageTos3WithNativeSdk';

export const TestingUpload: React.FC = () => {
  const [file, setFile] = useState<FileList | null>();

  useEffect(() => {
    if (!file || !file[0]) return;
    console.log(file);
    console.log(file[0]);

    if (file[0].size > 5 * 1024 * 1024) {
      console.log('--- Fake Error: File Size Too large! (file size exceeds 5mb)');
    }
  }, [file]);
  return (
    <div>
      <UploadImageToS3WithNativeSdk />
      {/* <h2>Upload:</h2>
      <input
        type='file'
        onChange={(e) => {
          setFile(e.currentTarget.files);
        }}
      />
      <br></br>
      <button
        className='btn'
        onClick={() => {
          if (file && file[0]) apiCall.testingUpload(file[0]);
        }}
      >
        Upload
      </button> */}
    </div>
  );
};
