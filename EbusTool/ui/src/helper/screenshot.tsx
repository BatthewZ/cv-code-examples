import html2canvas from 'html2canvas';
import {emitMsg} from '../websocket/websocket';

export function screenshot(elementId: string, fileName: string, filePath: string) {
  // Send to backend for saving

  const element = document.getElementById(elementId);
  if (element) {
    console.log('Doing thing');
    html2canvas(element).then((canvas) => {
      canvas.toBlob((blob) => {
        emitMsg('saveImg', {
          img: blob,
          fileName: fileName + (fileName.includes('.jpg') ? '' : '.jpg'),
          filePath: filePath + '/',
        });
      });

      // Initiate download to local downloads folder:

      //   var a = document.createElement('a');
      //   a.href = canvas.toDataURL('./mySavedImg/').replace('image/jpg', 'image/octet-stream');
      //   a.download = fileName + (fileName.includes('.jpg') ? '' : '.jpg');
      //   a.click();
    });
  } else console.log('Not doing thing');
}
