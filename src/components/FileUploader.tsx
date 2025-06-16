import { useState, type ChangeEvent } from "react";
import axios from "axios";

interface FileUploaderProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export default function FileUploader(props: FileUploaderProps) {
    type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';
    const [UploadStatus, setUploadStatus] = useState<UploadStatus | 'idle'>();
    const [UploadProgress, setUploadProgress] = useState<number>(0);

    async function handleFileUpload(){
        if (!props.file) return;

        setUploadStatus('uploading');
        const formdata = new FormData();
        formdata.append('file', props.file);

        try{
            await axios.post('https://httpbin.org/post', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent : ProgressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        setUploadProgress(progress);
                    }
                }
            } as any);
            setUploadStatus('success');
            setUploadProgress(100);
        } catch {
            setUploadStatus('error');
            setUploadProgress(0);
        }
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            props.setFile(e.target.files[0]);
        }
    }

    return (
    <>
    <div className="file-uploader">
        <input type="file" onChange = {handleFileChange}/>
        {props.file && UploadStatus != 'uploading' &&
        <button onClick ={handleFileUpload}></button>
        }
    </div>
    </>
    )
}

