import { useMutation } from "react-query";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export const useCreateArticle = () => {
  const toast = useToast();
  return useMutation(
    async (data: { title: string; characterCount: number; token?: string }) => {
      const response = await axios.post("/api/create-article", data);
      return response.data;
    },
    {
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.data?.response?.message || error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );
};
