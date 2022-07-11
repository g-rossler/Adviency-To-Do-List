import { useState } from "react";
import {
  Input,
  Button,
  ListItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Image,
  FormControl,
  FormLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
} from "@chakra-ui/react";
import imgLogo from "../image/heroicons-camera-basic.svg";

export default function Gift({
  id,
  text,
  quantity,
  imageLink,
  receiver,
  handleDelete,
  handleChangeData,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [giftDetail, setGiftDetail] = useState({
    text: text,
    quantity: quantity,
    imageLink: imageLink,
    receiver: receiver,
    id: id
  });

  const handleChangeGiftData = (e) => {
    const { name, value } = e.target;

    setGiftDetail((prevGiftDetail) => {
      return {
        ...prevGiftDetail,
        [name]: value,
      };
    });
  };

  const handleChangeQuantityItem = (e) => {
    setGiftDetail((prevGiftDetail) => {
      return {
        ...prevGiftDetail,
        quantity: e,
      };
    });
  };

  return (
    <HStack
      align="center"
      mb={3}
      key={id}
      justify="space-between"
      overflow="auto"
      h="auto"
    >
      <ListItem textColor="#f8f4ff" minW="50%">
        {giftDetail.text}
      </ListItem>
      <Button onClick={onOpen} w="full">
        Details
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">{giftDetail.text}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems="start" mb={3}>
              <FormLabel htmlFor="gift-quantity">Gift Quantity:</FormLabel>
              <NumberInput
                w="30%"
                color="white"
                _placeholder={{ textColor: "white" }}
                min={1}
                allowMouseWheel
                onChange={(e) => handleChangeQuantityItem(e)}
                value={giftDetail.quantity}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
            <VStack alignItems="start">
              <FormLabel htmlFor="gift-image">Image:</FormLabel>
              <HStack w="full">
                <Input
                  _placeholder={{ textColor: "#f8f4ff" }}
                  color="f8f4ff"
                  onChange={(e) => handleChangeGiftData(e)}
                  value={giftDetail.imageLink || ''}
                  textColor="white"
                  placeholder={giftDetail.imageLink || ''}
                  id="gift-image"
                  w="90%"
                  name="imageLink"
                ></Input>
                <Image
                  boxSize="40px"
                  src={giftDetail.imageLink || imgLogo}
                  alt="Gift img"
                />
              </HStack>
              <FormLabel htmlFor="gift-receiver">Receiver:</FormLabel>
              <Input
                value={giftDetail.receiver}
                name="receiver"
                onChange={(e) => {
                  handleChangeGiftData(e);
                }}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={(e) => {
                handleChangeData(id, giftDetail);
              }}
            >
              Apply Changes
            </Button>
            <Button colorScheme="red" mr={3} onClick={() => handleDelete()}>
              Delete Gift
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <HStack justify="right" spacing={3} maxW="50%"></HStack>
    </HStack>
  );
}
