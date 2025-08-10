import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog"
import { Button, ButtonText } from "../ui/button"
import { Heading } from "../ui/heading"
import { Text } from "../ui/text"

type SimpleAlertProps = {
  heading: string
  body: string
  isOpen: boolean
  onConfirm: () => void
  onClose: () => void
}

export function SimpleAlert({ heading, body, isOpen, onClose, onConfirm }: SimpleAlertProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading>{heading}</Heading>
          <AlertDialogCloseButton />
        </AlertDialogHeader>
        <AlertDialogBody className="mt-3 mb-5">
          <Text>{body}</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button action="secondary" className="rounded-lg" onPress={onClose}>
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button className="rounded-lg" onPress={handleConfirm}>
            <ButtonText>Confirm</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
