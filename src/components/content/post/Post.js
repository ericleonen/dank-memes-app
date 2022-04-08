import './Post.css';

export const Post = (props) => {
    return (
        <div className="Post">
            <p>Posted by u/{props.author}</p>
            <h2>{props.title}</h2>
            <img src={props.url}/>
        </div>
    );
}