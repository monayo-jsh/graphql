import React from "react";

const Link = (props) => {
    const { link } = props
    const { url, description } = link
    return (
        <div>
            <div>
                {description} ({url})
            </div>
        </div>
    )
}

export default Link