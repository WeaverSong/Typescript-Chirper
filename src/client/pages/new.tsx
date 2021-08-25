import * as React from 'react';
import styled from 'styled-components';
import { url } from '../Url';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const StyledPage = styled.div`
    width: 500px;
    height: 500px;
    background-color: aliceblue;
    margin: 50px;
    border: solid black 2px;
    border-radius: 10px;
    text-align: center;
`;

const FormGroup = styled.div`
    margin-top: 50px;
`;

const TextArea = styled.textarea`
    width: 80%;
    height: 30%;
`;

const Submit = styled.button`
padding: 10px;
border: 3px ridge #999999;
:hover {
    background-color: #646464;
    border-style: inset;
}
`;

export const NewChirp = function (props: {getChirps: Function}) {

    const [name, setName] = React.useState("");
    const [text, setText] = React.useState("");
    const History = useHistory();

    const HandleSubmit = function () {
        if (name === "" || text === "") {
            Swal.fire({
                title: "No no",
                text: "All fields are required",
                icon: 'error'
            })
            return;
        }

        url.post.json('/api/chirps', {chirp: {name, text}}).then(() => {
            props.getChirps();
            History.replace("/");
        });
    };

    return (<StyledPage>
        <FormGroup>
            <h2>Name:</h2>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </FormGroup>
        <FormGroup>
            <h2>Text:</h2>
            <TextArea value={text} onChange={e => setText(e.target.value)}></TextArea>
        </FormGroup>
        <FormGroup>
            <Submit onClick={() => HandleSubmit()}>Submit</Submit>
        </FormGroup>
    </StyledPage>);
};