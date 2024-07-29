import './page.css'

import React from 'react';
import MarkdownRenderer from '../components/markdown';

import NavDir from '../components/navdir'
import { useParams } from 'react-router-dom';

const PostPage: React.FC = () => {
    const { writingsid } = useParams<{ writingsid: string }>();
    let file = "/posts/"+writingsid+".md"
    return (
        <>
            <div className="blogContainer">
                <div className="nav">
                    <div className="navdir"><NavDir></NavDir></div>
                    <div className="navdisplay"></div>
                </div>
                <div className="post">
                    <MarkdownRenderer filePath={file} />
                </div>
            </div>
        </>
    );
}

export default PostPage