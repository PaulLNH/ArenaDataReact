import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


export default () => (
    <Button variant="contained" color="default" component={Link} to="/import" >
        Import &nbsp;
        <CloudUploadIcon />
    </Button>
);


