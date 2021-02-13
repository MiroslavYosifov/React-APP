const convertImageToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            resolve(reader.result);
        }
    });
}
  
export default convertImageToBase64;