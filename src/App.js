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
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import imgLogo from "../src/image/heroicons-camera-basic.svg";

// - Día 10: Las palabras dicen mucho pero las imágenes más!
// Agreguemos un campo donde podamos pegar un link de imágen para cada regalo y mostremoslo en la lista.

export default function App() {
  const [giftDetail, setGiftDetail] = useState({
    text: "",
    quantity: 1,
    imageLink: "",
  });
  const [giftList, setGiftList] = useState(JSON.parse(localStorage.getItem('list')) || []);
  const toast = useToast();
  const inputRef = useRef();

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(giftList))
  }, [giftList])

  const handleAddGiftClick = () => {
    if (giftDetail.text.length != 0) {
      setGiftList((prevGiftList) => {
        return [
          ...prevGiftList,
          {
            text: giftDetail.text,
            id: nanoid(),
            quantity: giftDetail.quantity,
            image: giftDetail.imageLink,
          },
        ];
      });
      setGiftDetail({
        text: "",
        quantity: 1,
        imageLink: "",
      });
      toast({
        title: "Gift added",
        description: "We've added your gift to the list.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      if (giftDetail.length === 0) {
        toast({
          title: "Error: Empty gift.",
          description: "You need to write a gift before adding.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      inputRef.current.focus();
    }
  };

  const handleDeleteClick = (itemId) => {
    setGiftList((prevGiftList) => {
      return prevGiftList.filter((item) => item.id != itemId);
    });
  };

  const handleChangeQuantity = (_textNumber, newQuantity, id) => {
    setGiftList((prevGiftList) => {
      return prevGiftList.map((item) => {
        if (item.id != id) {
          return item;
        } else {
          return { ...item, quantity: newQuantity };
        }
      });
    });
  };

  return (
    <Container h="full" backgroundColor="#2e2e2e">
      <Flex
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
          <FormControl isRequired>
            <FormLabel htmlFor="gift-text">Gift:</FormLabel>
            <Input
              _placeholder={{ textColor: "#f8f4ff" }}
              color="f8f4ff"
              onChange={(e) =>
                setGiftDetail((prevGiftDetail) => ({
                  ...prevGiftDetail,
                  text: e.target.value,
                }))
              }
              placeholder="Type your gift"
              value={giftDetail.text}
              ref={inputRef}
              mb={3}
              textColor="white"
              id="gift-text"
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
              onChange={(_textNumber, number) =>
                setGiftDetail((prevGiftDetail) => ({
                  ...prevGiftDetail,
                  quantity: number,
                }))
              }
              value={giftDetail.quantity}
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
                onChange={(e) =>
                  setGiftDetail((prevGiftDetail) => ({
                    ...prevGiftDetail,
                    imageLink: e.target.value,
                  }))
                }
                placeholder="http://image..."
                value={giftDetail.imageLink}
                textColor="white"
                id="gift-image"
              ></Input>
              <Image
                boxSize="40px"
                src={giftDetail.imageLink || imgLogo}
                alt="Gift"
              />
            </HStack>
          </FormControl>

          <Button onClick={handleAddGiftClick} w="full">
            Add Gift
          </Button>
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
                <HStack
                  align="center"
                  mb={3}
                  key={gift.id}
                  justify="space-between"
                >
                  <ListItem textColor="#f8f4ff">{gift.text}</ListItem>
                  <Flex justify="right">
                    <NumberInput
                      w="20%"
                      color="white"
                      _placeholder={{ textColor: "white" }}
                      defaultValue={gift.quantity}
                      min={1}
                      allowMouseWheel
                      onChange={(textNumber, number) =>
                        handleChangeQuantity(textNumber, number, gift.id)
                      }
                      value={gift.quantity}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Image
                      boxSize="40px"
                      src={gift.image || imgLogo}
                      alt="Gift"
                      ml={3}
                    />
                    <Button ml={3} onClick={() => handleDeleteClick(gift.id)}>
                      X
                    </Button>
                  </Flex>
                </HStack>
              );
            })}
          </UnorderedList>
        )}
        <Divider mb={3} />
      </Flex>
    </Container>
  );
}
