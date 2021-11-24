import { NextPage } from "next";
import { Formik, Form, Field } from "formik";
import {
  Button,
  Box,
  Spinner,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

import useUser from "../lib/useUser";

const Login: NextPage = () => {
  // Check if user is already logged in and redirect to Dashboard
  const { user, mutateUser } = useUser({
    redirectTo: "/dashboard",
    redirectIfFound: true,
  });

  if (!user || user.isLoggedIn) {
    return <Spinner />;
  }

  return (
    <Box
      borderWidth={1}
      borderRadius="lg"
      bg="white"
      p={6}
      boxShadow="md"
      maxWidth={480}
      marginTop={60}
      marginLeft="auto"
      marginRight="auto"
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validateOnMount={true}
        validate={(values) => {
          const errors = {} as any;
          if (!values.email) {
            errors.email = "Email address is required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await mutateUser(
              axios.post("/api/login", values).then((res) => res.data),
              false
            );
          } catch (error) {
            console.error("An unexpected error happened:", error);
            setSubmitting(false);
          }
        }}
      >
        {({ isValid, isSubmitting, errors, touched }) => (
          <Form>
            <VStack spacing={4} align="start">
              <FormControl id="email" isInvalid={!!errors.email && touched.email}>
                <FormLabel>Email address</FormLabel>
                <Field as={Input} required={true} name="email" type="email" />
                <FormErrorMessage>{touched.email && errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Field as={Input} required={true} name="password" type="password" />
              </FormControl>

              <Box>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  Log in
                </Button>
              </Box>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
