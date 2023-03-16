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
  // window.location.reload();
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  // if (!token) {
  //   return false;
  // }

  const [deleteBook ] = useMutation(REMOVE_BOOK);
  
  const { loading, error, data } = useQuery(GET_ME);
    const userData = data?.me.savedBooks || []
    console.log(userData)
  const handleDeleteBook = async (bookId) => {

    // const id = Auth.getProfile();
    // const userId = id.data._id;
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    // setSavedBookIds([...savedBookIds, bookId]);
    // removeBook({
    //   variables: {userId, bookId},


    try{
    const {data} =  await deleteBook({
      variables: {bookId},


    });

      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
      window.location.reload();
  };
console.log(userData)
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

