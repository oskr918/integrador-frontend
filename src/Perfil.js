import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import MenuPerfil from './MenuPerfil';

function Perfil() {
  return (
    <>
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </Stack>
    <MenuPerfil></MenuPerfil>
    </>
  );
}
export default Perfil;