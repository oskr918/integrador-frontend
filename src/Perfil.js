import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack'

function Perfil() {
  return (
    <>
    <Stack direction="row" spacing={2} id="perfil">
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </Stack>
    </>
  );
}
export default Perfil;