import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const Container = styled.div`
    padding: 1rem;
    margin: 1rem;
`
export const InnerContainerEnd = styled.div `
    display: flex;
    justify-content: flex-end;
`

export const InnerContainer = styled.div `
    display: flex;
    justify-content: space-between;
`

export const Card = styled.div`
    
    background-color: white;
    box-sizing: border-box;
    padding: 1rem;
    margin: 1rem;
    border: 1px solid black;
    border-radius: 10px;
    transition: box-shadow 0.3s;
    &:hover {
        box-shadow: 0 0 11px rgba(33,33,33,.2)
    }
    @media (max-width: 768px) {
     flex: 0 1 49%
    }
    @media (max-width: 480px) {
     flex: 0 1 80%
    }
`

export const InputButton = styled.input`
    background-color: #346dc9;
    color: white;
    padding: .2em;
    border: none;
    font-size: 1.2em;
    width: 200px;
    cursor: pointer;
`
export const Input = styled.input`
    width: 60vw;
    margin: .5em;
`

export const Label = styled.label`
    font-size: 1.2em;
`
export const TextArea = styled.textarea`
    height: 200px;
    margin: .5em;
    width: 70vw;
`

export const Block = styled.div`
    display: grid;

`

export const Select = styled.select`
    border: ${props => props.error ? "1px solid red": "1px solid #dddddd"};
    font-size: 1.2em;
    width: 60vw;
`

export const Option = styled.option`
    font-size: 1.2em;

`


export const StyledLink = styled(Link)`
    font-size: 1.2rem;
    font-weight: 700;
    text-decoration: none;
    color: #096b75;
    &:hover{
        color: #c1e4e8;
    }
`
export const StyledLinkButton = styled(Link) `
    font-size: 1.2em;    
    text-decoration: none;
    color: #096b75;
    background-color: white;
    &:hover{
        color: #c1e4e8;
    }
    border: 1px solid black;
    border-radius: 10px;
    padding: 1rem;
    margin-right: 1rem;
`

//  ********************* NAVBAR **************************
export const Topbar = styled.div`
    margin: 20px;
`

export const Nav = styled.nav`
    display: flex;
    justify-content: flex-end;
    background-color: #096b75;
`
export const NavLink = styled(Link)`
    font-size: 1.2em;
    text-decoration: none;
    margin: 1em;
    padding: .2em .5em;
    color: white;
    &:hover{
        color: #c1e4e8;
    }
`




export const TitleH1 = styled.h1`
    color: #096b75;
`
export const TitleH2 = styled.h2`
    color: #096b75;
`
export const TitleH3 = styled.h3`
    color: #096b75;
`


export const TitleH4 = styled.h4`
    color: #096b75;
`
