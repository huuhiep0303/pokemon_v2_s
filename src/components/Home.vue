<template>
    <div class="container">
        <h1 class="title">Pokemon API</h1>
        <input class="search" type="text" placeholder="Search some Pokemon..." v-model="queryValue" @input="handleSearch">
        <div class="pokemon-card">
            <PokemonItem v-for="pokemon in listPokemon" :key="getIDPokemon(pokemon.url)" :pokemon="pokemon" @select-pokemon="pokemonDetail"/>
        </div>
        <button v-show="listPokemon.length >= maxPokemon" class="button" @click="LoadMore_button">Load more</button>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';    
    import PokemonItem from './Pokemon/Card.vue';
    import { fetchPromise, getIDPokemon } from './PokemonDetail/function' 

    let filteredPokemon = ref([]);
    let offset = ref(0);
    const maxPokemon = 36;

    const listPokemon = computed(() => {
        return filteredPokemon.value.slice(offset, offset.value + maxPokemon);
    })

    const pokePromise = [];
    let pokemon = JSON.parse(localStorage.getItem("pokemonData")) || [];
    filteredPokemon.value = pokemon;
    async function getPokemon() {
        if (pokemon.length) {
            filteredPokemon.value = pokemon;
        } else {
            const response = await fetchPromise("https://pokeapi.co/api/v2/pokemon/?.value=0&limit=898");
            if (response && response.results) {
                pokemon = response.results;
                filteredPokemon.value = pokemon;
                localStorage.setItem("pokemonData", JSON.stringify(pokemon));
            }
        }
    };
    function fetchPokemonType() {
        if (pokemon){
            pokemon.forEach(pokemon => {
                const promise = fetchPromise(pokemon.url);
                pokePromise.push(promise);
            });
        }
        return pokePromise;
    }
    async function getPokemonType() {
        const pokeDataPromise = fetchPokemonType();
        const pokeData = await Promise.all(pokeDataPromise);
        pokeData.forEach((item, index) =>
            {
                if (pokemon[index]) {
                    pokemon[index].types = item.types.map(item => item.type.name);
                }
            }
        )
        filteredPokemon.value = [...pokemon];
        localStorage.setItem("pokemonData", JSON.stringify(pokemon));
    }
    getPokemonType();

    let queryValue = ref('');
    function handleSearch() {
        filteredPokemon.value = pokemon.filter((pokemon) => {
            return pokemon.name.includes(queryValue.value.toLowerCase());
        });
        offset.value = 0;
    }
    function LoadMore_button() {
        offset.value += maxPokemon;
    }
    getPokemon();
</script>

<style>
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    .container {
        /* margin: 0 auto; */
        /* max-width: 1400px; */
        margin-bottom: 30px;
        margin-inline: auto;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .title {
        font-size: 40px;
    }

    .pokemon-card {
        display: grid;
        grid-template-columns: repeat(6, auto);
        /* max-width: 2000px; */
        width: 100%;
        margin-top: 40px;
    }

    .search {
        background-color: #fff;
        border-radius: 30px;
        border: grey solid 1px;
        box-shadow: #64646f33 0px 0px 30px 0px;
        width: 500px;
        padding: 20px;
        margin-top: 40px;
        font-size: 16px;
    }

    .card {
        /* height: auto; */
        max-width: 300px;;
        border-radius: 15px;
        box-shadow: #0000001a 0 4px 12px;
        text-transform: capitalize;
        cursor: pointer;
        padding: 20px 0;
        margin: 10px 5px;
        
    }

    .button {
        background-color: rgb(254, 57, 57);
        border-radius: 10px;
        color: #fff;
        text-align: center;
        border: none;
        margin: 40px 0px 10px;
        cursor: pointer;
        font-size: 15px;
        padding: 20px 30px;
    }

    .normal {
        background-color: #a8a77a;
    }

    .fire {
        background-color: #ff421c;
    }

    .water {
        background-color: #6390f0;
    }

    .grass {
        background-color: #78cd54;
    }

    .electric {
        background-color: #f7d02c;
    }

    .ice {
        background-color: #96d9d6;
    }

    .fighting {
        background-color: #c22e28;
    }

    .poison {
        background-color: #a33ea1;
    }

    .ground {
        background-color: #e2bf65;
    }

    .flying {
        background-color: #a98ff3;
    }

    .psychic {
        background-color: #f95587;
    }

    .bug {
        background-color: #a6b91a;
    }

    .rock {
        background-color: #b6a136;
    }

    .ghost {
        background-color: #735797;
    }

    .dragon {
        background-color: #6f35fc;
    }

    .dark {
        background-color: #705746;
    }

    .steel {
        background-color: #b7b7ce;
    }

    .fairy {
        background-color: #d685ad;
    }

    @media screen and (max-width: 1199px) {
        .items{
            display: grid;
            grid-template-columns: repeat(4, 24.375%);
        }
    }

    @media screen and (max-width: 956px) {
        .items{
            display: grid;
            grid-template-columns: repeat(3, 32.77%);
        }
    }

    @media screen and (max-width: 768px) {
        .items{
            display: grid;
            grid-template-columns: repeat(2, 49.58%);
        }
    }
</style>
