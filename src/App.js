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
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { nanoid } from "nanoid";

//- Día 7: Tuvimos algunos reportes de regalos vacíos o repetidos,
// asegurmosnos que la gente solo pueda agregar un regalo si escribió algo
// y si ese regalo no está ya en la lista!

export default function App() {
  const [gift, setGift] = useState("");
  const [giftList, setGiftList] = useState([]);
  const toast = useToast();
  const inputRef = useRef();

  const checkDuplicateText = () => {
    const duplicateText = giftList.filter((item) => item.text === gift);
    return duplicateText.length === 0;
  };

  const handleAddGiftClick = () => {
    if (gift.length != 0 && checkDuplicateText()) {
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
      } else {
        toast({
          title: "Error: Duplicate gift.",
          description: "You already have that gift in your list.",
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

  return (
    <Flex h="100vh" backgroundColor="#f8f4ff" align="center" justify='center'>
      <Flex direction="column" backgroundColor="#2e2e2e" p={5}>
        <Heading textColor='#f8f4ff' mb={7} textAlign="center">Santa List</Heading>
        <Divider mb={3}/>
        <Input
          _placeholder={{textColor: '#f8f4ff'}}
          color="f8f4ff"
          
          onChange={(e) => setGift(e.target.value)}
          placeholder="Type your gift"
          value={gift}
          ref={inputRef}
          mb={3}
        ></Input>
        <Button textColor='#2e2e2e' mb={3} onClick={() => handleAddGiftClick()}>Add Gift</Button>
        <Divider mb={3}/>
        {giftList.length === 0 ? (
          <Text textColor='#f8f4ff' mb={3}>Your list is empty, add a gift.</Text>
        ) : (
          <UnorderedList>
            {giftList.map((gift) => {
              return (
                <Flex align="center" mb={3} key={gift.id} justify="space-between">
                  <ListItem textColor='#f8f4ff'>{gift.text}</ListItem>
                  <Button onClick={() => handleDeleteClick(gift.id)}>X</Button>
                </Flex>
              );
            })}
          </UnorderedList>
        )}
        <Divider mb={3}/>
      </Flex>
    </Flex>
  );
}
