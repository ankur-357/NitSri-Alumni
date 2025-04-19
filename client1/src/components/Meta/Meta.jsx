import { useEffect } from "react"

const Meta = ({ name }) => {
    useEffect(() => {
        document.title = name || "Alumni - NIT Srinagar"
    })

    return null;
}

export default Meta