import React from "react";

export const ErrorMessage: React.FC = () => {
  return (
    <article className="message is-danger">
      <div className="message-body">
        Ooops, something went wrong!
      </div>
    </article>
  )
}