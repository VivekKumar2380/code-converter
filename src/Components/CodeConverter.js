import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/worker-javascript";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";

const CodeConverter = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [convertedCode, setConvertedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [Load, setLoad] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleConvert = async () => {
    setIsLoading(true); // Show loading indicator during the API call
    try {
      const response = await axios.post(
        "https://code-converter-server-z7xm.onrender.com/convert",
        { code, Language: language }
      );
      setConvertedCode(response.data.convertedCode);
    } catch (error) {
      console.error("Error converting code:", error.message);
      setConvertedCode("Failed to convert code");
    } finally {
      setIsLoading(false); // Hide loading indicator after API call is done
    }
  };
  const handleDebug = async () => {
    setIsLoad(true); // Show loading indicator during the API call
    try {
      const response = await axios.post(
        "https://code-converter-server-z7xm.onrender.com/debug",
        { code }
      );
      setConvertedCode(response.data.convertedCode);
    } catch (error) {
      console.error("Error debugging code:", error.message);
      setConvertedCode("Failed to debug code");
    } finally {
      setIsLoad(false); // Hide loading indicator after API call is done
    }
  };

  const handleQualityCheck = async () => {
    setLoad(true); // Show loading indicator during the API call
    try {
      const response = await axios.post(
        "https://code-converter-server-z7xm.onrender.com/quality-check",
        { code }
      );
      setConvertedCode(response.data.convertedCode);
    } catch (error) {
      console.error("Error checking code quality:", error.message);
      setConvertedCode("Failed to check code quality");
    } finally {
      setLoad(false); // Hide loading indicator after API call is done
    }
  };
  const editorOptions = {
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showLineNumbers: true,
    readOnly: false,
    highlightActiveLine: true,
    tabSize: 2,
  };

  return (
    <Box>
    <Heading mb={4}>Code Converter</Heading>
    <Button mt={4} onClick={toggleColorMode}>
      {colorMode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </Button>
    <FormControl mt={4}>
      <FormLabel htmlFor="language">Target Language:</FormLabel>
      <Input
        type="text"
        id="language"
        placeholder="e.g., Python"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />
    </FormControl>
    <Button mt={4} onClick={handleConvert} isLoading={isLoading}>
      {isLoading ? "Converting..." : "Convert Code"}
    </Button>

    <Button mt={4} mx={4} onClick={handleDebug} isLoading={isLoad}>
      {isLoad ? "Debugging..." : "Debug Code"}
    </Button>
    <Button mt={4} onClick={handleQualityCheck} isLoading={Load}>
      {Load ? "Checking..." : "Check Code Quality"}
    </Button>
    <FormControl>
      <FormLabel htmlFor="code">Enter your code:</FormLabel>
      <AceEditor
        mode="javascript"
        theme="monokai"
        value={code}
        onChange={(value) => setCode(value)}
        editorProps={{ $blockScrolling: Infinity }}
        height="300px"
        width="100%"
        setOptions={editorOptions}
      />
    </FormControl>

    <Box mt={4}>
      <Heading size="md">Converted Code:</Heading>
      <Textarea
        value={isLoading || isLoad || Load ? "Loading....." : convertedCode}
        readOnly
        height="200px"
      />
    </Box>
  </Box>
  );
};

export default CodeConverter;
