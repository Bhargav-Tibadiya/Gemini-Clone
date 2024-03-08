import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../Assets/assets'
import { Context } from '../../Context/Context';

const Sidebar = () => {

  // const [extended, setExtended] = useState(true);
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const {onSent,previousPrompt,setRecentPrompt,newChat,extended,setExtended,toggleSidebar,isCollapsed,setIsCollapsed} = useContext(Context);


  const loadPrompt = async(prompt) => {
    setRecentPrompt(prompt);
    onSent(prompt);
  }

  // initialized coz normally giving error of undefiined
  const previousPrompt0 = previousPrompt || [];

  // const toggleSidebar = () => {
  //   if(extended){
  //     setExtended(false);
  //   } else {
  //     setTimeout(()=>{
  //       setExtended(prev => !prev)},
  //       500);
  //   }
  //   setIsCollapsed(prev => !prev);
  // };

  // console.log('prevPrompt:', prevPrompt);
  // console.log('promptList:', promptList);

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        
        <div className='top'>
          
          <img onClick={toggleSidebar} 
            className='menu' src={assets.menu_icon} alt="menu_icon" />
          
          <div onClick={()=>{newChat()}} className="new-chat">
            <img src={assets.plus_icon} alt="plus_icon" />  
            {extended ? <p>New Chat</p>: null }
            
          </div>

          {extended ? 
            <div className="recent">
              <p className='recent-title'>Recent</p> 
              {
                previousPrompt0.map((item,index)=>{
                  return(
                    <div onClick={()=>loadPrompt(item)} className="recent-entry" key={index}>
                      <img src={assets.message_icon} alt="message_icon" />
                      <p>{item.slice(0,20)}...</p>
                    </div>
                  )
                })
              }
              
            </div>
          : null }

          

        </div>

        <div className='bottom'>
          
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="question_icon" />
            {extended ? <p>Help</p>: null }
          </div>

          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="history_icon" />
            {extended ? <p>Activity</p>: null }
          </div>

          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="setting_icon" />
            {extended ? <p>Setting</p>: null }
          </div>


        </div>
    </div>
    
  )
}

export default Sidebar