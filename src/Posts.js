import React, { useState } from 'react';
import TextComponent from './TextComponent';
import Postdata from './Postsdata';

const Posts = () => {
  const [likes, setLikes] = useState({});

  const handleLikeClick = (postId, userId) => {
    setLikes((prevLikes) => {
      const updatedLikes = { ...prevLikes };
      
      // Check if the user has already liked
      if (!updatedLikes[postId] || !updatedLikes[postId][userId]) {
        // User has not liked, so add them
        updatedLikes[postId] = {
          ...updatedLikes[postId],
          [userId]: true,
        };
      } else {
        // User has liked, so remove their like
        delete updatedLikes[postId][userId];

        // If no more likes for the post, remove the post entry
        if (Object.keys(updatedLikes[postId]).length === 0) {
          delete updatedLikes[postId];
        }
      }

      return updatedLikes;
    });
  };

  // Retrieve user ID from localStorage
  const loggedInUserId = localStorage.getItem('user_id');
  return (
    <div className="posts">
      {Postdata.map((eachpost) => {
        const { id, fullname, role, postedtime, postdesc } = eachpost;
        const isLiked = likes[id] && likes[id][loggedInUserId];
        const likeCount = likes[id] ? Object.keys(likes[id]).length : 0;


        return (
          <div className="post" key={id}>
            <div className="postsec1">
              <div className="likeimage">
                <img src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg" alt="" />
              </div>
              <div className="profiledata">
                <p className="data1">{fullname}</p>
                <p className="data2">{role}</p>
                <p className="data3">{postedtime}</p>
              </div>
              <div className="verticaldots">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
              <div className="undo">
                <i className="fa-solid fa-close isize"></i>
              </div>
            </div>

            <hr style={{ padding: '0px', margin: '0px' }} />
            <div className="postsec2">
              <TextComponent text={postdesc} maxLength={75} />
              <div className="image-video">
                <img src="https://images.unsplash.com/photo-1707162796436-e716e46e7e49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D" alt="" />
              </div>
            </div>
            <div className="postsec3">
              <div className="likes">Likes: {likeCount}</div>
              <div className="comments"></div>
            </div>
            <div className="postsec4">
              <div className="icons">
                <div className="icon">
                <i onClick={() => handleLikeClick(id, loggedInUserId)} className={`${isLiked ? 'fa-solid fa-thumbs-up' : 'fa-regular fa-thumbs-up'}`}></i>
                  <br />
                  <div className="icontent">Like</div>
                </div>
                <div className="icon">
                  <i className="fa-regular fa-comment isize"></i>
                  <br />
                  <div className="icontent">Comment</div>
                </div>
                <div className="icon">
                  <i className="fa-solid fa-repeat isize"></i>
                  <br />
                  <div className="icontent">Repost</div>
                </div>
                <div className="icon">
                  <i className="fa-solid fa-paper-plane isize"></i>
                  <br />
                  <div className="icontent">Send</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
