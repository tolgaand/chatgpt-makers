import { useCreateArticle } from "@/hooks/useCreateArticle";
import { DefaultLayout } from "@/layouts/Default";
import { Article } from "@/types";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

export const CreateArticleContainer = () => {
  const { mutateAsync, isLoading } = useCreateArticle();

  const [title, setTitle] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [characterCount, setCharacterCount] = useState(100);
  const [content, setContent] = useState<Article | null>(null);

  const handleSubmit = async () => {
    const response = await mutateAsync({
      title,
      characterCount,
      token: apiKey,
    });

    setContent(response);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <DefaultLayout>
      <Text fontSize="4xl" fontWeight="bold" textTransform="uppercase">
        Yeni Makale Oluştur
      </Text>

      <Flex gap="30px">
        <Box flex="1" maxWidth="450px">
          <FormControl>
            <FormLabel htmlFor="title">Konu: </FormLabel>
            <Textarea
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl marginTop="20px">
            <FormLabel htmlFor="character-count">Karakter: </FormLabel>
            <NumberInput
              defaultValue={100}
              min={100}
              max={1000}
              id="character-count"
              value={characterCount}
              onChange={(value) => setCharacterCount(Number(value))}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl marginTop="20px">
            <FormLabel htmlFor="api-key">OPENAI API Key: </FormLabel>
            <Input
              type="password"
              id="api-key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <FormHelperText>
              Herhangi bir hata alırsanız, kendi api keyiniz ile değiştiriniz.
            </FormHelperText>
          </FormControl>

          <Button
            width="100%"
            marginTop="10px"
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Oluştur
          </Button>
        </Box>
        <Box flex="1" padding="20px">
          <Box>
            {content && (
              <>
                {content.title && (
                  <Text fontSize="30px" fontWeight="bold">
                    {content.title}
                  </Text>
                )}

                <Text
                  dangerouslySetInnerHTML={{
                    __html: content.body || content.fullText,
                  }}
                />
                <Text marginTop="20px">
                  Topic:&nbsp;{content.topic || title} | Character Count:&nbsp;
                  {content.characterLimit || "unknown"}
                </Text>
              </>
            )}
            {!content && (
              <>
                <Text>
                  {isLoading
                    ? "Oluşturuluyor..."
                    : "Oluşturulacak makaleyi burada göreceksiniz. Lütfen bir konu giriniz."}
                </Text>
              </>
            )}
          </Box>
          {content && (
            <Button onClick={() => handleCopy(content.body)}>Kopyala</Button>
          )}
        </Box>
      </Flex>
    </DefaultLayout>
  );
};
