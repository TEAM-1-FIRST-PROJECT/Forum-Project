import { useParams } from "react-router-dom";
import { getPostById } from "../../services/posts.service";
import { useEffect, useState } from "react";
import SinglePost from "../../views/SinglePost/SinglePost";

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        getPostById(id)
            .then((postData) => {
                setPost(postData);
            })
            .catch((error) => {
                console.error("Error fetching post details:", error);
                setPost(null);
            });
    }, [id]);
    //const author = post.author
//console.log(author)
    return (
        <div className="container mx-auto mt-5 p-5">
            {post ? (
                <SinglePost value={post} />
            ) : (
                <div className="text-red-500">Post not found</div>
            )}
        </div>
    );
};

export default PostDetails;

