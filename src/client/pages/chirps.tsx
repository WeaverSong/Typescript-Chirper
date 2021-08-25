import * as React from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';

interface Chirp {
	name: string,
	text: string,
    id: string
}

const MainPage = styled.div`
    background-color: aliceblue;
    width: 90%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    border-radius: 15px;
    border: solid black 3px;
    box-shadow: 10px 10px 21px -2px rgba(0,0,0,0.75);
`;
const ChirpComp = styled.div`
    width: 90%;
    background-color: aqua;
    box-shadow: 10px 10px 21px -2px rgba(0,0,0,0.75);
    margin: 20px;
    border-radius: 5px;
    border: solid black 2px;
`;
const ChirpName = styled.h2`
    text-align:right;
    margin: 5px;
    background-color: #6acae7;
    padding: 10px;
    border-radius: 5px;
`;
const ChirpText = styled.p`
    margin: 20px;
    font-size: x-large;
`;
const AdminOptionsDiv = styled.div`
    display: block;
    text-align: right;
    font-size: x-large;
    padding: 5px;
`;

export const Chirps = function (props: {chirps: Chirp[]}) {
    const chirps = props.chirps;
    let Bottom = React.useRef<HTMLDivElement>();

    React.useEffect(() => {
        Bottom.current?.scrollIntoView();
    }, [props.chirps]);

    return (
        <MainPage>
            {
                chirps.map(i => <ChirpComp key={uuid()}>
                    <ChirpName>{i.name}</ChirpName>
                    <ChirpText>{i.text}</ChirpText>
                    {/*I hate how you can't use styled components for this essential component. This works, but it would be nicer to not have to wrap it. And this way most styles can't be used on it without an actual css file, or inline css.*/}
                    <AdminOptionsDiv><Link to={`/${i.id}`}>[Admin Options]</Link></AdminOptionsDiv>
                </ChirpComp>)
            }
            <div ref={Bottom} ></div>
        </MainPage>
    );
};