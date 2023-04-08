import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Input } from 'reactstrap';
import RecipeAdd from '../components/recipe/RecipeAdd';



const Recipe = () => {
  

  return (
    <Helmet title="Recipe">
     <RecipeAdd />
    </Helmet>
  );
}

export default Recipe