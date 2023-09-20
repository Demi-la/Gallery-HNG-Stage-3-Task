import React from 'react';
import {
  Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string().required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

const Login = ({ handleSubmit }) => {
  return (
    <Box maxW="sm" mx="auto" mt="10" id="login" p={{base: "2rem", md: "0", lg: "0"}}>
      <Heading textAlign="center" mb="4">
        Login
      </Heading>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setErrors, resetForm }) =>
          handleSubmit(values, { setSubmitting, setErrors, resetForm })
        }
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <FormControl mb="4" isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Field as={Input} name="email" id="email" placeholder="Email" />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl mb="4" isInvalid={errors.password} >
              <FormLabel htmlFor="password">Password</FormLabel>
              <Field
                as={Input}
                name="password"
                id="password"
                type="password"
                placeholder="Password"
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <Button
              mt="4"
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
              width="100%"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
