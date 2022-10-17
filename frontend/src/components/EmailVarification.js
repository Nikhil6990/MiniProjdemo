import {Box, Button, Container } from '@chakra-ui/react'
import React from 'react'

function EmailVarification() {
  return (
    <div>
      <Container maxW="xl" centerContent>
              <Box>
                <h1>Account Conformation</h1>
                <h2>An Email is sent to your mail please confirm it and come back to continue</h2>
                <Button>Proceed</Button>
              </Box>
      </Container>
    </div>
  )
}

export default EmailVarification
