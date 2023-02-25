/**
 * Exercício 1:
 * Dentro do componente ReadAll, crie um div com a classe "Card"
 * Dentro do Card, exiba uma imagem de qualquer personagem
 * Além disso, tb exiba o nome da personagem
 * 
 * OBS: caso vc tenha escolhido algo diferente no backend, pode manter o tema original
 * Não precisa ser integrado com o Back! Apenas a exibição dos dados no Front.
 * 
 * 
 * Exercício 2 (bônus!):
 * Pegue o div com a classe "Card" e extraia em um componente JSX, seguindo os mesmos
 * passos que fizemos para a criação do componente ReadAll
*/

const itemsMock = [
    {
      _id: "63ee1e0b18f2b9a93da8435a",
      nome: "Rick Sanchez",
      imagemUrl: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      tags: ["Status: Vivo", "Espécie: Humana", "Origem: Terra C-137"],
    },
    {
      _id: "63ef87c74522de2944ab1fa8",
      nome: "Morty Smith",
      imagemUrl: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    },
    {
      _id: "63ef87cc4522de2944ab1fa9",
      nome: "Summer Smith",
      imagemUrl: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
    },
    {
      _id: "63ef87d44522de2944ab1faa",
      nome: "Beth Smith",
      imagemUrl: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
    },
    {
      _id: "63ef87e24522de2944ab1fab",
      nome: "Jerry Smith",
      imagemUrl: "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
    },
];


import './ReadAll.css'
import Card from "../Card/Card";
import { useEffect, useState } from 'react';


function ReadAll () {
    // useState retorna 2 coisas:
    // 1 : o valor do estado
    // 2 : a função que atualiza o valor do estado
    
    const [items,setItems] = useState([]);

    async function realizarRequisicao(){
        const url = "http://localhost:3000/item"
        const response = await fetch(url)
        const data = await response.json()

        console.log(data)

        setItems(data)
        
    }
    

    // Primeiro uma função será executada
    // depois uma lista de dependencias 
    useEffect(function () {
        realizarRequisicao();
    },[])

    return <div className="ReadAll">
            {items.map((item)=>{
            console.log(item)
                return <Card key={"card-" + item._id} item={item}/>
            })}
    </div>
}

export default ReadAll;