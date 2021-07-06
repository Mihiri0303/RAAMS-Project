import React from 'react';
import imge from './../asset/First.jpg';


const Home = () => {
        return (
          <>
            <section className='container'>
              <div className='d-flex align-items-center '>
                <img src={imge} style={{height : '100%',width : 600, marginTop: 90}}/>
                <div className="">
                  <p className="h1 mt-1 mb-1 text-end fw-bolder">PLAN YOUR TOUR TODAY</p>
                  <p className="mt-4 mb-5  text-end"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio cupiditate ipsam, molestiae perferendis, saepe ab vel ratione modi minima nisi rerum error quisquam similique esse earum, dignissimos quibusdam odio cumque delectus dolores.</p>
                </div>
              </div>
            </section>
          </>
)
} 

export default Home