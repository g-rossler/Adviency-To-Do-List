import {
  Text,
  Flex,
  Input,
  Button,
  Divider,
  Heading,
  UnorderedList,
  ListItem,
  Spacer,
  Box,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import { DeleteIcon } from "@chakra-ui/icons";

//- Día 6: Nuestra aplicación no se ve muy bien cuando no hay regalos,
// agreguemos un mensaje alentando a agregar regalos cuando no haya ninguno!

export default function App() {
  const [listGift, setListGift] = useState([]);
  const [gift, setGift] = useState("");
  const toast = useToast();

  function addGift() {
    setListGift((prevSetGift) => {
      return [
        ...prevSetGift,
        {
          text: gift,
          id: nanoid(),
        },
      ];
    });
    setGift("");
    toast({
      title: "Present added!",
      description: "We've added your present for you.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  function deleteItem(itemId) {
    setListGift((prevSetGift) => {
      return prevSetGift.filter((item) => item.id != itemId);
    });
  }

  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      backgroundColor="blue.300"
    >
      <Flex direction="column" backgroundColor="cyan.900" p={10}>
        <Heading fontSize='5xl' textColor="whiteAlpha.900" mb={10}>
          Christmas Present List
        </Heading>
        <Input
          textColor="whiteAlpha.900"
          mb={3}
          placeholder="Type your present here"
          onChange={(e) => setGift(e.target.value)}
          value={gift}
          fontSize='xl'
        />
        <Button
          mb={3}
          onClick={() => {
            if (gift.length != 0) {
              addGift();
            } else {
              toast({
                title: "Error!",
                description: "You need to type your present",
                status: "error",
                duration: 3000,
                isClosable: true,
              })
            }
          }}
          fontSize='xl'
        >
          Add Present!
        </Button>
        <Divider mb={5} />
        {listGift.length === 0 ? (
          <Text fontSize='2xl' textColor="red.500" textAlign='center'>The list is empty, add a present!</Text>
        ) : (
          <UnorderedList>
            {listGift.map((gift) => {
              return (
                <ListItem p={1} m={1}>
                  <Flex justify="space-between" align="center">
                    <Text fontSize='xl' ml={2} textColor="whiteAlpha.900">
                      {gift.text}
                    </Text>
                    <Button mr={1} onClick={() => deleteItem(gift.id)}>
                      <DeleteIcon />
                    </Button>
                  </Flex>
                </ListItem>
              );
            })}
          </UnorderedList>
        )}
      </Flex>
    </Flex>
  );
}
