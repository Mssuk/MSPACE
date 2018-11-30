import React from 'react';
import { Button } from 'reactstrap'

const goBackward = () => {
    window.history.back()
}

export default (props) => {
  return (
    <Button outline color="secondary" onClick = {goBackward}> 뒤로 </Button>   
 )
}