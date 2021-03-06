import * as React from "react"
import { Button, ButtonProps } from "reactstrap"
import { noop } from "../../global/utils"

interface Props extends ButtonProps {
    content: React.ReactNode
}

/** Obecné tlačítko v rámci aplikace. */
const CustomButton: React.FC<Props> = ({ onClick = noop, content = "", disabled = false, id }) => (
    <Button color="secondary" disabled={disabled} onClick={onClick} id={id}>
        {content}
    </Button>
)

export default CustomButton
