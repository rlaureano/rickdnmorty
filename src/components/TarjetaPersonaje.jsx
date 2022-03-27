import { Card,CardMedia, CardContent, Typography, Box } from '@mui/material';
import Styled from 'styled-components';

const PuntoEstatus = Styled.p`
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 50%;
    font-size: 16px;
    display: inline-block;
    margin: 0;
    margin-right: 0.375rem;
    font-weight: 500;
    top: -2px;
    position: relative;
}
`

const TarjetaPersonaje = ({children, nombre, imagen, estatus, especie}) => {
    return (
        <Card 
            sx={{ display: 'flex', backgroundColor: "#000", marginTop: "15px"}}
            className={`card-personaje ${estatus === 'Alive' ? 'br-verde' : estatus === 'Dead' ? 'br-rojo' : 'br-blanco'}`}
        >
            <CardMedia
                component="img"
                sx={{marginRigth: 'auto' }}
                image={imagen}
                alt="imagen personaje"
                className="card-media"
            />
            <Box 
                sx={{ display: 'flex', flexDirection: 'column' }}
                className="card-box"
            >
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5" sx={{color: '#FFF'}}>
                    {nombre}
                </Typography>
                <Typography variant="subtitle1" sx={{color: '#FFF'}}component="div">
                    <PuntoEstatus className={estatus === 'Alive' ? 'bg-verde' : estatus === 'Dead' ? 'bg-rojo' : 'bg-blanco'}/> {estatus} - {especie}
                    {children}
                </Typography>
                </CardContent>
            </Box>
            
        </Card>
    )
}

export default TarjetaPersonaje
