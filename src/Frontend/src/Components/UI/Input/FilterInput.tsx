import { Input } from '@mui/material';
import { css } from '@emotion/react';

const inputStyle = css`
    color: #29394a;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin: 0px 10px 0px 0px; 
    padding: 0px 10px;
    &:focus {
        outline: none;
        border-color: #0056b3;
    }
`;

function StyledInput(props) {
  return <Input {...props} sx={inputStyle} />;
}

export default StyledInput;
