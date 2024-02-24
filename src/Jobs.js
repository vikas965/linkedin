import React from 'react'
import TextComponent from './TextComponent'

const Jobs = () => {

  
  return (
    <section>
      <div className="jobs-container">
        <div className="job">
          <h3>Recommended for you </h3>
          <div className="notification">
          <div className="notimage"><img src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg" alt="" /></div>
          <div className="content">
          <TextComponent text='Mahanthi vikas Posted : I am thriiled to share this project India (remote)' maxLength={43}/>
      
          <p style={{color:"grey"}}>India (remote)</p>

        <p > <span style={{color:"green"}}>9 hours ago</span>
         <span style={{fontSize:"12px",color:"blue"}}>🔗Easy Apply</span> </p>
          </div>
          <div className="time">
          <i className="fa-regular fa-bookmark"></i>

          </div>

        </div>
        </div>
      </div>
    </section>
  )
}

export default Jobs
