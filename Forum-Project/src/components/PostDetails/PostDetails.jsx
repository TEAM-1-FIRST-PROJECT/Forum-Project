import { useParams } from "react-router-dom";
import { getPostById } from "../../services/posts.service";
import { useEffect, useState } from "react";
import SinglePost from "../../views/SinglePost/SinglePost";
import Comments from "../Comments/Comments";

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

    return (
        <div className=" bg-fixed bg-hero-pattern bg-contain">
        <div className="container mx-auto mt-5 p-5">
            {post ? (
                <>
                    <SinglePost value={post} />
                    <Comments value={id}></Comments>
                </>
            ) : (
                <div className="text-red-500">Post not found</div>
            )}
        </div>
        </div>
    );
};

export default PostDetails;

