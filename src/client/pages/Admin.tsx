import * as React from 'react';
import styled from 'styled-components';
import { useParams, Link, useHistory } from 'react-router-dom';
import { url } from '../Url';
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
const StyledButton = styled.button`
    padding: 10px;
    border: 3px ridge #999999;
    :hover {
        background-color: #646464;
        border-style: inset;
    }
`;
const Flexer = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-top: 20px;
`;

export const AdminPage = function (props: { getChirps: Function })
{
    const id = useParams<{ ID: string }>().ID;

    const [name, setName] = React.useState("");
    const [text, setText] = React.useState("");

    const getChirp = async function ()
    {
        let chirp = (await url.get.json(`/api/chirps/${id}`)).content;
        setName(chirp.name);
        setText(chirp.text);
    };

    const History = useHistory();

    React.useEffect(() =>
    {
        getChirp();
    }, []);

    const HandleSubmit = function ()
    {
        if (name === "" || text === "")
        {
            Swal.fire({
                title: "No no",
                text: "All fields are required",
                icon: 'error'
            })
            return;
        }

        url.put.json(`/api/chirps/${id}`, {chirp: {name, text}}).then(() => {
            props.getChirps();
            History.replace("/");
        });
    };

    const HandleDelete = function ()
    {
        Swal.fire({
            title: "Are you sure?",
            text: "This cannot be undone",
            icon: "warning",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete"
        }).then(result => {
            if (!result.isConfirmed) return;

            url.delete.json(`/api/chirps/${id}`).then(() => {
                props.getChirps();
                History.replace("/");
            });

        })
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
        <Flexer>
            <StyledButton onClick={() => HandleSubmit()}>Submit</StyledButton>
            <StyledButton onClick={() => History.replace("/")}>Cancel</StyledButton>
            <StyledButton onClick={() => HandleDelete()}>Delete</StyledButton>
        </Flexer>
    </StyledPage>);
};