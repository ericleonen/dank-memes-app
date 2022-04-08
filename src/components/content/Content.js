import { useState, useEffect } from 'react';

import { Post } from './post/Post';
import { Loader } from './loader/Loader'
import './Content.css'

export const Content = () => {

    const [posts, setPosts] = useState([]);
    const [isPostsLoading, setIsPostsLoading] = useState(true);

    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = async () => {

        console.log('Fetching memes...')

        fetch('https://www.reddit.com/r/dankmemes/new.json')
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                const loadMemes = res.data.children.map(({ data }) => ({
                    title: data.title,
                    url: data.url,
                    author: data.author,
                    ups: data.ups
                }));

                setPosts(loadMemes.filter(meme => (meme.url.includes('gif') || meme.url.includes('jpg'))));
                setIsPostsLoading(false);

                console.log('Memes fetched. Enjoy!');
            });
    };

    return (
        <div className="Content">
            { isPostsLoading ? 
                // not yet reading
                <Loader /> :

                // memes are ready!
                posts.map((post, i) => <Post title={post.title} 
                                             url={post.url} 
                                             key={'_' + i}
                                             author={post.author}
                                             ups={post.ups}
                                        />)
            }
        </div>
    );
}