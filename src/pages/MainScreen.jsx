import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "../_assets/App.css";
import "../_assets/mainscreen.css";
import { addPost, fetchPosts } from "../redux/posts.slice";
import Modal from "../components/Modal";
import { BsArrowLeft } from "react-icons/bs";
import EditModal from "../components/EditModal";
import { v4 as uuidV4 } from "uuid";
import { sub } from "date-fns";
import Signup from "./Signup.jsx";
import Timestamp from "../components/Timestamp";

function MainScreen() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const posts = useSelector((state) => state.loadPosts);

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [buttonGreyOut, setButtonGreyOut] = useState("#cccccc");

  useEffect(() => {
    if (title && content !== "") {
      setButtonGreyOut("black");
    } else {
      setButtonGreyOut("#cccccc");
    }
  }, [title, content]);

  const handleSubmitSendPost = (e) => {
    e.preventDefault();
    dispatch(
      addPost({
        id: uuidV4(),
        title,
        content,
        username: currentUser,
        created_datetime: new Date().toISOString(),
      })
    );
    setTitle("");
    setContent("");
  };

  const handleChangeTitle = (text) => {
    setTitle(text);
  };

  const handleChangeContent = (text) => {
    setContent(text);
  };

  const [openEditModal, setOpenEditModal] = useState();
  const [openModal, setOpenModal] = useState();

  console.log({ posts });

  if (currentUser === "") {
    return <Signup />;
  } else {
    return (
      <div className="containerMainScreen">
        {openModal && <Modal deleteId={openModal} closeModal={setOpenModal} />}
        {openEditModal && (
          <EditModal editId={openEditModal} closeModal={setOpenEditModal} />
        )}
        <div className="bar">
          <BsArrowLeft className="icon" onClick={() => navigate("..")} />
          <h1>Codeleap</h1>
          <input
            type="text"
            className="searchBox"
            placeholder="Search"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          ></input>
        </div>
        <div className="boxPost">
          <h2 style={{ fontWeight: 700 }}>What's on your mind?</h2>
          <h2>Title</h2>
          <form onSubmit={handleSubmitSendPost}>
            <input
              type="text"
              placeholder="Hello World"
              name="name"
              value={title}
              onChange={(e) => handleChangeTitle(e.target.value)}
            ></input>
            <h2>Content</h2>
            <textarea
              placeholder="Content"
              name="content"
              value={content}
              onChange={(e) => handleChangeContent(e.target.value)}
            ></textarea>
            <button
              className="createButton"
              type="submit"
              style={{ backgroundColor: buttonGreyOut }}
              disabled={!title || !content}
            >
              CREATE
            </button>
          </form>
        </div>

        {posts
          .slice()
          .reverse()
          .filter((post) => {
            if (searchTerm == "") {
              return post;
            } else if (
              post.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return post;
            } else if (
              post.username.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return post;
            }
          })
          .map((post) => (
            <div className="boxPost" key={post.id}>
              <div className="bar1">
                <h1>{post.title}</h1>
                {currentUser === post.username ? (
                  <div className="bar">
                    <MdDeleteForever
                      className="icon"
                      onClick={() => {
                        setOpenModal(post.id);
                      }}
                    />
                    <FiEdit
                      onClick={() => {
                        setOpenEditModal(post.id);
                      }}
                      style={{
                        color: "white",
                        fontSize: "45px",
                        paddingLeft: "23px",
                      }}
                    />
                  </div>
                ) : null}
              </div>
              <div id="postowner">
                <div id="informations">
                  <h3>@{post.username}</h3>
                  <h3>
                    <Timestamp timestamp={post.created_datetime} />
                  </h3>
                </div>
                <br></br>
                <textarea
                  style={{ border: "none" }}
                  value={post.content}
                ></textarea>
              </div>
            </div>
          ))}
      </div>
    );
  }
}
export default MainScreen;
