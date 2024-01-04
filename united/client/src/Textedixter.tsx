import React from 'react'
import {useQuill} from 'react-quilljs'
import 'quill/dist/quill.snow.css'
const Textedixter = () => {
  const { Quill, quillRef } = useQuill()
  return (
 
      <div style={{
        width:500,
        height:300
      }} >
<div ref={quillRef}/>
 
</div>
     

  )
}

export default Textedixter