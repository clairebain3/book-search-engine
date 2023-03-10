import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
// import {deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId, getSavedBookIds } from '../utils/localStorage';
import { useRevalidator } from 'react-router-dom';
// import { token } from 'graphql';


const SavedBooks = () => {
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds);
  const [removeBook, { err, d }] = useMutation(REMOVE_BOOK);
  const id = Auth.getProfile();
  const userId = id.data._id;
  console.log(userId)
  useEffect(() => {
    return () => getSavedBookIds(savedBookIds);
  });
  const { loading, error, data } = useQuery(GET_ME,
    {
      variables: { userId },
    });
    const userData = data?.me.savedBooks || []
    
    // const [userData, setUserData] = useState(myData);
  // setUserData(data?.me.savedBooks || {});
   
    console.log("here is the data" + userData)
  // setUserData (userData = data);
// console.log(userData)
  // use this to determine if `useEffect()` hook needs to run again
  // const userDataLength = Object.keys(userData).length;


  const handleDeleteBook = async (bookId) => {

    const id = Auth.getProfile();
    const userId = id.data._id;
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    // console.log(myId)
    if (!token) {
      return false;
    }
    setSavedBookIds([...savedBookIds, bookId]);
    removeBook({
      variables: {userId, bookId},


    });
    // if (error) return `Submission error! ${error.message}`
  
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }

    // try {
    //   const response = await deleteBook(bookId, token);

    //   if (!response.ok) {
    //     throw new Error('something went wrong!');
    //   }

    //   const updatedUser = await response.json();
    //   // setUserData(updatedUser);
    //   // upon success, remove book's id from localStorage
      removeBookId(bookId);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  // if data isn't here yet, say so
// if data isn't here yet, say so
if (loading) {
  return <h2>LOADING...</h2>;
}

return (
  <>
    <Jumbotron fluid className='text-light bg-dark'>
      <Container>
        <h1>Viewing saved books!</h1>
      </Container>
    </Jumbotron>
    <Container>
      <h2>
        {userData.length
          ? `Viewing ${userData.length} saved ${userData.length === 1 ? 'book' : 'books'}:`
          : 'You have no saved books!'}
      </h2>
      <CardColumns>
        {userData.map((book) => {
          return (
            <Card key={book.bookId} border='dark'>
              {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <p className='small'>Authors: {book.authors}</p>
                <Card.Text>{book.description}</Card.Text>
                <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                  Delete this Book!
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </CardColumns>
    </Container>
  </>
);
};

export default SavedBooks;

