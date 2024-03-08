import { createContext, useState } from "react";
import runChat from "../Config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [previousPrompt,setPreviousPrompt] = useState("");
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState(" ");

    const [extended, setExtended] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleSidebar = () => {
        if(extended){
          setExtended(false);
        } else {
          setTimeout(()=>{
            setExtended(prev => !prev)},
            500);
        }
        setIsCollapsed(prev => !prev);
      };



    const delayPara = (index,nextWord) => {
        setTimeout(function (){
            setResultData(prev=>prev+nextWord);
        },75*index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    
    const onSent = async (user_prompt) => {

        setResultData(" ");
        setLoading(true);
        setShowResult(true);

        let responce;

        if(user_prompt !== undefined){
            responce = await runChat(user_prompt);
            setRecentPrompt(input);
        } else {
            setPreviousPrompt(prev=>[...prev,input])
            setRecentPrompt(input);
            responce = await runChat(input);
        }


        let responceArray = responce.split("**")
        let newRespose = "";

        for(let i =0;i<responceArray.length;i++){
            if(i===0 || i%2 !== 1){
                newRespose += responceArray[i];
            } else {
                newRespose += "<br/><b>"+ responceArray[i]+"</b>";
            }
        }

        let newRespose2 = newRespose.split("*").join("<br/>")

        let newRespose3 = newRespose2.split(" ");

        for(let i=0;i<newRespose3.length;i++){
            const nextWord = newRespose3[i];
            delayPara(i,nextWord+" ");
        }


        // setResultData(newRespose2);  
        setLoading(false);
        setInput("");


    }

    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        extended,
        setExtended,
        toggleSidebar,
        isCollapsed, 
        setIsCollapsed
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;