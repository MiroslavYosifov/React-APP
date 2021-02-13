import browserImageCompression from 'browser-image-compression';

let imageCompression = async (imageFile) => {
    // console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
    let options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };

    return browserImageCompression(imageFile, options)
    .then((compressedFile) => {
        // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        return compressedFile;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export default imageCompression;