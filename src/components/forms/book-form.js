import React from 'react'

export default function bookform(props) { console.log("re-rendering from Book Form");
   return (
    
    <form onSubmit={props.handleSubmit}>
      <input 
          type="text"
          placeholder="Title"
          name="title"
          value={props.title}
          onChange={props.handleChange}
      />
      <input 
          type="text"
          placeholder="Author"
          name="author"
          value={props.author}
          onChange={props.handleChange}
      />
      <textarea 
          placeholder="Review"
          name="review"
          value={props.review}
          onChange={props.handleChange}
      ></textarea>
      <div className="recommendRow">
        <h3>Recommend Book</h3>
      <input 
          type="checkbox"
          name="recommend"
          checked={props.recommend}
          onChange={props.handleCheck}
      />
      </div>
  
      <button type="submit" className="submitButton">{props.submitText}</button>
    </form> 
   )
}