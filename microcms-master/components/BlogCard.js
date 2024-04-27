import React from "react";
import index from "../pages/index";

const BlogCard = (props) => {
    let blogId = props.blogId;
    let blogImg = props.blogImg;
    let blogDate = props.blogDate;
    let blogTitle = props.blogTitle;
    let blogDescription = props.blogDescription;
    //console.log(blogId);
    return (
        <li key={blogId}>      
            <div className="top-content">
                <img src={blogImg}></img>
            </div>
            <div className="bottom-content">
                <p className="date">{blogDate}</p>
                <a className="title" href={`/blogs/${blogId}`}>{blogTitle}</a>
                <div class="description">
                    <p>{blogDescription}</p>
                </div>
            </div>
        </li>
    )
}

export default BlogCard