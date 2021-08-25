import * as React from 'react';
import { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { AdminPage } from './pages/Admin';
import { Chirps } from './pages/chirps';
import { NewChirp } from './pages/new';
import {url} from './Url';

interface Chirp {
	name: string,
	text: string,
	id: string
}

const App = () => {
	const [chirps, setChirps] = useState<Chirp[]>([]);
	async function getChirps() {
		try {
			//I don't know of any way to convince it that it's wrong about the type. I can't say that the function returns something else, because that will complain that it's missing the content property - even though it's guaranteed to be defined.
			const res = (await url.get.json('/api/chirps')).content;
			let chirpList: Chirp[] = [];
			for (const key in res) {
				if (!isNaN(parseInt(key))) chirpList.push({...res[key], id:key});
			}
			setChirps(chirpList);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getChirps();
	}, []);

	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route exact path="/">
					<Chirps chirps={chirps}/>
				</Route>
				<Route exact path="/new">
					<NewChirp getChirps={getChirps} />
				</Route>
				<Route exact path="/:ID">
					<AdminPage getChirps={getChirps} />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
