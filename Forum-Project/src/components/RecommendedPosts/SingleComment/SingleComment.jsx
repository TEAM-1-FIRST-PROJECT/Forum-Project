
const SingleComment = (props) => {

  const comment = props.value;
  return (
    <div>
      <div className="font-semibold text-gray-900">
        
        <div className='pl-3'>{comment.title}</div>
      </div>
      <div className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
        {comment.content}
      </div>
    </div>
  )
}

export default SingleComment

