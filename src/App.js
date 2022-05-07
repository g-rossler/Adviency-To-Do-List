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
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";

// - Día 9: La gente está triste por que al cerrar la aplicación pierde todos sus regalos 😢. 
// Usemos `localStorage` para guardar los regalos en el dispositivo del usuario y cargarlos cuando vuelve!

export default function App() {
  const [gift, setGift] = useState("");
  const [giftList, setGiftList] = useState(() => {
    return JSON.parse(localStorage.getItem('list')) || ''
  });
  const toast = useToast();
  const inputRef = useRef();

  const handleAddGiftClick = () => {
    if (gift.length != 0) {
      setGiftList((prevGiftList) => {
        return [
          ...prevGiftList,
          {
            text: gift,
            id: nanoid(),
          },
        ];
      });
      setGift("");
      toast({
        title: "Gift added",
        description: "We've added your gift to the list.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      if (gift.length === 0) {
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

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(giftList))
  }, [giftList])

  return (
    <Flex h="100vh" backgroundColor="#f8f4ff" align="center" justify="center">
      <Flex direction="column" backgroundColor="#2e2e2e" p={5}>
        <Heading textColor="#f8f4ff" mb={7} textAlign="center">
          Santa List
        </Heading>
        <Divider mb={3} />
        <Input
          _placeholder={{ textColor: "#f8f4ff" }}
          color="f8f4ff"
          onChange={(e) => setGift(e.target.value)}
          placeholder="Type your gift"
          value={gift}
          ref={inputRef}
          mb={3}
          textColor="white"
        ></Input>
        <Button textColor="#2e2e2e" mb={3} onClick={() => handleAddGiftClick()}>
          Add Gift
        </Button>
        <Divider mb={3} />
        {giftList.length === 0 ? (
          <Text textColor="#f8f4ff" mb={3}>
            Your list is empty, add a gift.
          </Text>
        ) : (
          <UnorderedList>
            {giftList.map((gift) => {
              return (
                <Flex
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
                      defaultValue={0}
                      min={0}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Button ml={3} onClick={() => handleDeleteClick(gift.id)}>
                      X
                    </Button>
                  </Flex>
                </Flex>
              );
            })}
          </UnorderedList>
        )}
        <Divider mb={3} />
      </Flex>
    </Flex>
  );
}
