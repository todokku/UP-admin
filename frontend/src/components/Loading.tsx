import { faSpinnerThird } from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as React from "react"
import { Alert } from "reactstrap"

const LONG_LOADING_THRESHOLD = 5 // sekundy
const OVERLONG_LOADING_THRESHOLD = 25 // sekundy

const LOADING_STATE = Object.freeze({
    NORMAL_LOADING: 0,
    LONG_LOADING: 1,
    OVERLONG_LOADING: 2
})

type Props = {
    text?: string
}

/** Komponenta zobrazující načítání v aplikaci. */
const Loading: React.FC<Props> = ({ text = "Načítání" }) => {
    const [loadingState, setLoadingState] = React.useState(LOADING_STATE.NORMAL_LOADING)

    function setLoadingTimeout(loadingState: number): number {
        return window.setTimeout(
            () => setLoadingState(loadingState),
            (loadingState === LOADING_STATE.LONG_LOADING
                ? LONG_LOADING_THRESHOLD
                : OVERLONG_LOADING_THRESHOLD) * 1000
        )
    }

    React.useEffect(() => {
        const timeoutId = setLoadingTimeout(LOADING_STATE.LONG_LOADING)
        return (): void => window.clearTimeout(timeoutId)
    }, [])

    React.useEffect(() => {
        const timeoutId = setLoadingTimeout(LOADING_STATE.OVERLONG_LOADING)
        return (): void => window.clearTimeout(timeoutId)
    }, [])

    return (
        <div className="text-center mt-2" data-qa="loading">
            <FontAwesomeIcon icon={faSpinnerThird} spin size="3x" />
            <br />
            {text}...
            {loadingState === LOADING_STATE.LONG_LOADING && " Stále pracuji 😎"}
            {loadingState === LOADING_STATE.OVERLONG_LOADING && (
                <Alert color="warning" className="mt-1">
                    ⚠ Načítání trvá příliš dlouho, mohlo dojít k chybě. Zkuste stránku načíst znovu.
                </Alert>
            )}
        </div>
    )
}

export default Loading
