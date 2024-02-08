import { useToast } from "@chakra-ui/react";

export default function useShowToast() {
  const toast = useToast();

  function showToast(title, description, status) {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };

  return showToast
}