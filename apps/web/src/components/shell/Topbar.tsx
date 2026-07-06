import { Box, Flex, Heading, IconButton } from '@chakra-ui/react';
import { useState } from 'react';

export default function Topbar() {
  const [dark, setDark] = useState(false);
  return (
    <Box as="header" p={4} borderBottomWidth="1px" bg={dark ? 'gray.800' : 'white'} color={dark ? 'white' : 'black'}>
      <Flex justify="space-between" align="center">
        <Heading size="md">Atlas Studio</Heading>
        <IconButton onClick={() => setDark(!dark)}>{dark ? '☀️' : '🌙'}</IconButton>
      </Flex>
    </Box>
  );
}
