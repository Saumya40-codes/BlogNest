import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { Badge, ToggleButton } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const NewBlog = () => {
    const navigate = useNavigate();
    function handleNewBlog() {
        navigate("/write-blog");
    }
  return (
    <>
        <Badge variant="success" as={ToggleButton} onClick={handleNewBlog}>
        Create new Blog <FaPlus />
        </Badge>
    </>
  )
}

export default NewBlog
