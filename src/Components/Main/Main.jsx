import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../Assets/assets'
import { Context } from '../../Context/Context'

const Main = () => {

    const {previousPrompt,setPreviousPrompt,onSent,recentPrompt,setRecentPrompt,showResult,loading,resultData,input,setInput,newChat,extended,setExtended,toggleSidebar,isCollapsed,setIsCollapsed} = useContext(Context)

    const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        onSent();
        console.log("Enter Pressed")
    }
}

  return (
    <div className='main'>
        
        <div className="nav">
            <p onClick={()=>{newChat()}}>Gemini 2.0</p>
            <img onClick={toggleSidebar} src={assets.user_icon} alt="user_icon" />
        </div>

        <div className="main-container">

            {
                !showResult ? 
                <>
                     <div className="greet">
                        <p> <span> Hello , Bhargav </span> </p>
                        <p> How can I help you today ?</p>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <p>Suggest me some best place to visit this holiday. </p>
                            <img src={assets.compass_icon} alt="compass_icon" />
                        </div>
                        <div className="card">
                            <p>Summarize this concept : Green house effect. </p>
                            <img src={assets.bulb_icon} alt="bulb_icon" />
                        </div>
                        <div className="card">
                            <p>Write a essay on Chess ... </p>
                            <img src={assets.message_icon} alt="message_icon}" />
                        </div>
                        <div className="card">
                            <p>Write a code in JavaScript to show use of UseState hook. </p>
                            <img src={assets.code_icon} alt="code_icon" />
                        </div>
                    </div>
                </> 
                : 
                <>
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="user_icon" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="gemini_icon" />
                            {
                                loading ? 
                                <>
                                    <div className="loader">
                                        <hr />
                                        <hr />
                                        <hr />
                                    </div>
                                </>
                                :
                                <>
                                    <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                                </>
                            }
                            
                        </div>
                    </div>
                </>
            }

           

            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} onKeyDown={handleKeyDown} className="text" placeholder='Enter a prompt here'></input>
                    <div>
                        <img src={assets.gallery_icon} alt="gallery_icon" />
                        <img src={assets.mic_icon} alt="mic_icon" />
                        {
                            input ? <img onClick={()=>onSent()}   src={assets.send_icon} alt="send_icon" /> : null
                        }
                        
                        
                    </div>
                </div>
                <p className="bottom-info">
                    This is Testing Version, Dont relate to any information. Information might be incorrect. <br/>
                    Formate for programming is still not done yet.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main