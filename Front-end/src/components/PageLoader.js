import React from "react";

export default function PageLoader() {
    return (
        <div style={{zIndex: 1030}} className="d-flex position-fixed flex-column justify-content-center align-items-center top-0 bottom-0 start-0 end-0 bg-light">
            <div className="loader mb-4"></div>
        </div>

    )
}