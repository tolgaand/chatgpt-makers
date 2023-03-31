import {
  Box,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { ExternalLinkIcon } from "@chakra-ui/icons";

type GetApiKeyPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const GetApiKeyPopup = (props: GetApiKeyPopupProps) => {
  const { isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="800px" background="#16171A">
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="16px" fontWeight="bold">
            API anahtarınızı&nbsp;
            <Link href="https://platform.openai.com/account/" isExternal>
              OpenAI
              <ExternalLinkIcon />
            </Link>
            &nbsp; sitesinden alabilirsiniz.
          </Text>

          <video
            src="get-api-key-video.mp4"
            width="100%"
            height="auto"
            controls
            autoPlay
            style={{
              display: "block",
              marginTop: "20px",
            }}
          ></video>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};
