import * as React from "react"
import { Modal } from "reactstrap"
import AddButton from "../components/buttons/AddButton"
import EditButton from "../components/buttons/EditButton"
import { ClientsActiveContext } from "../contexts/ClientsActiveContext"
import { GroupsActiveContext } from "../contexts/GroupsActiveContext"
import useModal from "../hooks/useModal"
import { ModalClientsData } from "../types/components"
import { ClientType } from "../types/models"
import FormClients from "./FormClients"
import { DummyClient } from "./helpers/dummies"

type Props = {
    currentClient?: ClientType
    inSentence?: boolean
    processAdditionOfClient?: (newClient: ClientType) => void
    refresh: (data: ModalClientsData) => void
}

/** Modální okno s formulářem pro klienty. Včetně tlačítek pro vyvolání přidání/úpravy. */
const ModalClients: React.FC<Props> = ({
    currentClient,
    inSentence = false,
    processAdditionOfClient,
    refresh
}) => {
    const [
        isModal,
        toggleModal,
        toggleModalForce,
        setFormDirty,
        ,
        processOnModalClose,
        tempData
    ] = useModal()

    const clientsActiveContext = React.useContext(ClientsActiveContext)
    const groupsActiveContext = React.useContext(GroupsActiveContext)

    function onModalClose(): void {
        processOnModalClose(() => {
            refresh(tempData)
            // projeveni zmen do aktivnich klientu
            clientsActiveContext.funcHardRefresh()
            // Je potreba projevit zmeny i pro cleny skupin, ALE POUZE kdyz se data
            // nepredavaji dal!!!
            // Tyka se komponenty Groups a zde upravy skupiny (ne pridani).
            // Duvod: obsahuje puvodni formular, ale take je zavisla na
            // groupsActiveContext - kvuli tomu se prekresli a tim padem se aktualni
            // formulare unmountnou z DOMu. U pridani ne, protoze tam se formular
            // pouze prekresli a nezavre.
            !processAdditionOfClient && groupsActiveContext.funcHardRefresh()
        })
    }

    return (
        <>
            {currentClient ? (
                <EditButton
                    contentId={currentClient.id}
                    content="Upravit klienta"
                    onClick={toggleModal}
                    data-qa="button_edit_client"
                />
            ) : (
                <AddButton
                    content={`${inSentence ? "přidejte nového" : "Přidat"} klienta`}
                    small={inSentence}
                    onClick={toggleModal}
                    data-qa="button_add_client"
                />
            )}
            <Modal isOpen={isModal} toggle={toggleModal} autoFocus={false} onClosed={onModalClose}>
                <FormClients
                    client={currentClient ? currentClient : DummyClient}
                    funcClose={toggleModal}
                    funcForceClose={toggleModalForce}
                    setFormDirty={setFormDirty}
                    funcProcessAdditionOfClient={processAdditionOfClient}
                />
            </Modal>
        </>
    )
}

export default ModalClients
