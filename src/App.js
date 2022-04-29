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
} from "@chakra-ui/react";
import React from "react";
import { nanoid } from "nanoid";

//- Día 5: La gente está muy indecisa y agrega muchos regalos y después los debe borrar de a uno!
//Agreguemos un botón para eliminar todos los regalos a la vez!

export default function App() {
  const [gift, setGift] = React.useState("");
  const [listGift, setListGift] = React.useState([]);

  function handleClick(event) {
    event.preventDefault();
    setListGift((prevListGift) => {
      return gift.length === 0
        ? [...prevListGift]
        : [
            ...prevListGift,
            {
              giftItem: gift,
              id: nanoid(),
            },
          ];
    });
    setGift("");
  }

  function deleteItem(itemId) {
    setListGift((prevListGift) => {
      return prevListGift.filter((item) => item.id != itemId);
    });
  }

  function deleteList() {
    setListGift([]);
  }

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      backgroundColor="gray.500"
    >
      <Flex direction="column" p={4} backgroundColor="blue.300" rounded={3}>
        <Heading mb={3} textAlign="center">
          Christmas List
        </Heading>
        <Input
          placeholder="Type gift..."
          _placeholder={{ color: "black" }}
          mb={3}
          onChange={(e) => setGift(e.target.value)}
          value={gift}
        />
        <Button colorScheme="blue" mb={3} onClick={(e) => handleClick(e)}>
          Add Gift
        </Button>
        <Divider mb={3} />
        <UnorderedList direction="">
          {listGift.map((gift) => {
            return (
              <ListItem key={gift.id} id={gift.id} mb={2}>
                <Flex justifyContent='space-around'>
                  <Text color="white">
                    {gift.giftItem}
                    <Button
                      ml={3}
                      color="gray"
                      onClick={() => deleteItem(gift.id)}
                    >
                      X
                    </Button>
                  </Text>
                </Flex>
              </ListItem>
            );
          })}
        </UnorderedList>
        <Button onClick={() => deleteList()}>Delete all gifts</Button>
      </Flex>
    </Flex>
  );
}
