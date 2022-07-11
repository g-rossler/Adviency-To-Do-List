import {
  Text,
  Flex,
  Input,
  Button,
  Divider,
  Heading,
  UnorderedList,
  ListItem,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Container,
  HStack,
  Image,
  VStack,
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
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import imgLogo from "../src/image/heroicons-camera-basic.svg";
import Gift from "./components/Gift.js";

// - Día 12: La gente no recuerda que regalo corresponde a cada quien,
// agreguemos un campo para destinatario y mostremoslo.

export default function App() {
  const [giftDetail, setGiftDetail] = useState({
    text: "",
    quantity: 1,
    imageLink: "",
    receiver: "",
  });
  const [giftList, setGiftList] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );
  const toast = useToast();
  const inputRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(giftList));
  }, [giftList]);

  const handleAddGiftClick = () => {
    setGiftList((prevGiftList) => {
      return [
        ...prevGiftList,
        {
          text: giftDetail.text,
          id: nanoid(),
          quantity: giftDetail.quantity,
          imageLink: giftDetail.imageLink,
          receiver: giftDetail.receiver,
        },
      ];
    });
    setGiftDetail({
      text: "",
      quantity: 1,
      imageLink: "",
      receiver: "",
    });
    toast({
      title: "Gift added",
      description: "We've added your gift to the list.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

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
  }

  const handleChangeData = (id, newGiftData) => {
    setGiftList((prevGiftList) => {
      return prevGiftList.map((gift) => {
        if (gift.id != id) {
          return gift;
        } else {
          return newGiftData;
        }
      });
    });
  };

  const handleDeleteClick = (itemId) => {
    setGiftList((prevGiftList) => {
      return prevGiftList.filter((item) => item.id != itemId);
    });
  };

  return (
    <Container
      border="3px solid white"
      minH="70vh"
      backgroundColor="white"
      w="xl"
      p={0}
      my={5}
    >
      <Flex
        minH="70vh"
        direction="column"
        backgroundColor="#2e2e2e"
        p={5}
        justify="center"
        h="full"
      >
        <Heading textColor="#f8f4ff" mb={7} textAlign="center">
          Santa List
        </Heading>
        <Divider mb={3} />
        <VStack mb={4}>
          <Button onClick={onOpen} w="full">
            Add Gift
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textAlign="center">Add your gift</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel htmlFor="gift-text">Gift:</FormLabel>
                  <Input
                    _placeholder={{ textColor: "#f8f4ff" }}
                    color="f8f4ff"
                    onChange={(e) => handleChangeGiftData(e)}
                    placeholder="Type your gift"
                    value={giftDetail.text}
                    ref={inputRef}
                    mb={3}
                    textColor="white"
                    id="gift-text"
                    name='text'
                  ></Input>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="gift-receiver">Receiver:</FormLabel>
                  <Input
                    _placeholder={{ textColor: "#f8f4ff" }}
                    color="f8f4ff"
                    onChange={(e) => handleChangeGiftData(e)}
                    placeholder="Type the receiver"
                    value={giftDetail.receiver}
                    mb={3}
                    textColor="white"
                    id="gift-receiver"
                    name='receiver'
                  ></Input>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="gift-quantity">Quantity:</FormLabel>
                  <NumberInput
                    w="full"
                    id="gift-quantity"
                    mb={3}
                    min={1}
                    defaultValue={1}
                    onChange={(e) => handleChangeQuantityItem(e)}
                    value={giftDetail.quantity}
                    name='quantity'
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormLabel htmlFor="gift-image">Image:</FormLabel>
                  <HStack mb={3}>
                    <Input
                      _placeholder={{ textColor: "#f8f4ff" }}
                      color="f8f4ff"
                      onChange={(e) => handleChangeGiftData(e)}
                      placeholder="https://example-link-image..."
                      value={giftDetail.imageLink}
                      textColor="white"
                      id="gift-image"
                      name='imageLink'
                    ></Input>
                    <Image
                      boxSize="40px"
                      src={giftDetail.imageLink || imgLogo}
                      alt="Gift image"
                    />
                  </HStack>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddGiftClick}>
                  Add Gift
                </Button>
                <Button colorScheme="red" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </VStack>
        <Divider mb={3} />
        {giftList.length === 0 ? (
          <Text textColor="#f8f4ff" mb={3}>
            Your list is empty, add a gift.
          </Text>
        ) : (
          <UnorderedList>
            {giftList.map((gift) => {
              return (
                <Gift
                  id={gift.id}
                  text={gift.text}
                  quantity={gift.quantity}
                  imageLink={gift.imageLink}
                  receiver={gift.receiver}
                  key={nanoid()}
                  handleDelete={() => handleDeleteClick(gift.id)}
                  handleChangeData={handleChangeData}
                />
              );
            })}
          </UnorderedList>
        )}
        <Divider mb={3} />
      </Flex>
    </Container>
  );
}
