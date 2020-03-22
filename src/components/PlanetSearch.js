import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import * as Utils from '../utilities'


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
		bullet: {
			display: 'inline-block',
			margin: '0 2px',
			transform: 'scale(0.8)',
		},
		datas: {
			fontSize: theme.spacing(2),
		},
		pos: {
			marginBottom: 12,
		},
}));

export default function PlanetSearch() {
	const [planets, setAllPlanets] = useState()
	const [randomPlanet, setRandomPlanet] = useState()
	const [filmsAppearances, setfilmsAppearances] = useState()
	const classes = useStyles();

	const getPlanets = async () => {
		try {
		  new Promise((resolve, reject) => {
				Utils.getPlanets('https://swapi.co/api/planets', [], resolve, reject)
			})
			.then(resp => {
				setAllPlanets(resp)
				getRandomPlanet(resp)
			})
		} catch (err) {
			console.log("Error trying get Planets", err)
			return err
		}
	}

	const getFilms = async (planetFilmApparition) => {
		try {
			new Promise((resolve, reject) => {
				Utils.getFilms(planetFilmApparition, [], resolve, reject)
			})
			.then(resp => {
				setfilmsAppearances(resp)
			})
		} catch (err) {
			console.log("Error trying get Films", err)
			return err
		}
	}

	const filmsApparition = async (planet) => {
		const films = []
		planet.films.map(planetFilmApparition => {
			films.push(planetFilmApparition)
		})
		await getFilms(films)
	}

	const getRandomPlanet = async (planets) => {
		if(planets) {
			const randomPlanet = planets[Math.floor(Math.random() * planets.length)]
			setRandomPlanet(randomPlanet)
			filmsApparition(randomPlanet)
		}
	}

	useEffect(() => {
		getPlanets()

	}, [])

    return (
		<div className={classes.root}>
      <Grid container spacing={1}>
			<Grid item xs={12}>	
			{planets ? 
			(
				<Card className={classes.root}>
				<CardContent>
				<Typography gutterBottom variant="h5" component="h2">
					Planet Name: 				
				</Typography>
					<Typography
					className={classes.datas}
					color="textSecondary" 
					gutterBottom
				>
				{ randomPlanet ? randomPlanet.name : "" }
        </Typography>
				<Typography gutterBottom variant="h5" component="h2">
					Population: 				
				</Typography>
				<Typography
					className={classes.datas}
					color="textSecondary"
				>
        { randomPlanet ? randomPlanet.population : "" }
        </Typography>
				<Typography gutterBottom variant="h5" component="h2">
					Climate: 				
				</Typography>
				<Typography 
					className={classes.datas} 
					color="textSecondary"
				>
        { randomPlanet ? randomPlanet.climate : "" }
        </Typography>
				<Typography gutterBottom variant="h5" component="h2">
					Terreno: 				
				</Typography>
				<Typography 
					className={classes.datas} 
					color="textSecondary"
				>
        { randomPlanet ? randomPlanet.terrain : "" }
        </Typography>
				<Typography gutterBottom variant="h5" component="h2">
					Filmes: 				
				</Typography>
				<Typography 
					className={classes.datas} 
					color="textSecondary"
				>
				{filmsAppearances ? filmsAppearances.map(films => {
					return(<Typography 
						className={classes.datas} 
						color="textSecondary"
					>
					{films}
					</Typography>)
				}): 
				<Typography 
				className={classes.datas} 
				color="textSecondary"
				>
				Nenhum Filme :(
				</Typography>
				}
				</Typography>
      </CardContent>
      <CardActions>
				<Button 
					variant="contained" 
					color="primary"
					size="medium"
					onClick={() => getRandomPlanet(planets)}
				>
				Next Planet
			</Button>
			</CardActions>
			</Card>
			): (
			  <Grid item xs={12}>
					<Typography variant="h3" color="textSecondary" component="h2">
						Usando a forca, Aguarde...
					</Typography>
        </Grid>
			)}
        </Grid>
      </Grid>
    </div>
    )
}
