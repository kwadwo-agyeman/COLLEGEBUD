# CollegeBuddy

#### local storage code/logic
    ///get items from local storage
    const storedFormData = localStorage.getItem(`FormData${index}`);
    if (storedFormData) {
      setFormData((prevFormData) => {
        const updatedFormData = [...prevFormData];
        updatedFormData[index] = JSON.parse(storedFormData);
        return updatedFormData;
      });
    }
    const storedFormMedia = localStorage.getItem(`FormMedia${index}`);
    if (storedFormMedia) {
      const parsedFormMedia = JSON.parse(storedFormMedia);
    
    
      setSelectedImage((prevFormMedia) => {
        const updatedFormMedia = [...prevFormMedia];
        updatedFormMedia[index] = parsedFormMedia.map((item) => {
          // Convert Base64 to Blob
          const byteCharacters = atob(item.fileData);
          const byteArrays = [];
          for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays.push(byteCharacters.charCodeAt(i));
          }
          const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/png' });
    
          return {
            url: URL.createObjectURL(blob),
            fileData: new File([blob], item.fileData.name),
          };
        });
        return updatedFormMedia;
      });
    }
///save to local storage.
    if (modalStates[index]) {
      localStorage.setItem(`FormData${index}`, JSON.stringify(formData[index]));
      //blob--to--base64
      const blobToBase64 = async (blob) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      };

      // Convert Blob data to base64
      const imagesBase64 = await Promise.all(
        selectedImage[index].map(async (item) => ({
          url: item.url,
          fileData: item.fileData ? await blobToBase64(item.fileData) : null,
        }))
      );
  
      localStorage.setItem(`FormMedia${index}`, JSON.stringify(imagesBase64));
    }
### coverting blob to base64
      //blob--to--base64
      const blobToBase64 = async (blob) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      };

      // Convert Blob data to base64
      const imagesBase64 = await Promise.all(
        selectedImage[index].map(async (item) => ({
          url: item.url,
          fileData: item.fileData ? await blobToBase64(item.fileData) : null,
        }))
      );

      localStorage.setItem(`FormMedia${index}`, JSON.stringify(imagesBase64));
## converting ASCII to binary
    const storedFormMedia = localStorage.getItem(`FormMedia${index}`);
    if (storedFormMedia) {
      const parsedFormMedia = JSON.parse(storedFormMedia);

      setSelectedImage((prevFormMedia) => {
        const updatedFormMedia = [...prevFormMedia];
        updatedFormMedia[index] = parsedFormMedia.map((item) => {
          // Convert Base64 to Blob
          const byteCharacters = atob(item.fileData);
          const byteArrays = [];
          for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays.push(byteCharacters.charCodeAt(i));
          }
          const blob = new Blob([new Uint8Array(byteArrays)], {
            type: "image/png",
          });

          return {
            url: URL.createObjectURL(blob),
            fileData: new File([blob], item.fileData.name),
          };
        });
        return updatedFormMedia;
      });
    }
### local storage for form data
    ///get items from local storage
    const storedFormData = localStorage.getItem(`FormData${index}`);
    if (storedFormData) {
      setFormData((prevFormData) => {
        const updatedFormData = [...prevFormData];
        updatedFormData[index] = JSON.parse(storedFormData);
        return updatedFormData;
      });
    }


  ///save to local storage
  const saveToLocalStorage = async (index) => {
    if (modalStates[index]) {
      //localStorage.setItem(`FormData${index}`, JSON.stringify(formData[index]));
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  };
  
//    const storedFormData = localStorage.getItem("formData");

//if(storedFormData){
      setFormData(JSON.parse(storedFormData))
    }