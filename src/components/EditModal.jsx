import React, { useState, useEffect } from "react";
import "../_assets/modaledit.css";
import { useDispatch, useSelector } from "react-redux";

import { editPost } from "../redux/posts.slice";

export function EditModal({ closeModal, editId }) {
  const post = useSelector((state) =>
    state.loadPosts.find((post) => post.id === editId)
  );
  const dispatch = useDispatch();

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);

  const [buttonGreyOut, setButtonGreyOut] = useState("#cccccc");

  useEffect(() => {
    if (title && content !== "") {
      setButtonGreyOut("black");
    } else {
      setButtonGreyOut("#cccccc");
    }
  }, [title, content]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = (e) => {
    e.preventDefault();
    dispatch(editPost({ id: editId, title, content }));
    closeModal(false);
  };

  return (
    <div className="editmodalbackground">
      <div className="editmodalcontainer">
        <div className="title">
          <h1>Edit item</h1>
        </div>
        <h2>Title</h2>
        <form>
          <input
            type="text"
            placeholder="Hello World"
            name="name"
            value={title}
            onChange={onTitleChanged}
          ></input>
          <h2>Content</h2>
          <textarea
            placeholder="Content"
            name="content"
            value={content}
            onChange={onContentChanged}
          ></textarea>

          <button
            onClick={onSavePostClicked}
            disabled={!title || !content}
            style={{ backgroundColor: buttonGreyOut }}
          >
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
