import { useState } from "react";
import "./App.css";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const [speechState, setSpeechState] = useState(false);

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition()
 


  if (!browserSupportsSpeechRecognition) {
    toast.error("Browser doesn't support speech recognition.", {  
      theme: "dark"
      });
  }
  if (!isMicrophoneAvailable) {
    toast.error("Browser doesn't support microphone", { 
      theme: "dark"
      });
  }

  const startListening = () =>{
    SpeechRecognition.startListening({ continuous: true , language:'en-IN'});

  } 

  const handleOnChange = () => {
    if (!speechState) {
      setSpeechState(true);
      startListening();
    } else {
      setSpeechState(false);
      SpeechRecognition.stopListening();
    }
  };

  const handleCopyClick = async () => {
    try {
        await window.navigator.clipboard.writeText(transcript);
        toast.success("Copied to clipboard!",{
          theme:"dark"
        });
    } catch (err) {
        toast.error(
            "Unable to copy to clipboard.",{
              theme:"dark"
            }
          
        );
        toast.error("Copy to clipboard failed.",{
          theme:"dark"
        });
    }
};
const downloadFile = () => {
  const blob = new Blob([transcript], { type: "text/plain" });
  const link = document.createElement("a");
  link.download = "download.txt";
  link.href = URL.createObjectURL(blob);
  link.click();
};
  return (
    <>
    <div className="font-sans flex flex-col items-start text-slate-200 bg-slate-950 w-[450px] p-8">
        <h1 className="text-3xl font-bold">Speech To Text</h1>
        <p className="text-sm py-3">Convert your speech to text.</p>
        <span
          onClick={handleOnChange}
          className="bg-black rounded-[5px] w-96 my-4 py-5 flex text-sm font-medium items-center justify-center hover:cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
            />
          </svg>
          Start/Stop
        </span>
        
        <div class="flex flex-row gap-16 px-4 pb-2"> 
        <div onClick={handleCopyClick}>
       <ContentCopyOutlinedIcon />
       </div>
       <div>
        <DeleteOutlineOutlinedIcon onClick={resetTranscript}/>
       </div>
       <div onClick={downloadFile}>
    <FileDownloadOutlinedIcon />
       </div>
        </div>
       
       
   

         
        <textarea
          className="my-6 w-96 h-full min-h-[200px] p-4 rounded-[5px] border border-blue-gray-200 bg-transparent"
          placeholder="Your speech will appear here..."
          value={transcript}
          readOnly
        />

        <p>
        
          {speechState ? (
           <div class="flex gap-2 justify-center items-center">
           <div class=" h-5 w-5 rounded-full bg-green-600"></div>
           <p>Speech Recognition is active</p>
           </div>
           
                ) : ( 
                  <div class="flex gap-2 justify-center items-center ">
                  <div class="h-5 w-5 rounded-full bg-red-600"></div>
                  <p>Speech Recognition is not active</p>
                  </div>
             )}
        </p>
      </div>
      <ToastContainer
theme="dark"
/>
    </>
  );
}

export default App;