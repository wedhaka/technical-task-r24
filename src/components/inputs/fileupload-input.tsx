import styled from "styled-components";

interface FileUploadInputProps {
    handleUploadImages: (newList: []) => void;
}

export const FileUploadInput = ({handleUploadImages}: FileUploadInputProps) => {

  const handleUpload = (e: any) => {
    const files: any = Array.from(e.target.files);

    const newPlatesImages = files.map((file: File) => ({
      img: URL.createObjectURL(file),
    }));

    handleUploadImages(newPlatesImages);
    e.target.value = "";
  };

  return (
    <>
        <FileUploadBox for="file-upload">
            <InputSpan>Upload the Images</InputSpan>
        </FileUploadBox>
        <InputFile id="file-upload" type="file" multiple accept="image/*" onChange={handleUpload} />
    </>
  );
}


const FileUploadBox = styled.label`
    margin-left: 10px;
    display: flex;
`

const InputFile = styled.input`
    display: none;
`

const InputSpan = styled.span`
    border: 1px solid #ccc;
    cursor: pointer;
    width: auto;
    height: auto;
    line-height: 25px;
    color: white;
    background-color: black;
    border-radius: 5px;
    font-size: 14px;
    padding: 5px 10px;
`